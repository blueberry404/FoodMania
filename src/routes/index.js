import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PropTypes from 'prop-types'

import AllowAccess from '../screens/AllowAccess'
import FindLocation from '../screens/FindLocation'

const Navigation = ({ onReady }) => {
    const PreLoginStack = createNativeStackNavigator()
    return (
        <NavigationContainer onReady={onReady}>
            <PreLoginStack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <PreLoginStack.Screen name="AllowAccess" component={AllowAccess} />
                <PreLoginStack.Screen name="FindLocation" component={FindLocation} />
            </PreLoginStack.Navigator>
        </NavigationContainer>
    )
}

Navigation.propTypes = {
    onReady: PropTypes.func,
}

export default Navigation
