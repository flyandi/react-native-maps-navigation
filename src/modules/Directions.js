/**
 * @imports
 */
import {toQueryParams, toLatLng, toCoordinate} from './Tools';
import TravelModes from '../constants/TravelModes';
import * as MarkerTypes from '../constants/MarkerTypes'
import * as PolylineTypes from '../constants/PolylineTypes';
import DirectionTypes, { DEFAULT_DIRECTION_TYPE} from '../constants/DirectionTypes';
import GeoLib from 'geolib';
import NavigationIcons from "../constants/NavigationIcons";

/**
 * @class
 */
export default class Directions {

    /**
     * constructor
     * @param apiKey
     * @param options
     */
    constructor(apiKey, options = false)
    {
        this.apiKey = apiKey;
        this.options = options || {};
    }

    /**
     * Fetch route
     * @param origin
     * @param destination
     * @param options
     * @returns {Promise<Response>}
     */
    fetch(origin, destination, options = false)
    {
        options = Object.assign({
            key: this.apiKey,
            mode: TravelModes.DRIVING
        }, this.options, options);

        const queryParams = {
            origin: toLatLng(origin),
            destination: toLatLng(destination),
            ...options,
        };

        if(queryParams.mode) queryParams.mode = queryParams.mode.toLowerCase();

        const url = `https://maps.google.com/maps/api/directions/json?${toQueryParams(queryParams)}`;

        return fetch(url)
            .then(response => response.json())
            .then(json => {

                if (json.status !== 'OK') {
                    const errorMessage = json.error_message || 'Unknown error';
                    return Promise.reject(errorMessage);
                }

                return this.parse(json);
            });
    }

    /**
     * parse
     * @param json
     * @returns {*}
     */
    parse(json)
    {
        // parse each route
        if(!json.routes.length) return [];

        return json.routes.map(route => {

            if (!route.legs.length) return null;

            const leg = route.legs[0]; // only support primary leg - waypoint support is later

            // create markers
            const markers = [
                // origin
                {
                    coordinate: toCoordinate(leg.start_location),
                    type: MarkerTypes.ORIGIN,
                },
                // destination
                {
                    coordinate: toCoordinate(leg.end_location),
                    type: MarkerTypes.DESTINATION,
                }
            ];


            const steps = leg.steps.map((step, index) =>
                this.parseStep(
                    step,
                    leg.steps[index + 1] ? leg.steps[index + 1] : false
                )
            );

            steps.push({
                final: true,
                bearing: steps[steps.length-1].bearing,
                compass: steps[steps.length-1].compass,
                start: steps[steps.length-1].end,
                end: false,
                maneuver: {
                    name: 'flag',
                    type: 'flag',
                },
                polyline: {
                    coordinates: [],
                    type: PolylineTypes.ROUTE
                },
                instructions: leg.end_address,
            });

            const polylines = steps.map(step => step.polyline);

            const boundingBox = [toCoordinate(route.bounds.northeast), toCoordinate(route.bounds.southwest)];

            return {
                title: route.summary,
                markers,
                steps,
                polylines,
                bounds: {
                    boundingBox,
                    center: GeoLib.getCenter(boundingBox),
                    northEast: toCoordinate(route.bounds.northeast),
                    southWest: toCoordinate(route.bounds.southwest),
                },
                initialBearing: steps.length ? steps[0].bearing : 0,
                duration: leg.duration,
                distance: leg.distance,
                origin: {
                    address: leg.start_address,
                    latlng: leg.start_location,
                    coordinate: toCoordinate(leg.start_location),
                },
                destination: {
                    address: leg.end_address,
                    latlng: leg.end_location,
                    coordinate: toCoordinate(leg.end_location),
                },

            };

        });
    }

    /**
     * parseStep
     * @param step
     */
    parseStep(step, nextStep) {

        const bearing = GeoLib.getBearing(toCoordinate(step.start_location), toCoordinate(nextStep ? nextStep.start_location : step.end_location));

        return {
            compass: this.decodeCompass(bearing),
            maneuver: this.decodeManeuver(step, bearing),
            bearing: bearing,
            mode: step.travel_mode,
            start: toCoordinate(step.start_location),
            end: toCoordinate(step.end_location),
            polyline: {
                coordinates: this.decodePolylineToCoordinates(step.polyline.points),
                type: PolylineTypes.ROUTE,
            },
            duration: step.duration,
            distance: step.distance,
            instructions: step.html_instructions,
        }
    }

    /**
     * decodeManeuver
     * @param step
     * @returns {{name: *, type: *}}
     */
    decodeManeuver(step)
    {
        const maneuver = step.maneuver ? step.maneuver : DEFAULT_DIRECTION_TYPE;

        const name = (maneuver.split("-").map((d, i) => i == 0 ? d : d[0].toUpperCase() + d.slice(1))).join("");

        return {
            name,
            type: maneuver
        };
    }

    /**
     * decodeCompassDirection
     * @param bearing
     * @returns {{detail: *, simple: *}}
     */
    decodeCompass(bearing)
    {
        if(bearing < 0) return false;

        const compass = [
            DirectionTypes.NORTH,
            DirectionTypes.NORTHEAST,
            DirectionTypes.EAST,
            DirectionTypes.SOUTHEAST,
            DirectionTypes.SOUTH,
            DirectionTypes.SOUTHWEST,
            DirectionTypes.WEST,
            DirectionTypes.NORTHWEST
        ];

        const compassSimple = [
            DirectionTypes.NORTH,
            DirectionTypes.EAST,
            DirectionTypes.SOUTH,
            DirectionTypes.WEST,
        ];

        const calc = a => {
            let c = Math.ceil(bearing / (360 / a.length)) - 1;
            return a[c < 0 ? 0 : (c > (a.length-1)) ? (a.length-1) : c];
        }

        return {
            detail: calc(compass),
            simple: calc(compassSimple),
        };
    }


    /**
     * decodePolylineToCoordinates
     * @param t
     * @param e
     * @returns {{latitude: *, longitude: *}[]}
     */
    decodePolylineToCoordinates(t, e)
    {
        for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) {
            a = null, h = 0, i = 0;
            do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
            n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0;
            do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32);
            o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]);
        }

        return d = d.map(function(t) {
            return {
                latitude: t[0],
                longitude: t[1],
            };
        });
    }
}