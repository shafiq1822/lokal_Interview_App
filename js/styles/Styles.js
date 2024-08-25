import React from 'react';
import { StyleSheet, Dimensions, Platform, PixelRatio, StatusBar } from 'react-native';
import { Colors } from './Colors';

// - - - - - CUSTOMISED BUTTON - - - - - - //

const { height, width } = Dimensions.get('window');


export const buttonColor = (darkMode) => {
    return [darkMode ? styles.bgBlue : styles.bgGreen]
}

export const bgColor = (darkMode) => {
    return darkMode ? styles.bgDarkOverlay : styles.bgAppBg
}

export const textColor = (darkMode) => {
    return darkMode ? styles.white : styles.black
}

export const shadow = (value) => {
    return StyleSheet.create({
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: value
        },
        shadowOpacity: value / 8,
        shadowRadius: value * 2,

        elevation: value * 2.5,
    })
}

export const circle = (size, color) => {
    return StyleSheet.create({
        width: size,
        borderRadius: size / 2,
        height: size,
        position: 'absolute',
        backgroundColor: color,
    })
}



// - - - - - DYNAMIC FONT SIZE - - - - - - //

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
} = Dimensions.get('window');

// based on iphone 5s's scale
//   const scale = SCREEN_WIDTH  / 360;
const scale = SCREEN_HEIGHT / 880;

// export function fontSize(size) {
//     const newSize = size * scale
//     if (Platform.OS === 'ios') {
//         return StyleSheet.create({ fontSize: Math.round(PixelRatio.roundToNearestPixel(newSize)) })
//     } else {
//         return StyleSheet.create({ fontSize: Math.round(PixelRatio.roundToNearestPixel(newSize)) -2 })
//     }
// }

export function responsive(size) {
    return width * size * 0.0024
}
export function fontSize(size) {
    return StyleSheet.create({ fontSize: responsive(size) })
}

// - - - - - heightH - - - - - - //
export const heightH = (value) => {
    return StyleSheet.create({ height: heightValue(value) })
}
// - - - - - widthH - - - - - - //
export const widthH = (value) => {
    return StyleSheet.create({ width: heightValue(value) })
}
// - - - - - heightW - - - - - - //
export const heightW = (value) => {
    return StyleSheet.create({ height: widthValue(value) })
}
// - - - - - widthW - - - - - - //
export const widthW = (value) => {
    return StyleSheet.create({ width: widthValue(value) })
}


// export const fontWeight = (value) => {
//     return StyleSheet.create({ fontWeight: value })
// }

// - - - - - CUSTOM SPACING AND BORDER - - - - - - //
// {padding,paddingPoistion,margin,marginPosition,styles,fontSize,position,zIndex,heightValue,widthValue,borderWidth,radius,borderColor,flex,lineHeight,opacity,screenHeight,screenWidth}

// - - - - - PADDING - - - - - - //
export const padding = (padding, paddingVertical, paddingHorizontal) => {
    return StyleSheet.create({ padding, paddingVertical, paddingHorizontal })
}
// - - - - - PADDING POSITION- - - - - - //
export const paddingPoistion = (paddingTop, paddingRight, paddingBottom, paddingLeft) => {
    return StyleSheet.create({ paddingTop, paddingRight, paddingBottom, paddingLeft })
}

// - - - - - MARGIN - - - - - - //
export const margin = (margin, marginVertical, marginHorizontal) => {
    return StyleSheet.create({ margin, marginVertical, marginHorizontal })
}
// - - - - - MARGIN POSITION- - - - - - //
export const marginPosition = (marginTop, marginRight, marginBottom, marginLeft) => {
    return StyleSheet.create({ marginTop, marginRight, marginBottom, marginLeft })
}

// - - - - - POSITION - - - - - - //
export const position = (top, right, bottom, left) => {
    return StyleSheet.create({ top, right, bottom, left })
}

// - - - - - Z-INDEX - - - - - - //
export const zIndex = (value) => {
    return StyleSheet.create({ zindex: value })
}

// - - - - - BORDER WIDTH - - - - - - //
export const borderWidth = (borderWidth, borderTopWidth, borderLeftWidth, borderBottomWidth, borderRightWidth) => {
    return StyleSheet.create({ borderWidth, borderTopWidth, borderLeftWidth, borderBottomWidth, borderRightWidth })
}

// - - - - - BORDER RADIUS - - - - - - //
export const radius = (borderRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius, borderTopLeftRadius) => {
    return StyleSheet.create({ borderRadius, borderTopRightRadius, borderBottomRightRadius, borderBottomLeftRadius, borderTopLeftRadius })
}

// - - - - - BORDER COLOR - - - - - - //
export const borderColor = (borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor) => {
    return StyleSheet.create({ borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor })
}

// - - - - - FLEX - - - - - - //
export const flex = (value) => {
    return StyleSheet.create({ flex: value })
}

// - - - - - FONT STYLES - - - - - //
export const lineHeight = (value) => {
    return StyleSheet.create({ lineHeight: value })
}
export const opacity = (value) => {
    return StyleSheet.create({ opacity: value })
}

// - - - - - SCALE - - - - - //
export const screenHeight = (value) => {
    return StyleSheet.create({ height: SCREEN_HEIGHT / value })
}
export const screenWidth = (value) => {
    return StyleSheet.create({ height: SCREEN_WIDTH / value })
}
export const heightValue = (value) => {
    return SCREEN_HEIGHT / value;
}
export const widthValue = (value) => {
    return SCREEN_WIDTH / value;
}

export const customStyles = StyleSheet.create({
    // - - - - - TEXT COLORS - - - - - //
    white: { color: Colors.white },
    black: { color: Colors.black },
    red: { color: Colors.red },
    green: { color: Colors.green },
    blue: { color: Colors.blue },
    lightBlue: { color: Colors.lightBlue },
    grey: { color: Colors.grey },
    textSecondary: { color: Colors.Secondary },
    textPrimary: { color: Colors.primaryColor },
    textSecondaryDark: { color: Colors.textSeconderyDark },
    textPrimaryDark: { color: Colors.textPrimeryDark },


    // - - - - - BACKGROUND COLORS - - - - - //
    bgPrimary: { backgroundColor: Colors.primaryColor },
    bgPrimaryDark: { backgroundColor: Colors.primaryColorDark },
    bgPrimaryDarkColor: { backgroundColor: Colors.primaryDarkColor },
    bgSeconderyDark: { backgroundColor: Colors.SeconderyDark },
    bgPrimaryRgb: { backgroundColor: Colors.backgroundRgb },
    bgliteBlue: { backgroundColor: Colors.liteBlue },
    bgWhite: { backgroundColor: Colors.white },
    bgAppBg: { backgroundColor: Colors.appBackGroungColor },
    bgBlack: { backgroundColor: Colors.black },
    bgGreen: { backgroundColor: Colors.green },
    bgBlue: { backgroundColor: Colors.blue },
    bgLightBlue: { backgroundColor: Colors.lightBlue },
    bgGrey: { backgroundColor: Colors.grey },
    bgRed: { backgroundColor: Colors.red },
    bgBlackOverlay: { backgroundColor: Colors.blackOverlay },
    bgDarkBlue: { backgroundColor: Colors.darkBlue },
    bgDarkGrey: { backgroundColor: Colors.darkGrey },
    bgDarkOverlay: { backgroundColor: Colors.backgroundDark },
    bgBlueGreyDark: { backgroundColor: Colors.blueGreyDark },


    // - - - - - BORDER COLORS - - - - - //
    borderWhite: { borderColor: Colors.white },
    borderBlack: { borderColor: Colors.black },
    borderGray: { borderColor: Colors.Secondary },
    borderGrayDark: { borderColor: Colors.borderGrayDark },
    borderGreen: { borderColor: Colors.green },
    borderPrimary: { borderColor: Colors.primaryColor },
    borderBlue: { borderColor: Colors.blue },
    borderLightBlue: { borderColor: Colors.lightBlue },

    // - - - - - FLEX PROPERTIES - - - - - // 
    // - - -  Flex Align - - -  // 
    allCenter: { justifyContent: 'center', alignItems: 'center' },
    centerHorizontal: { alignItems: 'center' },
    centerVertical: { justifyContent: 'center' },
    selfCenter: { alignSelf: 'center' },
    selfStart: { alignSelf: 'flex-start' },
    selfEnd: { alignSelf: 'flex-end' },
    flexEnd: { alignItems: 'flex-end' },
    flexBottom: { justifyContent: 'flex-end' },
    spaceBetween: { justifyContent: 'space-between', alignItems: 'center' },
    spaceBetweenVertical: { justifyContent: 'space-between', },
    spaceAroundVertical: { justifyContent: 'space-around' },
    spaceEvenly: { justifyContent: "space-evenly" },
    // - Text Align - //
    textCenter: { textAlign: 'center' },
    textAlignVertical: { textAlignVertical: 'center' },
    textRight: { textAlign: 'right' },
    textLeft: { textAlign: 'left' },
    // - - -  Flex Direction - - -  // 
    row: { flexDirection: 'row' },
    rowReverse: { flexDirection: 'row-reverse' },
    rowWrap: { flexDirection: 'row', flexWrap: 'wrap' },
    // - - - - - OTHER CSS - - - - - // 
    overflowHide: { overflow: "hidden" },
    positionAbsolute: { position: 'absolute' },
    // - - - FlatList - - - //
    flatlistContainer: [
        { flexDirection: 'row' },
        padding(0, 6, 10), borderWidth(0, 1, 0, 0, 0), borderColor(Colors.blue), radius(0, 0, 10, 10)
    ],
    flatlistHeader: [
        { flexDirection: 'row', backgroundColor: Colors.blue },
        padding(0, 8, 10), radius(0, 10, 0, 0, 10)
    ],
    //FONT WEIGHT

    fontWeight100: {
        fontWeight: "100"
    },

    fontWeight200: {
        fontWeight: "200"
    },

    fontWeight300: {
        fontWeight: "300"
    },

    fontWeight400: {
        fontWeight: "400"
    },

    fontWeight500: {
        fontWeight: "500",
    },
    fontWeight600: {
        fontWeight: "600",
        fontFamily: Platform.OS == "ios" ? "Poppins-bold" : "Poppins-SemiBold"
    },

    fontWeight700: {
        fontWeight: "700",
        fontFamily: Platform.OS == "ios" ? "Poppins-bold" : "Poppins-SemiBold"
    },

    fontWeight800: {
        fontWeight: "800",
        fontFamily: Platform.OS == "ios" ? "Poppins-bold" : "Poppins-SemiBold"
    },

    fontWeight900: {
        fontWeight: "900",
        fontFamily: Platform.OS == "ios" ? "Poppins-bold" : "Poppins-SemiBold"
    },

    fontWeightBold: {
        fontWeight: "bold",
        fontFamily: Platform.OS == "ios" ? "Poppins-bold" : "Poppins-SemiBold"
    },

    // - - - - - Opacity - - - -  -//
    opacity25perc: {
        opacity: 0.25
    },
    opacity50perc: {
        opacity: 0.5
    },
    opacity80perc: {
        opacity: 0.8
    },
    opacity65perc: {
        opacity: 0.65
    },

    drawerHeader: {
        backgroundColor: Colors.backgroundDark,
        borderColor: "transparent",
        elevation: 0,
        shadowOffset: 0
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    header: {
        textAlign: 'center',
        fontSize: 18,
        padding: 16,
        marginTop: 16,
    },
})