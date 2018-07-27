/**
 * @imports
 */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Polyline } from 'react-native-maps';
import connectTheme from '../../themes'


/**
 * @class
 */
export default class RoutePolyline extends Component {

    /**
     * constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.theme = connectTheme(props.theme).Polylines[this.props.type];
    }


    /**
     * @render
     * @returns {*}
     */
    render() {

        if(!this.props.coordinates) return null;

        if(!this.theme) {
            throw new Error("RoutePolyline does not support type " + this.props.type + ".");
        }

        const components = [
            <Polyline
                key={0}
                strokeWidth={this.theme.strokeWidth}
                strokeColor={this.theme.strokeColor}
                coordinates={this.props.coordinates}
                lineCap={'round'}
            />
        ];

        if(this.theme.fillColor) {

            const borderWidth = this.theme.strokeWidth - (this.theme.borderWidth || 3);

            components.push(
                <Polyline
                    key={1}
                    strokeWidth={borderWidth}
                    strokeColor={this.theme.fillColor}
                    coordinates={this.props.coordinates}
                    lineCap={'round'}
                />
            );
        }

        return components;
    }
}
