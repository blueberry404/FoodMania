import React from 'react'
import RNBootSplash from 'react-native-bootsplash'

import Navigation from './routes'

const App = () => <Navigation onReady={() => RNBootSplash.hide()} />

export default App
