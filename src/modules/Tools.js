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