import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react-lite'

import AllowAccess from '../screens/AllowAccess'
import FindLocation from '../screens/FindLocation'
import { useUserStore } from '../stores/UserStore'
import HomeDrawer from './HomeDrawer'

const WithoutLocationStack = createNativeStackNavigator()

const Navigation = observer(() => {
    const userStore = useUserStore()

    //make sure only one nav container
    return (
        <>
            {userStore.isLocationAvailable ? (
                <HomeDrawer />
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
        </>
    )
})

Navigation.propTypes = {
    onReady: PropTypes.func,
}

export default Navigation
