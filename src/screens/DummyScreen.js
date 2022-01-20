import React from 'react'
import { View, Text } from 'react-native'

const DummyScreen = ({ displayText }) => {
    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 20,
            }}
        >
            <Text>{displayText}</Text>
        </View>
    )
}

export default DummyScreen
