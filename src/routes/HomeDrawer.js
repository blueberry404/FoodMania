import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import { IconButton } from 'react-native-paper'

import DummyScreen from '../screens/DummyScreen'
import Home from '../screens/Home'
import { COLOR_PINK, COLOR_DRAWER_TITLE } from '../colors'
import HomeDrawerContent from '../components/HomeDrawerContent'
import { Text } from 'react-native'

const Drawer = createDrawerNavigator()

const HomeDrawer = () => {
    const nav = useNavigation()

    const LeftHeader = () => (
        <IconButton
            icon="menu"
            color={COLOR_PINK}
            size={25}
            onPress={() => nav.dispatch(DrawerActions.openDrawer())}
        />
    )

    const DrawerText = ({ text }) => (
        <Text style={{ color: COLOR_DRAWER_TITLE, fontSize: 15 }}>{text}</Text>
    )

    return (
        <Drawer.Navigator
            screenOptions={{
                activeTintColor: COLOR_PINK,
                drawerActiveBackgroundColor: 'transparent',
                drawerInactiveBackgroundColor: 'transparent',
                drawerItemStyle: { height: 50, width: '100%' },
            }}
            initialRouteName="Home"
            drawerContent={(props) => <HomeDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    headerLeft: () => <LeftHeader />,
                    headerRight: () => (
                        <IconButton icon="cart" color={COLOR_PINK} size={25} onPress={() => {}} />
                    ),
                    drawerLabel: () => <DrawerText text="Home" />,
                    drawerIcon: (_focused, _color, size) => (
                        <IconButton icon="home-outline" color={COLOR_PINK} size={size} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Help"
                options={{
                    headerLeft: () => <LeftHeader />,
                    drawerLabel: () => <DrawerText text="Help Center" />,
                    drawerIcon: (_focused, _color, size) => (
                        <IconButton icon="help-circle-outline" color={COLOR_PINK} size={size} />
                    ),
                }}
            >
                {(props) => <DummyScreen {...props} displayText="Help Center" />}
            </Drawer.Screen>
            <Drawer.Screen
                name="Invite"
                options={{
                    headerLeft: () => <LeftHeader />,
                    drawerLabel: () => <DrawerText text="Invite Friends" />,
                    drawerIcon: (_focused, _color, size) => (
                        <IconButton icon="gift-outline" color={COLOR_PINK} size={size} />
                    ),
                }}
            >
                {(props) => <DummyScreen {...props} displayText="Invite Friends" />}
            </Drawer.Screen>
        </Drawer.Navigator>
    )
}

export default HomeDrawer
