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
    maneuverView: {
        padding: 15,
        backgroundColor: '#f7f7f4',
        flexDirection: 'row',
        minHeight: 120,
        alignItems: 'center',
    },

    maneuverViewArrow: {
        flex: 0,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },

    maneuverViewDirection: {
        flex: 1,
    },

    maneuverClose: {
        flex: 0,
        width: 30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }

});
