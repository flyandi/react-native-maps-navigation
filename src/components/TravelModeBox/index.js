/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import OptionGroupBox from 'react-native-optiongroup';
import {DEFAULT_MODES, MODE_MAPPING, DRIVING} from '../../constants/TravelModes';
import {NavigationIconsFont} from '../../constants/NavigationIcons';

/**
 * @component
 */
export default class TravelModeBox extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        backgroundColor: PropTypes.string,
        borderColor: PropTypes.string,
        borderWidth: PropTypes.number,
        borderRadius: PropTypes.number,
        contentPadding: PropTypes.number,
        inverseTextColor: PropTypes.string,
        modes: PropTypes.array,
        selected: PropTypes.any,
        defaultValue: PropTypes.any,
        style: PropTypes.any,
        onChange: PropTypes.func,
        theme: PropTypes.string,
        invertKeyLabel: PropTypes.bool,
        fontFamily: PropTypes.string,
        fontSize: PropTypes.number,
        useIcons: PropTypes.bool,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        backgroundColor: 'transparent',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 3,
        contentPadding: 10,
        inverseTextColor: '#FFFFFF',
        defaultValue: DRIVING,
        selected: undefined,
        style: {},
        onChange: undefined,
        theme: undefined,
        invertKeyLabel: false,
        fontSize: 25,
        fontFamily: undefined,
        useIcons: true,
        modes: DEFAULT_MODES,
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
        const options = [];

        this.props.modes.map(mode => {
            if (MODE_MAPPING[mode]) {
                options.push(MODE_MAPPING[mode])
            }
        });

        return (
            <OptionGroupBox
                {...this.props}
                fontFamily={this.props.useIcons ? NavigationIconsFont.fontFamily : this.props.fontFamily}
                options={options}
                useKeyValue={'mode'}
                useLabelValue={'icon'}
            />
        );
    }
}

