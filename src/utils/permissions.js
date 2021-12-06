import { Alert } from 'react-native'
import { check, RESULTS, openSettings, request } from 'react-native-permissions'
import { PLATFORM_LOCATION_PERMISSION, showAlertWithMessage } from './platform'

export const checkLocationPermission = async (resultCallback, errorCallback) => {
    await checkSinglePermission(PLATFORM_LOCATION_PERMISSION, resultCallback, errorCallback)
}

export const askLocationPermission = async (resultCallback, errorCallback) => {
    await requestPermission(PLATFORM_LOCATION_PERMISSION, resultCallback, errorCallback)
}

const requestPermission = async (permission, resultCallback, errorCallback) => {
    try {
        const result = await request(permission)
        resultCallback(result)
    } catch (error) {
        errorCallback(error)
    }
}

const checkSinglePermission = async (permission, resultCallback, errorCallback) => {
    try {
        const result = await check(permission)
        switch (result) {
            case RESULTS.UNAVAILABLE:
                showAlertWithMessage('This feature is not available')
                break
            case RESULTS.DENIED:
                console.log('The permission has not been requested / is denied but requestable')
                break
            case RESULTS.LIMITED:
                console.log('The permission is limited: some actions are possible')
                break
            case RESULTS.GRANTED:
                console.log('The permission is granted')
                break
            case RESULTS.BLOCKED:
                showOpenSettingsAlert()
                break
        }
        resultCallback(result)
    } catch (error) {
        showAlertWithMessage(error)
        if (errorCallback) {
            errorCallback(error)
        }
    }
}

const showOpenSettingsAlert = () => {
    Alert.alert('Error', 'You cannot use this feature. Go to settings and change permissions', [
        {
            text: 'Open Settings',
            onPress: () => {
                openSettings().catch(() => console.warn('cannot open settings'))
            },
        },
        {
            text: 'Cancel',
        },
    ])
}
