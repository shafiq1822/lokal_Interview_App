import { View, Text } from 'react-native'
import React from 'react'
import { Color } from '../styles/Colors'

const TextComponent = ({ name }) => {
    return ( 
        <Text style={{color: Color.black}}>
            {name}
        </Text>
    )
}

export default TextComponent