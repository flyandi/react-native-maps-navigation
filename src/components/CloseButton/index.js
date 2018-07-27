/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import Styles from './styles';
import NavigationIcons from "../../constants/NavigationIcons";
import {DEFAULT_DIRECTION_TYPE} from "../../constants/DirectionTypes";


/**
 * @component
 */
export default class CloseButton extends Component {

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

        return (
            <TouchableOpacity>
                <Text style={styles.closeButtonText}>
                    {NavigationIcons.close}
                </Text>
            </TouchableOpacity>
        );
    }
}

