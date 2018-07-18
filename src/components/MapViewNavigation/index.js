/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Dimensions } from 'react-native';
import connectTheme from '../../themes';
import Geocoder from '../../modules/Geocoder';
import Directions from '../../modules/Directions';
import TravelModes from '../../constants/TravelModes';
import * as Tools from '../../modules/Tools';
import Simulator from '../../modules/Simulator';
import _ from 'lodash';
import RouteMarker from '../RouteMarker';
import RoutePolyline from '../RoutePolyline';


/**
 * @component
 */
export default class MapViewNavigation extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        apiKey: PropTypes.string.isRequired,
        language: PropTypes.string,
        map: PropTypes.func,
        maxZoom: PropTypes.number,
        minZoom: PropTypes.number,
        animationDuration: PropTypes.number,
        navigationViewingAngle: PropTypes.number,
        navigationZoomLevel: PropTypes.number,
        onRouteChange: PropTypes.func,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        apiKey: undefined,
        language: undefined,
        map: undefined,
        maxZoom: 21,
        minZoom: 5,
        animationDuration: 750,
        navigationViewingAngle: 90,
        navigationZoomLevel: 14,
        onRouteChange: undefined,
    }

    /**
     * @constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.geoCoder = new Geocoder(this.props.apiKey, {
            language: this.props.language
        });

        this.directionsCoder = new Directions(this.props.apiKey, {
            language: this.props.language
        });

        this.simulator = new Simulator(this);

        this.state = {
            route: false,
            markers: [],
        };

        this.theme = connectTheme(this.props.theme);

        const {width, height} = Dimensions.get('window');

        this.aspectRatio = width / height;
    }

    /**
     * getCoordinates
     * @param address
     * @param raw
     * @returns {Promise<Array>}
     */
    getCoordinates(address, raw = false) {
        return this.geoCoder.getFromLocation(address).then(results => {

            let coordinates = raw ? results : this.geoCoder.minimizeResults(results);

            return coordinates.length == 1 ? coordinates[0] : coordinates;
        });
    }

    /**
     * getZoomValue
     * @param level
     */
    getZoomValue(level) {
        const value = 0.00001 * (this.props.maxZoom - (level < this.props.minZoom ? this.props.minZoom : level));

        return {
            latitudeDelta: value,
            longitudeDelta: value * this.aspectRatio
        }
    }

    /**
     * getBoundingBoxZoomValue
     * @param b
     * @param quantifier
     * @returns {*}
     */
    getBoundingBoxZoomValue(b, quantifier = 1) {

        if(b.length != 2) return {};

        return {
            latitudeDelta: (b[0].latitude > b[1].latitude ? b[0].latitude - b[1].latitude : b[1].latitude - b[0].latitude) * quantifier,
            longitudeDelta: (b[0].longitude > b[1].longitude ? b[0].longitude - b[1].longitude : b[1].longitude - b[0].longitude) * quantifier,
        };
    }

    /**
     * updatePosition
     * @param coordinate
     * @param duration
     */
    updatePosition(coordinate, duration = 10)
    {
        this.props.map().animateToCoordinate(coordinate, duration);
    }

    /**
     * updateBearing
     * @param bearing
     * @param duration
     */
    updateBearing(bearing, duration = false)
    {
        this.props.map().animateToBearing(bearing, duration || this.props.animationDuration);
    }

    /**
     * clearRoute
     * @void
     */
    clearRoute()
    {
        this.setState({route: false})
    }

    /**
     * Prepares the route
     * @param origin
     * @param destination
     * @param mode
     * @param options
     * @returns {PromiseLike<T> | Promise<T>}
     */
    prepareRoute(origin, destination, options = false, testForRoute = false)
    {
        if(testForRoute && this.state.route) {
            return Promise.resolve(this.state.route);
        }

        return this.directionsCoder.fetch(origin, destination, options).then(routes => {

            if(routes.length) {

                const route = routes[0];

                this.props.onRouteChange && this.props.onRouteChange(route);

                this.setState({route});

                return Promise.resolve(route);
            }

            return Promise.reject();

        });
    }

    /**
     * displayRoute
     * @param origin
     * @param destination
     * @param options
     * @returns {PromiseLike<T> | Promise<T>}
     */
    displayRoute(origin, destination, options = false)
    {
        return this.prepareRoute(origin, destination, options).then(route => {

            const region = {
                ...route.bounds.center,
                ...this.getBoundingBoxZoomValue(route.bounds.boundingBox, 1.2)
            }

            this.props.map().animateToRegion(region, this.props.animationDuration);

            return Promise.resolve(route);
        });
    }

    /**
     * navigateRoute
     * @param origin
     * @param destination
     * @param options
     * @returns {PromiseLike<T> | Promise<T>}
     */
    navigateRoute(origin, destination, options = false)
    {
        return this.prepareRoute(origin, destination, options, true).then(route => {

            const region = {
                ...route.origin.coordinate,
                ...this.getZoomValue(this.props.navigationZoomLevel),
            };

            this.props.map().animateToRegion(region, this.props.animationDuration);
            this.props.map().animateToViewingAngle(this.props.navigationViewingAngle, this.props.animationDuration);

            //this.updatePosition(route.origin.coordinate);
            this.updateBearing(route.initialBearing);

            //setTimeout(() => this.simulator.start(route), this.props.animationDuration * 1.5);

            return Promise.resolve(route);
        });
    }

    /**
     * getRouteMarkers
     * @param route
     * @returns {*}
     */
    getRouteMarkers(route)
    {
        if (!route || route.markers.constructor !== Array) return null;

        return route.markers.map((params, index) => {

            return (
                <RouteMarker
                    key={index}
                    theme={this.props.theme}
                    {...params}
                />
            );
        });
    }

    /**
     * Route Polycons
     * @param route
     * @returns {*}
     */
    getRoutePolylines(route)
    {
        if (!route || route.polylines.constructor !== Array) return null;

        return route.polylines.map((params, index) => {

            return (
                <RoutePolyline
                    key={index}
                    theme={this.props.theme}
                    {...params}
                />
            );
        });
    }



    /**
     * @render
     * @returns {*[]}
     */
    render()
    {
        const result = [
            this.getRouteMarkers(this.state.route),
            this.getRoutePolylines(this.state.route),
        ];

        return result;
    }
}

