/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import Styles from './styles';
import ManeuverArrow from '../ManeuverArrow';
import ManeuverLabel from '../ManeuverLabel';
import DurationDistanceLabel from '../DurationDistanceLabel';

/**
 * @component
 */
export default class DirectionListViewItem extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        instructions: PropTypes.string,
        distance: PropTypes.object,
        duration: PropTypes.object,
        maneuver: PropTypes.object,
        fontFamily: PropTypes.string,
        fontFamilyBold: PropTypes.string,
        fontSize: PropTypes.number,
        displayTravelMode: PropTypes.bool,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        instructions: '',
        fontFamily: undefined,
        fontFamilyBold: undefined,
        distance: undefined,
        duration: undefined,
        maneuver: undefined,
        fontSize: undefined,
        displayTravelMode: false,
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
            <View style={styles.directionDetailSection}>
                <View style={styles.directionDetailIconContainer}>
                    <ManeuverArrow
                        {...this.props}
                        size={24}
                    />
                </View>
                <View style={styles.directionDetailContent}>
                    <ManeuverLabel
                        {...this.props}
                    />
                    <DurationDistanceLabel
                        {...this.props}
                        style={{marginTop: 4}}
                        withTravelModeIcon={this.props.displayTravelMode}
                    />
                </View>
            </View>
        );
    }
}

