/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import Styles from './styles';
import NavigationIcons from "../../constants/NavigationIcons";
import {DEFAULT_DIRECTION_TYPE} from "../../constants/DirectionTypes";


/**
 * @component
 */
export default class ManeuverArrow extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        maneuver: PropTypes.object,
        size: PropTypes.number,
        opacity: PropTypes.number,
        color: PropTypes.any,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        maneuver: undefined,
        size: 25,
        opacity: 1,
        color: '#000000',
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

        const icon = this.props.maneuver && (this.props.maneuver.name || DEFAULT_DIRECTION_TYPE);

        return (
            <Text style={styles.maneuverArrow}>
                {NavigationIcons[icon]}
            </Text>
        );
    }
}

