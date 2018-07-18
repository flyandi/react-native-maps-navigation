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
     * @maneuverView
     */
    maneuverArrow: {
        fontFamily: 'Navigation',
        fontSize: props.size,
        color: props.color,
        opacity: props.opacity,
        textAlign: 'center',
    }

});
