/**
 * @imports
 */
import {toQueryParams} from './Tools';

/**
 * @class
 */
export default class Geocoder {

    /**
     * AddressComponentMapping
     * @type {{street_number: string, route: string, postal_code: string, country: string, locality: string, administrative_area_level_1: string, administrative_area_level_2: string}}
     */
    static AddressComponentMapping = {
        'street_number': 'number',
        'route': 'street',
        'postal_code': 'zip',
        'country': 'country',
        'locality': 'city',
        'administrative_area_level_1': 'state',
        'administrative_area_level_2': 'county',
    }

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
     * getFromLocation
     * @param params
     * @returns {Promise<any>}
     */
    async getFromLocation(...params)
    {
        let queryParams = params.length === 1 && typeof params[0] === 'string' ? {address: params[0]} : params;

        if (!params) return Promise.reject('Not enough parameters');

        queryParams.key = this.apiKey;

        if (this.options.language)
            queryParams.language = this.options.language;

        // build url
        const url = `https://maps.google.com/maps/api/geocode/json?${toQueryParams(queryParams)}`;

        let response, data;

        // fetch
        try {
            response = await fetch(url);
        } catch (error) {
            return Promise.reject(error);
        }

        // parse
        try {
            data = await response.json();
        } catch (error) {
            return Promise.reject(error);
        }

        // check response's data
        if (data.status !== 'OK') {
            return Promise.reject(data);
        }

        return data.results;
    }

    /**
     * getFromLatLng
     * @param lat
     * @param lng
     * @returns {*}
     */
    getFromLatLng(lat, lng)
    {
        return this.getFromLocation({latlng: `${lat},${lng}`})
    }

    /**
     * minimizeResults
     * @param results
     */
    minimizeResults(results)
    {
        if(results.constructor != Array) return [];

        return results.map(result => {

            let {lat, lng} = result.geometry.location;

            return {
                components: this.minimizeAddressComponents(result.address_components),
                address: result.formatted_address,
                coordinate: {
                    latitude: lat,
                    longitude: lng
                }
            };
        });
    }

    /**
     * minimizeAddressComponents
     * @param components
     */
    minimizeAddressComponents(components)
    {
        let results = {};

        const ids = Object.keys(Geocoder.AddressComponentMapping);

        components.forEach(component => {

            let index = ids.indexOf(component.types[0]);

            if(index != -1) {

                results[Geocoder.AddressComponentMapping[ids[index]]] = {
                    short: component.short_name,
                    long: component.long_name
                };

            }
        });

        return results;
    }
}