/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import Styles from './styles';
import DirectionListViewItem from './item';

/**
 * @component
 */
export default class DirectionsListView extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        route: PropTypes.any.isRequired,
        fontFamily: PropTypes.string,
        fontFamilyBold: PropTypes.string,
        showOriginDestinationHeader: PropTypes.bool,
        displayTravelMode: PropTypes.bool,
    }

    /**
     * defaultProps
     * @type {}
     */
    static defaultProps = {
        route: undefined,
        fontFamily: undefined,
        fontFamilyBold: undefined,
        showOriginDestinationHeader: true,
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
        let index = 0;

        const steps = this.props.route ? this.props.route.steps : false;

        if(steps.constructor !== Array) return null;

        const styles = Styles(this.props);

        return (
            <ScrollView>

                {!this.props.showOriginDestinationHeader ? null: (
                    <View style={styles.directionDetailHeader}>
                        <View style={styles.directionDetailHeaderSection}>
                            <Text style={styles.directionDetailHeaderAddressLabel}>
                                FROM
                            </Text>
                            <Text style={styles.directionDetailHeaderAddressText}>
                                {this.props.route.origin.address}
                            </Text>
                        </View>
                        <View style={styles.directionDetailHeaderSection}>
                            <Text style={styles.directionDetailHeaderAddressLabel}>
                                TO
                            </Text>
                            <Text style={styles.directionDetailHeaderAddressText}>
                                {this.props.route.destination.address}
                            </Text>
                        </View>
                    </View>
                )}

                <View style={styles.directionDetailTravel}>
                    <Text style={styles.directionDetailTravelDuration}>{this.props.route.duration.text}</Text>
                    <Text style={styles.directionDetailTravelDistance}>{this.props.route.distance.text}</Text>
                </View>

                <View style={styles.directionDetailSectionContainer}>
                    {steps.map((step, index) => <DirectionListViewItem {...this.props} key={index} {...step} />)}
                </View>
            </ScrollView>
        );
    }
}

