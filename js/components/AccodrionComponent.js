import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { borderWidth, fontSize, margin, marginPosition, padding } from '../styles/Styles';
// import { arrowUpIcon } from '../../constants/ImageConstant';
import { Colors } from '../styles/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import specific icon set
import TextComponent from './TextComponent';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const AccordionComponent = ({ title, content, style, children }) => {
    const [expanded, setExpanded] = useState(false);
    const rotateValue = useRef(new Animated.Value(expanded ? 1 : 0)).current;

    const toggleExpand = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
        Animated.timing(rotateValue, {
            toValue: expanded ? 0 : 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const rotateAnimation = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });
    
    return (
        <View style={[styles.container, padding(10), marginPosition(10, 10, 0, 10), style]}>
            <TouchableWithoutFeedback onPress={toggleExpand}>
                <View style={styles.titleContainer}>
                    <TextComponent name={title} style={[fontSize(14), { color: Colors.textGray, fontWeight: "500" }]} />
                    <Animated.View
                        style={[
                            { width: 15, height: 15 },
                            { transform: [{ rotateX: '180deg' }, { rotate: rotateAnimation }] },
                        ]}
                        resizeMode="contain"
                    >
                        <Icon name="keyboard-arrow-up" size={20} color="#808080" />

                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
            {expanded && (
                <View style={styles.contentContainer}>
                    {children}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 3,
        backgroundColor: Colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.borderGray

        // elevation: 3,
        // shadowColor: '#808080',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 3,
    }
    ,
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
    contentContainer: {
        padding: 10,
    },
});

export default AccordionComponent;
