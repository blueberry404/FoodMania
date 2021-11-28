import React from "react";
import {
	// SafeAreaView,
	// ScrollView,
	// StatusBar,
	// StyleSheet,
	// Text,
	// useColorScheme,
	View,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import RNBootSplash from "react-native-bootsplash";

const App = () => (
	<NavigationContainer onReady={() => RNBootSplash.hide()}>
		<View style={{ backgroundColor: "#ff0000" }} />
	</NavigationContainer>
);

export default App;
