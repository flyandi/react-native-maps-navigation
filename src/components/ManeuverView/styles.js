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
        padding: 25,
        backgroundColor: '#f7f7f4',
        flexDirection: 'row'
    },

    maneuverViewArrow: {
        flex: 0,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
        borderWidth: 1,

    },

    maneuverViewDirection: {
        flex: 1,
        borderColor: 'red',
        borderWidth: 1,
    }

});
