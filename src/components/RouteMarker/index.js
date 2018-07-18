/**
 * @imports
 */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Marker } from 'react-native-maps';
import connectTheme from '../../themes'
import Styles from './styles';


/**
 * @class
 */
export default class RouterMarker extends Component {

    /**
     * constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.theme = connectTheme(props.theme).Markers[this.props.type];
    }


    /**
     * @render
     * @returns {*}
     */
    render() {

        const styles = Styles(this.theme);

        return (
            <Marker
                coordinate={this.props.coordinate}
            >
                <Text style={styles.markerText}>{this.theme.icon}</Text>
            </Marker>
        )
    }
}
