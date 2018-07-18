/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import Styles from './styles';

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

        return (
            <Text style={[styles.durationDistanceText, this.props.style]}>
                {this.props.distance ? this.props.distance.text : ''}
                {this.props.duration ? ['(', this.props.duration.text, ')'].join("") : ''}
            </Text>
        );
    }
}

