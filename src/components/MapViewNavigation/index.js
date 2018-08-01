/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {CoordinatePropType} from '../../constants/PropTypes';
import { View, TouchableOpacity, Text, Dimensions, Geolocation } from 'react-native';
import connectTheme from '../../themes';
import Geocoder from '../../modules/Geocoder';
import Directions from '../../modules/Directions';
import TravelModes from '../../constants/TravelModes';
import NavigationModes from '../../constants/NavigationModes';
import * as Tools from '../../modules/Tools';
import Simulator from '../../modules/Simulator';
import Traps from '../../modules/Traps';
import RouteMarker from '../RouteMarker';
import RoutePolyline from '../RoutePolyline';
import PositionMarker from '../PositionMarker';
import {POSITION_ARROW} from "../../constants/MarkerTypes";
import {Circle, Polygon, Polyline} from 'react-native-maps';


/**
 * @component
 */
export default class MapViewNavigation extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        origin: PropTypes.oneOfType([PropTypes.string, CoordinatePropType, PropTypes.bool]),
        destination: PropTypes.oneOfType([PropTypes.string, CoordinatePropType, PropTypes.bool]),
        apiKey: PropTypes.string.isRequired,
        language: PropTypes.string,
        map: PropTypes.func,
        navigationMode: PropTypes.string,
        travelMode: PropTypes.string,
        maxZoom: PropTypes.number,
        minZoom: PropTypes.number,
        animationDuration: PropTypes.number,
        navigationMode: PropTypes.string,
        navigationViewingAngle: PropTypes.number,
        navigationZoomLevel: PropTypes.number,
        directionZoomQuantifier: PropTypes.number,
        onRouteChange: PropTypes.func,
        onStepChange: PropTypes.func,
        onNavigationStarted: PropTypes.func,
        onNavigationCompleted: PropTypes.func,
        routeStepDistance: PropTypes.number,
        routeStepInnerTolerance: PropTypes.number,
        routeStepCenterTolerance: PropTypes.number,
        routeStepCourseTolerance: PropTypes.number,
        displayDebugMarkers: PropTypes.bool,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        origin: false,
        destination: false,
        apiKey: undefined,
        language: undefined,
        map: undefined,
        navigationMode: NavigationModes.IDLE,
        travelMode: TravelModes.DRIVING,
        maxZoom: 21,
        minZoom: 5,
        animationDuration: 750,
        navigationViewingAngle: 60,
        navigationZoomLevel: 14,
        directionZoomQuantifier: 1.5,
        onRouteChange: undefined,
        onStepChange: undefined,
        onNavigationStarted: undefined,
        onNavigationCompleted: undefined,
        routeStepDistance: 15,
        routeStepInnerTolerance: 0.75,
        routeStepCenterTolerance: 0.1,
        routeStepCourseTolerance: 30, // in degress
        displayDebugMarkers: false,
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

        this.traps = new Traps(this);

        this.state = {
            route: false,
            markers: [],
            position: {},
            navigationMode: NavigationModes.IDLE,
            travelMode: TravelModes.DRIVING,
            stepIndex: false,
        };

        this.theme = connectTheme(this.props.theme);

        const {width, height} = Dimensions.get('window');

        this.aspectRatio = width / height;
    }

    /**
     * @componentDidMount
     */
    componentDidMount()
    {
        this.watchId = navigator.geolocation.watchPosition(position => {

            this.setPosition(position.coords);

        });
    }

    /**
     * @componentWillUnmount
     */
    componentWillUnmount()
    {
        navigator.geolocation.clearWatch(this.watchId);
    }

    /**
     * @componentDidUpdate
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps, prevState)
    {
        if(this.props.origin && this.props.destination) {

            if(
                (prevProps.navigationMode != this.props.navigationMode) ||
                (prevProps.travelMode != this.props.travelMode) ||
                (prevProps.origin != this.props.origin || prevProps.destination != this.props.destination)
            ) {
                this.updateRoute();
            }
        }
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

        const latitudeDelta = (b[0].latitude > b[1].latitude ? b[0].latitude - b[1].latitude : b[1].latitude - b[0].latitude) * quantifier;

        return {
            latitudeDelta,
            longitudeDelta: latitudeDelta * this.aspectRatio,
        };
    }

    /**
     * updatePosition
     * @param coordinate
     * @param duration
     */
    updatePosition(coordinate, duration = 0)
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
     *
     * @param stepIndex
     */
    updateStep(stepIndex = 0)
    {
        const step = this.state.route.steps[stepIndex < 0 ? 0 : stepIndex];

        const nextStep = this.state.route.steps[stepIndex + 1];

        this.props.onStepChange && this.props.onStepChange(step, nextStep);

        this.traps.watchStep(step, nextStep, {
            distance: this.props.routeStepDistance,
            innerRadiusTolerance: this.props.routeStepInnerTolerance,
            centerRadiusTolerance: this.props.routeStepCenterTolerance,
            courseTolerance: this.props.routeStepCourseTolerance,
        }, (trap, event, state) => {

            if(!nextStep && trap.isCenter()) {

                this.props.onNavigationCompleted && this.props.onNavigationCompleted();

                return this.setState({
                    navigationMode: NavigationModes.IDLE,
                    stepIndex: false
                });
            }

            if(trap.isLeaving()) {
                this.updateStep(this.stepIndex);
            }
        });

        this.stepIndex = stepIndex + 1; // ensures that this is a real number
    }

    /**
     * setPosition
     * @param position
     */
    setPosition(position)
    {
        const {latitude, longitude, heading} = position;

        position.coordinate = {latitude, longitude};

        // process traps on setPosition
        this.traps.execute(position);

        // update position on map
        if(this.state.navigationMode == NavigationModes.NAVIGATION) {

            this.updatePosition(position);

            this.updateBearing(heading);
        }

        this.setState({position});
    }

    /**
     * clearRoute
     * @void
     */
    clearRoute()
    {
        this.setState({route: false, step: false, stepIndex: false})
    }

    /**
     * updateRoute
     * @param origin
     * @param destination
     * @param navigationMode
     */
    updateRoute(origin = false, destination = false, navigationMode = false)
    {
        origin = origin || this.props.origin;
        destination = destination || this.props.destination;
        navigationMode = navigationMode || this.props.navigationMode;

        switch(navigationMode) {

            case NavigationModes.ROUTE:
                console.log('*** ROUTE', origin, destination);
                this.displayRoute(origin, destination);
                break;

            case NavigationModes.NAVIGATION:
                this.navigateRoute(origin, destination);
                break;
        }
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

        options = Object.assign({}, {mode: this.state.travelMode}, {mode: this.props.travelMode}, options.constructor == Object ? options : {});

        return this.directionsCoder.fetch(origin, destination, options).then(routes => {

            if(routes.length) {

                const route = routes[0];

                this.props.onRouteChange && this.props.onRouteChange(route);

                this.props.onStepChange && this.props.onStepChange(false);

                this.setState({route, step: false});

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
                ...this.getBoundingBoxZoomValue(route.bounds.boundingBox, this.props.directionZoomQuantifier)
            }

            this.props.map().animateToRegion(region, this.props.animationDuration);

            if(!this.state.navigationMode == NavigationModes.ROUTE) {
                this.setState({
                    navigationMode: NavigationModes.ROUTE,
                });
            }

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

            this.setState({
                navigationMode: NavigationModes.NAVIGATION,
            });

            this.updateStep(0);

            this.props.onNavigationStarted && this.props.onNavigationStarted();

            setTimeout(() => this.simulator.start(route), this.props.animationDuration * 1.5);

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
     * getPositionMarker
     * @param position
     * @param navigationMode
     * @returns {*}
     */
    getPositionMarker(position, navigationMode)
    {
        const type = navigationMode == NavigationModes.NAVIGATION ? POSITION_ARROW : undefined;

        return (
            <PositionMarker
                key={'position'}
                theme={this.props.theme}
                type={type}
                {...position}
            />
        )
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

            return params ? (
                <RoutePolyline
                    key={index}
                    theme={this.props.theme}
                    {...params}
                />
            ) : null;
        });
    }

    /**
     * getDebugShapes
     * @param route
     * @returns {Array}
     */
    getDebugShapes(route)
    {
        let result = [];

        if(!route || !this.props.displayDebugMarkers) return result;


        const steps = this.state.route.steps;

        let c = 0;

        steps.forEach((step, index) => {

            const coordinate = step.start;

            [
                {radius: this.props.routeStepDistance, color: 'blue'},
                {radius: this.props.routeStepDistance * this.props.routeStepInnerTolerance, color: 'red'},
                {radius: this.props.routeStepDistance * this.props.routeStepCenterTolerance, color: 'green'}
            ].forEach(d => {
                result.push(<Circle key={c} strokeColor={d.color} strokeWidth={2} center={step.start} radius={d.radius}/>);
                c++;
            });

            [
                {radius: this.props.routeStepDistance, color: 'blue'}
            ].forEach(d => {

                let bearing = step.bearing; // - 180 > 0 ? step.bearing - 180 : 360 - step.bearing - 180;

                let coords = Tools.toArcPolygon(
                    coordinate,
                    bearing - this.props.routeStepCourseTolerance,
                    bearing + this.props.routeStepCourseTolerance,
                    this.props.routeStepDistance
                )

                result.push(<Polyline key={c} strokeColor={d.color} strokeWidth={8} coordinates={coords} />);
                c++;
            })



        });


        return result;
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
            this.getPositionMarker(this.state.position, this.state.navigationMode),
            this.getDebugShapes(this.state.route)
        ];

        return result;
    }
}

