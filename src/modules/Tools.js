/**
 * @imports
 */
import geolib from 'geolib';

/**
 * toQueryParams
 * @param object
 * @returns {string}
 */
export const toQueryParams = (object) =>
{
    return Object.keys(object)
        .filter(key => !!object[key])
        .map(key => key + "=" + encodeURIComponent(object[key]))
        .join("&")
}

/**
 * toLatLng
 * @param value
 * @returns {string}
 */
export const toLatLng = (value) =>
{
    if(value.constructor == String) return value;

    return value && value.latitude && value.longitude ? `${value.latitude},${value.longitude}` : value;
}

/**
 * toCoordinate
 * @param latlng
 * @returns {{latitude: *, longitude: *}}
 */
export const toCoordinate = (latlng) =>
{
    const {lat, lng} = latlng;

    return {latitude: lat, longitude: lng};
}

/**
 * toArcPolygon
 * @param coordinate
 * @param initialBearing
 * @param finalBearing
 * @param radius
 * @returns {any[]}
 */
export const toArcPolygon = (coordinate, initialBearing, finalBearing, radius) =>
{
    const d2r = Math.PI / 180;   // degrees to radians
    const r2d = 180 / Math.PI;   // radians to degrees
    const points = 32;
    let result = [];

    // find the radius in lat/lon
    //const rlat = (radius / EARTH_RADIUS_METERS) * r2d;
    //const rlng = rlat / Math.cos({coordinate.latitude * d2r);

    if (initialBearing > finalBearing) finalBearing += 360;
    let deltaBearing = finalBearing - initialBearing;
    deltaBearing = deltaBearing/points;

    for (let i=0; (i < points+1); i++)
    {
        result.push(geolib.computeDestinationPoint(coordinate, radius, initialBearing + i*deltaBearing));
    }

    return result;
};

/**
 * toNameId
 * @param str
 * @param prepend
 * @param append
 * @returns {*}
 */
export const toNameId = (str, prepend = false, append = false) =>
{
    str = str.toLowerCase().replace(/_/g, ' ').replace(/\b[a-z]/g, letter => letter.toUpperCase()).replace(/\s/g, '');

    return (prepend ? prepend : '') + str + (append ? append : '');
}