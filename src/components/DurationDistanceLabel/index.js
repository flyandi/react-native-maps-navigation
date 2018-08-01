/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import Styles from './styles';
import {MODE_MAPPING} from "../../constants/TravelModes";

/**
 * @component
 */
export default class DurationDistanceLabel extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        style: PropTypes.any,
        instructions: PropTypes.string,
        fontFamily: PropTypes.string,
        fontSize: PropTypes.number,
        distance: PropTypes.object,
        duration: PropTypes.object,
        opacity: PropTypes.number,
        withTravelModeIcon: PropTypes.bool,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        style: {},
        fontFamily: undefined,
        fontSize: 16,
        distance: undefined,
        duration: undefined,
        opacity: 0.8,
        withTravelModeIcon: false,
    }


    /**
     * @constructor
     * @param props
     */
    constructor(props)
    {
        super(props);
    }

    /**
     * render
     * @returns {XML}
     */
    render()
    {
        const styles = Styles(this.props);

        const travelMode = MODE_MAPPING[this.props.mode];

        return (
            <Text style={[styles.durationDistanceText, this.props.style]}>
                {!this.props.withTravelModeIcon || !travelMode ? null : (
                    <Text style={styles.durationDistanceTravelModeIcon}>{travelMode.icon}{' '}</Text>
                )}
                {this.props.distance ? this.props.distance.text : ''}
                {this.props.duration ? ['  (', this.props.duration.text, ')'].join("") : ''}
            </Text>
        );
    }
}

