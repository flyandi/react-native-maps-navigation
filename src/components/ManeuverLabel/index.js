/**
 * @imports
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import Styles from './styles';


/**
 * @component
 */
export default class ManeuverLabel extends Component {

    /**
     * propTypes
     * @type {}
     */
    static propTypes = {
        instructions: PropTypes.string,
        fontFamily: PropTypes.string,
        fontFamilyBold: PropTypes.string,
        fontSize: PropTypes.number,
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
     * getParsedInstructions
     * @param styles
     * @returns {*}
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

        return (
            <View style={styles.maneuverLabel}>
                {this.getParsedInstructions(styles)}
            </View>
        );
    }
}

