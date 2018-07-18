/**
 * @imports
 */
import { StyleSheet} from 'react-native';
import { NavigationIconsFont } from '../../constants/NavigationIcons';


/**
 * @styles
 */
export default props => StyleSheet.create({

    markerText: {
        ...NavigationIconsFont,
        fontSize: props.fontSize || 30,
        color: props.color || '#000000',
    },
});
