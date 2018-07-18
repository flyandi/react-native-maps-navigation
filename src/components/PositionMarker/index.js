/**
 * @imports
 */
import React, { Component } from 'react';
import { Text } from 'react-native';
import { Marker } from 'react-native-maps';
import connectTheme from '../../themes'
import Styles from './styles';
import PropTypes from "prop-types";
import { POSITION_DOT, POSITION_ARROW } from "../../constants/MarkerTypes";


/**
 * @class
 */
export default class PositionMarker extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        instructions: PropTypes.string,
        fontFamily: PropTypes.string,
        fontFamilyBold: PropTypes.string,
        fontSize: PropTypes.number,
        type: PropTypes.any,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        instructions: '',
        fontFamily: undefined,
        fontFamilyBold: undefined,
        fontSize: 15,
        type: POSITION_DOT,
    }


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
