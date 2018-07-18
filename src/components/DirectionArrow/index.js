/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import _ from 'lodash';
import Styles from './styles';

/**
 * @component
 */
export default class OptionGroup extends Component {

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
        options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
        selected: PropTypes.any,
        defaultValue: PropTypes.any,
        style: PropTypes.any,
        useLabelValue: PropTypes.string,
        useKeyValue: PropTypes.string,
        onChange: PropTypes.func,
        theme: PropTypes.string,
        invertKeyLabel: PropTypes.bool,
        fontFamily: PropTypes.string,
        fontSize: PropTypes.number,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        backgroundColor: 'transparent',
        borderColor: '#828186',
        borderWidth: 1,
        borderRadius: 3,
        contentPadding: 10,
        inverseTextColor: '#FFFFFF',
        defaultValue: undefined,
        selected: undefined,
        style: {},
        useLabelValue: undefined,
        useKeyValue: undefined,
        onChange: undefined,
        theme: undefined,
        invertKeyLabel: false,
        fontSize: undefined,
        fontFamily: undefined,
    }

    /**
     * Themes
     * @type {}
     */
    static themes = {

        _default: {
            margin: undefined,
            fontSize: undefined,
            fontFamily: undefined,
        },

        light: {
            borderColor: '#FFFFFF'
        },

        gray: {
            borderColor: '#777777'
        },

        dark: {
            borderColor: '#000000'
        },

        red: {
            borderColor: '#d9534f'
        },

        green: {
            borderColor: '#5cb85c'
        },

        blue: {
            borderColor: '#3F51B5'
        },

        yellow: {
            borderColor: '#f0ad4e'
        }

    }
    /**
     * @constructor
     * @param props
     */
    constructor(props)
    {
        super(props);

        this.state = {
            selected: this.props.selected !== undefined ? this.props.selected : (this.props.defaultValue !== undefined ? this.props.defaultValue : undefined)
        };
    }

    /**
     * onValueChange
     * @param value
     */
    onValueChange(value)
    {
        if(this.props.onChange) {
            this.props.onChange(value)
        }
        this.setState({
            selected : value
        });
    }

    /**
     * render
     * @returns {XML}
     */
    render()
    {
        let index = 0;


        const styles = Styles(_.extend(
            {},
            OptionGroup.themes._default,
            this.props,
            this.props.style ? this.props.style : {},
            this.props.theme ? OptionGroup.themes[this.props.theme] : {}
        ));

        const isArray = _.isArray(this.props.options);

        return (
            <View style={styles.buttonContainer}>

                {_.map(this.props.options, (params, name) => {

                    index++;

                    let value = this.props.useKeyValue ? params[this.props.useKeyValue ] : params;

                    let label = this.props.useLabelValue ? params[this.props.useLabelValue] : name;

                    if((isArray && !this.props.useKeyValue) || this.props.invertKeyLabel) {
                        let v = value;
                        value = label;
                        label = v;
                    }

                    return (
                        <TouchableOpacity
                            key={value}
                            style={[
                                this.state.selected == value ? styles.selectedButtonItem : styles.buttonItem,
                                index == 1 ? {borderLeftWidth: 0} : {},
                            ]}
                            activeOpacity={0.5}
                            onPress={() => this.onValueChange(value)}
                        >
                            <Text style={
                                this.state.selected == value ? styles.selectedButtonItemText : styles.buttonItemText
                            }>
                                {label}
                            </Text>

                        </TouchableOpacity>
                    )
                })}
            </View>
        );
    }
}

