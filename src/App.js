import React, { useEffect, useState } from 'react'
import RNBootSplash from 'react-native-bootsplash'
import { NavigationContainer } from '@react-navigation/native'

import Navigation from './routes'
import { useUserStore } from './stores/UserStore'
import { View } from 'react-native'

const App = () => {
    const [isLoading, setLoading] = useState(true)
    const userStore = useUserStore()

    useEffect(() => {
        const initStores = async () => {
            await userStore.initUserLocationFromStorage()
        }
        initStores().finally(async () => {
            setLoading(false)
            await RNBootSplash.hide({ fade: true })
        })
    })

    return isLoading ? (
        <View />
    ) : (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>
    )
}

export default App
