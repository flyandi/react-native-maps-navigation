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
    durationDistanceView: {
        padding: 15,
        backgroundColor: '#f7f7f4',
        flexDirection: 'row',
        minHeight: 120,
        alignItems: 'center',
    },

    durationDistanceContent: {
        flex: 1,
    },

    durationDistanceClose: {
        flex: 0,
        width: 30,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }

});
