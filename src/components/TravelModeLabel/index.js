/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import {MODE_MAPPING} from '../../constants/TravelModes';
import Styles from "./styles";

/**
 * @component
 */
export default class TravelModeLabel extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        size: PropTypes.number,
        opacity: PropTypes.number,
        color: PropTypes.string,
        fontFamily: PropTypes.string,
        fontSize: PropTypes.number,
        useIcon: PropTypes.bool,
        useLabel: PropTypes.bool,
        mode: PropTypes.string
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        color: undefined,
        opacity: 0.8,
        fontSize: 25,
        fontFamily: undefined,
        useIcon: true,
        useLabel: true,
        mode: undefined,
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

        if(!travelMode) return null;

        return (
            <View style={styles.travelModeLabelContainer}>
                {!this.useIcon ? null : (
                    <Text style={styles.travelModeLabelIcon}>
                        {travelMode.icon}
                    </Text>
                )}

                {!this.useLabel ? null : (
                    <Text style={styles.travelModeLabelText}>
                        {travelMode.name}
                    </Text>
                )}
            </View>
        );
    }
}

