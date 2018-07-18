/**
 * @imports
 */
import { StyleSheet} from 'react-native';
import { IconFont } from '../../constants/NavigationIcons';


/**
 * @styles
 */
export default props => StyleSheet.create({

    labelContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderColor: props.borderColor,
        borderWidth: props.borderWidth,
        borderRadius: props.borderRadius,
        overflow: 'hidden',
        backgroundColor: props.backgroundColor,
        margin: props.margin,
        paddingVertical: 2,
        paddingHorizontal: 4,
    },


    labelText: {
        textAlign: 'center',
        fontSize: props.fontSize,
        fontFamily: props.fontFamily,
        fontWeight: props.fontWeight,
        color: props.textColor,
    },
});
