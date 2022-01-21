import { DrawerItemList } from '@react-navigation/drawer'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button } from 'react-native-paper'
import { COLOR_BLUE, COLOR_DIVIDER, COLOR_DRAWER_TITLE, COLOR_WHITE } from '../colors'

const HomeDrawerContent = (props) => {

    const { navigation } = props

    return (
        <ScrollView {...props}>
            <DrawerHeader {...props} />
            <DrawerItemList {...props} />
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: COLOR_DIVIDER,
                    marginVertical: 10,
                }}
            />
            <DrawerTextButton string="Settings" onPress={() => navigation.navigate('Settings')} />
            <DrawerTextButton string="Terms & Conditions / Privacy" onPress={() => {}} />
        </ScrollView>
    )
}

const DrawerHeader = ({ navigation }) => (
    <View
        style={{
            width: '100%',
            height: 200,
            backgroundColor: COLOR_BLUE,
            flexDirection: 'column-reverse',
        }}
    >
        <Button
            mode="text"
            onPress={() => navigation.navigate('Settings')}
            color={COLOR_WHITE}
            uppercase={false}
            contentStyle={{ justifyContent: 'flex-start', marginVertical: 15 }}
        >
            Log in / Create Account
        </Button>
    </View>
)

const DrawerTextButton = ({ string, onPress }) => (
    <Button
        mode="text"
        onPress={onPress}
        color={COLOR_DRAWER_TITLE}
        uppercase={false}
        contentStyle={{ justifyContent: 'flex-start', height: 50 }}
        labelStyle={{ fontSize: 15, fontWeight: '400', letterSpacing: 0 }}
    >
        {string}
    </Button>
)

export default HomeDrawerContent
