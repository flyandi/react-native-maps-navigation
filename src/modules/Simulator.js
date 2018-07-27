/**
 * @imports
 */
import GeoLib from 'geolib';

/**
 * @class
 */
export default class Simulator {

    /**
     * constructor
     * @param apiKey
     * @param options
     */
    constructor(instance)
    {
        this.instance = instance;
        this.speed = 30;
        this.turnSpeed = 700;
    }

    /**
     * start
     * @param route
     */
    start(route) {
        this.pointIndex = 0;

        const steps = route.steps;

        let points = [];
        let result = [];

        steps.map(step => step.polyline.coordinates.map(coordinate => points.push(Object.assign({}, coordinate))));


        points.forEach((point, index) => {

            const nextPoint = points[index + 1];

            if(nextPoint && !nextPoint.final == true) {

                // calculate distance between each point
                const distance = Math.round(GeoLib.getDistance(point, nextPoint));
                const bearing =  GeoLib.getBearing(point, nextPoint);

                if(bearing !== 0) {

                    if (distance > 1) {

                        for (var x = 1; x < distance; x++) {

                            result.push(Object.assign({}, {bearing}, GeoLib.computeDestinationPoint(point, x, bearing)));
                        }

                    } else {
                        result.push(Object.assign({}, {bearing}, point));
                    }
                }
            }
        });

        this.pointIndex = 0;
        this.points = result;
        this.lastBearing = false;

        this.drive();

    }

    drive()
    {
        const point = this.points[this.pointIndex];

        let speed = this.speed;

        if(point && point.bearing) {

            let allowPositionUpdate = true;


            if(this.lastBearing != point.bearing) {

                // check if it's just a small bump
                if(point.bearing > this.lastBearing - 10 && point.bearing  < this.lastBearing + 10) {

                    this.instance.updateBearing(point.bearing, this.turnSpeed);

                } else {
                    allowPositionUpdate = false;
                    speed = this.turnSpeed;
                    this.instance.updateBearing(point.bearing, this.turnSpeed);
                }

                this.lastBearing = point.bearing;
            }

            if(allowPositionUpdate) {

                this.instance.setPosition({
                    ...point,
                    heading: point.bearing,
                });

                this.pointIndex++;
            }

            setTimeout(() => this.drive(), speed);
        }
    }
}