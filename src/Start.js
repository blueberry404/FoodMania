import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import App from './App'

const Main = () => {
    return (
        <PaperProvider>
            <SafeAreaProvider>
                <App />
            </SafeAreaProvider>
        </PaperProvider>
    )
}

export default Main
