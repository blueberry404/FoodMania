import { Alert, Platform } from 'react-native'
import { PERMISSIONS } from 'react-native-permissions'

export const isAndroid = () => Platform.OS === 'android'

export const PLATFORM_LOCATION_PERMISSION = Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
})

export const showAlertWithMessage = (message) => {
    Alert.alert('', message, [{ text: 'Ok' }])
}
