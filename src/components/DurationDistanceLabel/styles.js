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
     * @durationDistanceText
     */
    durationDistanceText: {
        fontFamily: props.fontFamily,
        fontSize: props.fontSize * 0.8,
        opacity: props.opacity,
        flexWrap: 'wrap',
    },

});
