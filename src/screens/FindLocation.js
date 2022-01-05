import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, TextInput, Keyboard, Dimensions } from 'react-native'
import { IconButton, Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RESULTS } from 'react-native-permissions'
import { observer } from 'mobx-react-lite'
import MapView, { Marker } from 'react-native-maps'

import { COLOR_BLUE, COLOR_PINK, COLOR_TEXT_BG, COLOR_GRAY_ICON } from '../colors'
import { isAndroid } from '../utils/platform'
import { useUserStore } from '../stores/UserStore'
import { askLocationPermission, checkLocationPermission } from '../utils/permissions'
import { getMessageForLocationError, showAlertWithMessage } from '../utils/platform'

const { width, height } = Dimensions.get('window')

const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

const FindLocation = observer(({ navigation }) => {
    const {
        container,
        cardStyle,
        textContainer,
        textInputStyle,
        iconView,
        buttonStyle,
        filledButtonLabelStyle,
        contentContainer,
        buttonContainer,
    } = styles

    const userStore = useUserStore()
    const [addr, setAddr] = useState('')
    const [userRegion, setUserRegion] = useState(() => getInitialRegion)
    const [userPinLocation, setUserPinLocation] = useState(null)
    const mapRef = useRef(null)

    const getInitialRegion = () => {
        return (
            userStore.location == null ?? {
                latitude: userStore.location.latitude,
                longitude: userStore.location.longitude,
                longitudeDelta: LONGITUDE_DELTA,
                latitudeDelta: LATITUDE_DELTA,
            }
        )
    }

    const checkPermission = async () => {
        await checkLocationPermission((permGranted) => {
            switch (permGranted) {
                case RESULTS.GRANTED:
                case RESULTS.LIMITED:
                    userStore.fetchUserLocation()
                    break
                case RESULTS.DENIED:
                    askLocationPermission(handlePostPermissionRequest, (err) => {
                        showAlertWithMessage(err)
                    })
                    break
                default: {
                    showAlertWithMessage(
                        'Please change the permissions from settings to use this feature',
                    )
                }
            }
        })
    }

    const handlePostPermissionRequest = (permResult) => {
        if (permResult === RESULTS.GRANTED || permResult === RESULTS.LIMITED) {
            userStore.fetchUserLocation()
        } else {
            showAlertWithMessage('Cannot use this feature at the moment')
        }
    }

    const onRegionChange = (region) => {
        setUserRegion(region)
    }

    const saveLocation = async () => {
        if (userPinLocation) {
            await userStore.saveLocation(userPinLocation)
        }
    }

    useEffect(() => {
        if (userStore.locationError) {
            console.warn(userStore.locationError)
            showAlertWithMessage(getMessageForLocationError(userStore.locationError.code))
        } else if (userStore.location) {
            //show on map
            console.warn(userStore.location)
        }
    }, [userStore.location, userStore.locationError])

    return (
        <SafeAreaView style={container} edges={['top', 'left', 'right']}>
            <View style={container}>
                <View style={cardStyle}>
                    <IconButton
                        icon="arrow-left"
                        color={COLOR_PINK}
                        size={30}
                        onPress={() => navigation.goBack()}
                    />
                    <View style={textContainer}>
                        <TextInput
                            style={textInputStyle}
                            underlineColorAndroid="transparent"
                            placeholder="Long press for delivery location"
                            text={userStore.locationAddress}
                            keyboardType={isAndroid() ? 'visible-password' : 'ascii-capable'}
                            autoCorrect={false}
                            borderWidth={0}
                            value={addr}
                            onChangeText={(val) => setAddr(val)}
                        />
                        <IconButton
                            icon="close-circle-outline"
                            style={[iconView, !addr && { height: 0 }]}
                            color={COLOR_GRAY_ICON}
                            size={20}
                            onPress={() => setAddr('')}
                        />
                        <IconButton
                            icon="crosshairs-gps"
                            style={iconView}
                            color={COLOR_PINK}
                            size={20}
                            onPress={() => {
                                Keyboard.dismiss()
                                checkPermission()
                            }}
                        />
                    </View>
                </View>
                <View style={contentContainer}>
                    <MapView
                        style={container}
                        provider="google"
                        ref={mapRef}
                        initialRegion={userRegion}
                        onRegionChangeComplete={onRegionChange}
                        showsUserLocation={true}
                        minZoomLevel={7}
                        onLongPress={(e) => {
                            setUserPinLocation(e.nativeEvent.coordinate)
                            const { latitude, longitude } = e.nativeEvent.coordinate
                            userStore.reverseGeocodeCoordinates(latitude, longitude)
                        }}
                    >
                        {userPinLocation && <Marker coordinate={userPinLocation} />}
                    </MapView>
                    <View style={buttonContainer}>
                        <Button
                            contentStyle={buttonStyle}
                            mode="contained"
                            color="#f78522"
                            uppercase={false}
                            labelStyle={filledButtonLabelStyle}
                            onPress={() => saveLocation()}
                        >
                            Confirm
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
})

const styles = StyleSheet.create({
    container: { flex: 1 },
    cardStyle: {
        backgroundColor: COLOR_BLUE,
        height: isAndroid() ? 70 : 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        backgroundColor: COLOR_TEXT_BG,
        height: '80%',
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOR_TEXT_BG,
        overflow: 'hidden',
        flexDirection: 'row',
        alignContent: 'center',
        padding: 5,
    },
    textInputStyle: {
        width: '75%',
        height: '90%',
        color: 'black',
        fontSize: 15,
        backgroundColor: COLOR_TEXT_BG,
    },
    iconView: {
        width: 25,
        height: 25,
        alignSelf: 'center',
    },
    buttonStyle: { height: 50, width: '100%' },
    filledButtonLabelStyle: { color: '#fff', fontWeight: '600' },
    contentContainer: { flex: 1, backgroundColor: 'green', flexDirection: 'column' },
    buttonContainer: {
        width: '80%',
        height: 90,
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
    },
})

export default FindLocation
