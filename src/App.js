import React, { useEffect, useState } from 'react'
import RNBootSplash from 'react-native-bootsplash'

import Navigation from './routes'
import { useUserStore } from './stores/UserStore'

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

    return isLoading ? null : <Navigation />
}

export default App
