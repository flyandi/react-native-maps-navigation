/**
 * @imports
 */
import { StyleSheet} from 'react-native';
import { NavigationIconsFont } from '../../constants/NavigationIcons';


/**
 * @styles
 */
export default props => StyleSheet.create({

    positionMarkerText: {
        ...NavigationIconsFont,
        fontSize: props.fontSize,
        color: props.color,
    },

    positionMarkerArrow: {
        backgroundColor: props.backgroundColor,
        width: props.size,
        height: props.size,
        borderRadius: props.size,
        justifyContent: 'center',
        alignItems: 'center',
        transform: [
            { rotateX: props.angle + 'deg'}
        ]
    }
});
