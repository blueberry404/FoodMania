import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'

import AllowAccess from '../screens/AllowAccess'
import FindLocation from '../screens/FindLocation'
import Home from '../screens/Home'
import { useUserStore } from '../stores/UserStore'

const Navigation = observer(({ onReady }) => {
    const WithoutLocationStack = createNativeStackNavigator()
    const WithLocationStack = createNativeStackNavigator()
    const userStore = useUserStore()

    return (
        <NavigationContainer onReady={onReady}>
            {userStore.isLocationAvailable ? (
                <WithLocationStack.Navigator>
                    <WithLocationStack.Screen name="Home" component={Home} />
                </WithLocationStack.Navigator>
            ) : (
                <WithoutLocationStack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    <WithoutLocationStack.Screen name="AllowAccess" component={AllowAccess} />
                    <WithoutLocationStack.Screen name="FindLocation" component={FindLocation} />
                </WithoutLocationStack.Navigator>
            )}
        </NavigationContainer>
    )
})

Navigation.propTypes = {
    onReady: PropTypes.func,
}

export default Navigation
