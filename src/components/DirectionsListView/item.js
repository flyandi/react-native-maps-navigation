/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import _ from 'lodash';
import Styles from './styles';
import { DEFAULT_DIRECTION_TYPE } from "../../constants/DirectionTypes";
import NavigationIcons from "../../constants/NavigationIcons";

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
     *
     */
    getParsedInstructions(styles)
    {
        const parts = [];

        const regex = /(\w+)|<(.*?)>(.*?)<\/.*?>/g;

        const mapping = {
            r: styles.regular,
            b: styles.bold,
            d: styles.durationDistance,
            div: styles.extra,
        };

        let m;
        let last = false;
        while((m = regex.exec(this.props.instructions))) {

            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
                last = true;
            }

            if(m[2]) {
                let tag = m[2].split(" ")[0];

                if(tag == "div") m[3] = '\n' + m[3];

                parts.push(<Text key={m.index} style={mapping[tag]}>{m[3]}{last ? '.' : ' '}</Text>);

            } else {
                parts.push(<Text key={m.index} style={mapping.r}>{m[0]}{last ? '.': ' '}</Text>);
            }
        }

        return (
            <Text style={{flexWrap: 'wrap'}}>
                {parts}
            </Text>
        )
    }

    /**
     * render
     * @returns {XML}
     */
    render()
    {
        const styles = Styles(this.props);

        const icon = this.props.maneuver.name || false;

        if(!NavigationIcons[icon]) console.log(this.props.maneuver);

        return (
            <View style={styles.directionDetailSection}>
                <View style={styles.directionDetailIconContainer}>
                    <Text style={styles.directionDetailIconText}>{NavigationIcons[icon]}</Text>
                </View>
                <View style={styles.directionDetailContent}>
                    <View style={styles.directionDetailText}>
                        {this.getParsedInstructions(styles)}
                    </View>
                    <View style={styles.directionDetailDistanceDuration}>
                        <Text style={styles.durationDistance}>
                            {this.props.distance.text}
                            ({this.props.duration.text})
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

