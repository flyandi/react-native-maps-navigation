/**
 * @imports
 */
import {toQueryParams, toLatLng, toCoordinate, toNameId} from './Tools';
import GeoLib from 'geolib';
import TrapTypes from '../constants/TrapTypes';

/**
 * @class
 */
export default class Traps {

    /**
     * constructor
     * @param apiKey
     * @param options
     */
    constructor(instance) {
        this.instance = instance;
        this.traps = {};
        this.counter = 0;
    }

    /**
     * execute
     * @param position
     */
    execute(position) {
        const {coordinate, heading, altitude} = position;

        this.__matches(coordinate, heading);
    }

    /**
     * Add
     * @param trap
     * @param callback
     * @returns {*}
     */
    add(trap, callback) {

        this.counter++;
        const counter = this.counter;

        this.traps[counter] = Object.assign({}, trap, {
            index: counter,
            state: TrapTypes.States.OUTSIDE,
            callback: callback,
        });

        Object.keys(TrapTypes.States).forEach(state => this.traps[counter][toNameId(state, "is")] = () => this.traps[counter].state === state);

        return this.traps[counter];
    }

    /**
     * getArray
     * @returns {any[]}
     */
    getArray()
    {
        return Object.keys(this.traps).map(id => this.traps[id]);
    }


    /**
     * watchRadius
     * @param coordinate
     * @param radius
     * @param options
     */
    watchRadius(coordinate, radius, options, callback) {

        return this.add({
            type: TrapTypes.Types.CIRCLE,
            coordinate,
            radius,
            options
        }, callback);
    }

    /**
     * watchStep
     * @param step
     * @param nextStep
     * @param options
     * @param callback
     * @returns {*}
     */
    watchStep(step, nextStep, options, callback)
    {
        options = Object.assign({}, {
            distance: 15,
            innerRadiusTolerance: 0.75,
            centerRadiusTolerance: 0.5,
            courseTolerance: 30,
        }, options);

        const distanceToNextPoint =  options.distance || step.distance.value; // in meters

        const coordinate = step.start;

        return this.add({
            type: TrapTypes.Types.STEP,
            innerRadius: distanceToNextPoint * options.innerRadiusTolerance,
            centerRadius: distanceToNextPoint * options.centerRadiusTolerance,
            outerRadius: distanceToNextPoint,
            courseTolerance: options.courseTolerance,
            coordinate,
            step,
            nextStep
        }, callback);
    }

    /**
     * nextStatus
     * @param trap
     * @param status
     * @returns {*}
     */
    nextState(trap, event, state)
    {
        // set new status
        this.traps[trap.index].state = state;

        // resolve with status
        if(event.constructor == String) {
            trap.callback && trap.callback(trap, event, state);
        }
    }

    /**
     *
     * @param coordinate
     * @private
     */
    __matches(coordinate, heading)
    {
        const traps = Object.keys(this.traps);

        return traps.map(index => {

            const trap = this.traps[index];

            if(trap.state != TrapTypes.States.EXPIRED) {

                switch (trap.type) {

                    case TrapTypes.Types.CIRCLE:

                        if(GeoLib.isPointInCircle(coordinate, trap.coordinate, trap.radius)) {

                        }

                        break;

                    case TrapTypes.Types.STEP:

                        const insideOuter = GeoLib.isPointInCircle(coordinate, trap.coordinate, trap.outerRadius);

                        const insideInner = GeoLib.isPointInCircle(coordinate, trap.coordinate, trap.innerRadius);

                        const stateMap = {
                            [TrapTypes.States.OUTSIDE]: [TrapTypes.States.ENTERED, () =>
                            {
                                const isWithinCourse = this.isWithinCourse(trap.step.bearing, heading, trap.courseTolerance);

                                return insideOuter ? (isWithinCourse ? TrapTypes.Events.ENTERING_ON_COURSE : TrapTypes.Events.ENTERING_OFF_COURSE) : false;
                            }],

                            [TrapTypes.States.ENTERED]: [TrapTypes.States.INSIDE, () =>
                            {
                                return insideOuter ? TrapTypes.Events.INSIDE : false;
                            }],

                            [TrapTypes.States.INSIDE] : [TrapTypes.States.CENTER, () =>
                            {
                                return insideInner ? TrapTypes.Events.INSIDE_CENTER : false;
                            }],

                            [TrapTypes.States.CENTER] : [TrapTypes.States.LEAVING, () =>
                            {
                                const isWithinCourse = this.isWithinCourse(trap.nextStep ? trap.nextStep.bearing : trap.step.bearing, heading, trap.courseTolerance);

                                return insideOuter && !insideInner ? (isWithinCourse ? TrapTypes.Events.LEAVING_ON_COURSE : TrapTypes.Events.LEAVING_OFF_COURSE) : false;
                            }],

                            [TrapTypes.States.LEAVING]: [TrapTypes.States.LEFT, () =>
                            {
                                return !insideOuter && !insideInner ? TrapTypes.Events.LEAVING : false;
                            }],

                            [TrapTypes.States.LEFT]: [TrapTypes.States.EXPIRED, () =>
                            {
                                return true;
                            }],
                        }

                        if(stateMap[trap.state]) {

                            const func = stateMap[trap.state];
                            const event = func[1]();

                            if (event) {

                                this.nextState(trap, event, func[0]);

                                return true;
                            }
                        }

                        break;
                }
            }
        });
    }


    /**
     * Quantifier
     * @param bearing
     * @param heading
     * @param quantifier
     */
    isWithinCourse(bearing, heading, tolerance = 0)
    {
        const low = bearing - tolerance;
        const high = bearing + tolerance;

        return ((low < 0 && heading > (360 - (-1 * low))) || (heading > low)) && ((high > 360 && heading < (high - 360)) || (heading < high));
    }



}