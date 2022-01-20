import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { IconButton } from 'react-native-paper'

import DummyScreen from '../screens/DummyScreen'
import Home from '../screens/Home'
import { COLOR_PINK } from '../colors'

const Drawer = createDrawerNavigator()

const HomeDrawer = () => {
    const nav = useNavigation()

    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    headerLeft: () => (
                        <IconButton
                            icon="menu"
                            color={COLOR_PINK}
                            size={25}
                            onPress={() => nav.dispatch(DrawerActions.openDrawer())}
                        />
                    ),
                    headerRight: () => (
                        <IconButton icon="cart" color={COLOR_PINK} size={25} onPress={() => {}} />
                    ),
                }}
            />
            <Drawer.Screen name="Help">
                {(props) => <DummyScreen {...props} displayText="Help Center" />}
            </Drawer.Screen>
            <Drawer.Screen name="Invite">
                {(props) => <DummyScreen {...props} displayText="Invite Friends" />}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default HomeDrawer
