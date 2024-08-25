import { View, Text } from 'react-native'
import React from 'react'
import { Color, Colors } from '../styles/Colors'

const TextComponent = ({ name, style }) => {
    return (
        <Text style={[{ color: Colors.black }, style]} allowFontScaling={false}>
            {name}
        </Text>
    )
}

export default TextComponent