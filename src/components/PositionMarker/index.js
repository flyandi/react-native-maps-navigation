/**
 * @imports
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
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
        coordinate: PropTypes.object,
        size: PropTypes.number,
        fontSize: PropTypes.number,
        type: PropTypes.any,
        color: PropTypes.string,
        angle: PropTypes.number,
        backgroundColor: PropTypes.string,
        borderColor: PropTypes.string,
        borderWidth: PropTypes.number,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        coordinate: undefined,
        size: 40,
        fontSize: 30,
        type: POSITION_ARROW,
        color: '#252525',
        angle: 60,
        borderWidth: 0,
        borderColor: undefined,
        backgroundColor: '#252525'
    }


    /**
     * constructor
     * @param props
     */
    constructor(props)
    {
        super(props);

        this.theme = connectTheme(props.theme).Markers[this.props.type];
    }

    /**
     * render
     * @render
     * @returns {*}
     */
    render()
    {
        const styles = Styles(Object.assign({}, this.props, this.theme));

        if(!this.props.coordinate) return null;

        return this.props.type === POSITION_ARROW ? this.renderArrow(styles) : this.renderDot(styles);
    }

    /**
     * renderArrow
     * @param styles
     * @returns {*}
     */
    renderArrow(styles)
    {
        return (
            <Marker
                coordinate={this.props.coordinate}
                flat={false}
            >
                <View style={styles.positionMarkerArrow}>
                    <Text style={styles.positionMarkerText}>{this.theme.icon}</Text>
                </View>
            </Marker>
        )
    }


    /**
     * renderDot
     * @param styles
     * @returns {*}
     */
    renderDot(styles) {

        return (
            <Marker
                coordinate={this.props.coordinate}
                flat={false}
            >
                <Text style={styles.positionMarkerText}>
                    {this.theme.icon}
                </Text>
            </Marker>
        )
    }
}
