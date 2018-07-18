/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import _ from 'lodash';
import Styles from './styles';


/**
 * @component
 */
export default class DurationDistanceView extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        route: PropTypes.any.isRequired,
        fontFamily: PropTypes.string,
        fontFamilyBold: PropTypes.string,
        showOriginDestinationHeader: PropTypes.bool,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        route: undefined,
        fontFamily: undefined,
        fontFamilyBold: undefined,
        showOriginDestinationHeader: true
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

        return (
            <View></View>
        );
    }
}

