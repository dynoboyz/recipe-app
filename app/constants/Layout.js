import { Dimensions } from 'react-native';
import MyColors from '../constants/Colors';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
    loadingContainer: {
        flex: 1,
        flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
        backgroundColor: MyColors.PrimaryWhite
    },
    chip: {
        borderColor: MyColors.PrimaryColor
    },
    chipValue: {
        fontSize: 18,
        color: MyColors.PrimaryColor
    },
    chipValueSelected: {
        fontSize: 18,
        color: MyColors.White
    },
    chipSelected: {
        backgroundColor: MyColors.PrimaryColor,
        borderColor: MyColors.PrimaryColor
    },
    keyboardFlex: {
        flex: 1
    },
    flexRow: {
        flexDirection: 'row'
    },
    loading: {
        textAlign: 'center',
        color: MyColors.PrimaryColor
    },
    emptyRecipe: {
        flex: 1,
        color: 'red',
        marginTop: height/3
    },
    container: {
        flex: 1
    },
    item: {
        width: width,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    itemImage: {
        flex: 1,
        width: width,
        height: width/2,
        borderWidth: .5,
        borderColor: MyColors.PrimaryColor
    },
    itemContent: {
        zIndex: 1,
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        top:0,
        bottom: 0,
        right: 0,
        left: 0
    },
    title: {
        marginTop: 5,
        fontSize: 26,
        fontWeight: 'bold',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: MyColors.White,
    },
    type: {
        marginTop: 0,
        fontSize: 16,
        fontStyle: "italic",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: MyColors.White,
    },
    detailContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    detailTitle: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold'
    },
    detailType: {
        marginTop: 5,
        fontSize: 20,
        fontStyle: "italic"
    },
    detailImage: {
        marginTop: 10,
        width: width,
        height: width/2,
        borderWidth: .5,
        borderColor: MyColors.PrimaryColor
    },
    detailSubtitle: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold'
    },
    detailDesc: {
        width: width,
        paddingLeft: 20,
        paddingRight: 20,
        textAlign: "left",
        marginTop: 0,
        fontSize: 14,
    },
    editContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start"
    },
    editImage: {
        justifyContent: "flex-end",
        marginTop: 10,
        width: width,
        height: width/2,
        borderWidth: .5,
        borderColor: MyColors.PrimaryColor,
    },
    editImageContent: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        right: 10
    },
    editImageButton: {
        padding: 10
    },
    editCamera: {
        fontSize: 60,
        color: MyColors.PrimaryColor,
    },
    editPlaceholder: {
        width: 80/100*width
    }
};