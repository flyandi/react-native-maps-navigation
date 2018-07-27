/**
 * @imports
 */
import { StyleSheet} from 'react-native';
import { IconFont } from '../../constants/NavigationIcons';


/**
 * @styles
 */
export default props => StyleSheet.create({

    /**
     * @maneuverLabel
     */
    maneuverLabel: {
        flexDirection: 'row'
    },

    /**
     * @fonts
     */

    bold: {
        fontWeight: 'bold',
        fontFamily: props.fontFamilyBold || props.fontFamily,
        fontSize: props.fontSize,
        flexWrap: 'wrap',
    },

    regular: {
        fontFamily: props.fontFamily,
        fontSize: props.fontSize,
        flexWrap: 'wrap',
    },

    extra: {
        fontFamily: props.fontFamily,
        fontSize: props.fontSize * 0.8,
        flexWrap: 'wrap',
        color: '#387bc1',
        marginTop: 4,
    },

    durationDistance: {
        fontFamily: props.fontFamily,
        fontSize: props.fontSize * 0.8,
        opacity: 0.8,
        flexWrap: 'wrap',
    },

});
