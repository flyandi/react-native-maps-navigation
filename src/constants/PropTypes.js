/**
 * Coordinate PropType
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error}
 * @constructor
 */
export const CoordinatePropType = (props, propName, componentName) => {

    const target = props[propName];

    if(!target || !target.constructor == Object || !target.latitude || !target.longitude) {
        return new Error(propName + ' in ' + componentName + ' requires to be a coordinate object ({latitude, longitude}');
    }
};
