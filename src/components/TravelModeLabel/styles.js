/**
 * @imports
 */
import { StyleSheet} from 'react-native';
import { NavigationIconsFont } from '../../constants/NavigationIcons';


/**
 * @styles
 */
export default props => StyleSheet.create({

    /**
     * @travelModeLabelContainer
     */
    travelModeLabelContainer: {
        flexDirection: 'row'
    },

    travelModeLabelIcon: {
        ...NavigationIconsFont,
        fontSize: props.size,
        opacity: props.opacity
    },

    travelModeLabelText: {
        fontFamily: props.fontFamily,
        fontSize: props.fontSize,
        opacity: props.opacity,
        flexWrap: 'wrap',
    },

});
