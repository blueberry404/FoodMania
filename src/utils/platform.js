import { Alert, Platform } from 'react-native'
import { PositionError } from 'react-native-geolocation-service'
import { PERMISSIONS } from 'react-native-permissions'

export const isAndroid = () => Platform.OS === 'android'

export const PLATFORM_LOCATION_PERMISSION = Platform.select({
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
})

export const showAlertWithMessage = (message) => {
    Alert.alert('', message, [{ text: 'Ok' }])
}

export const getMessageForLocationError = (code) =>
    ({
        [PositionError.PERMISSION_DENIED]: 'Location permission is not granted',
        [PositionError.PLAY_SERVICE_NOT_AVAILABLE]:
            'Google play service is not installed or has an older version',
        [PositionError.POSITION_UNAVAILABLE]: 'Location provider not available',
        [PositionError.TIMEOUT]: 'Location request timed out',
        [PositionError.SETTINGS_NOT_SATISFIED]:
            // eslint-disable-next-line max-len
            'Location service is not enabled or location mode is not appropriate for the current request',
        [PositionError.INTERNAL_ERROR]: 'INTERNAL_ERROR',
    }[code])
