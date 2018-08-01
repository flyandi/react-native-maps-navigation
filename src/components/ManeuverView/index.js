/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Styles from './styles';
import ManeuverArrow from '../ManeuverArrow';
import ManeuverLabel from '../ManeuverLabel';
import CloseButton from "../CloseButton";


/**
 * @component
 */
export default class ManeuverView extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        step: PropTypes.any.isRequired,
        fontFamily: PropTypes.string,
        fontFamilyBold: PropTypes.string,
        fontSize: PropTypes.number,
        arrowSize: PropTypes.number,
        arrowColor: PropTypes.string,
        withCloseButton: PropTypes.bool,
        onClose: PropTypes.func,
        onPress: PropTypes.func,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        step: undefined,
        fontFamily: undefined,
        fontFamilyBold: undefined,
        fontSize: 20,
        arrowSize: 50,
        arrowColor: '#545455',
        withCloseButton: false,
        onClose: undefined,
        onPress: undefined,
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

        const step = this.props.step;

        if(!step) return null;

        const maneuver = step.maneuver;

        return (
            <TouchableOpacity style={styles.maneuverView}>
                <View style={styles.maneuverViewArrow}>
                    <ManeuverArrow
                        size={this.props.arrowSize}
                        color={this.props.arrowColor}
                        maneuver={maneuver}
                    />
                </View>
                <View style={styles.maneuverViewDirection}>
                    <ManeuverLabel
                        {...this.props}
                        instructions={step.instructions}
                        fontSize={this.props.fontSize}
                    />
                </View>
                {!this.props.withCloseButton ? null : (
                    <View style={styles.maneuverClose}>
                        <CloseButton onPress={() => this.props.onClose && this.props.onClose()} />
                    </View>
                )}
            </TouchableOpacity>
        );
    }
}

