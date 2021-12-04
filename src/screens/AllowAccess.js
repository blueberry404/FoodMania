import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { Headline, Paragraph, Button } from 'react-native-paper'

import { IMG_LOCATION_MAP } from '../../assets/images'

const AllowAccess = ({ navigation }) => {
    const {
        container,
        spacer,
        contentContainer,
        img,
        headline,
        info,
        containerButtons,
        buttonStyle,
        filledButtonLabelStyle,
        textButtonStyle,
        textButtonLabelStyle,
    } = styles

    return (
        <View style={container}>
            <View style={spacer} />
            <View style={contentContainer}>
                <Image style={img} source={IMG_LOCATION_MAP} />
                <Headline style={headline}>Find Restaurant and Shops near you!</Headline>
                <Paragraph style={info}>
                    By allowing location access, you can search for restaurants and shops near you
                    and receive more accurate delivery.
                </Paragraph>
            </View>
            <View style={containerButtons}>
                <Button
                    contentStyle={buttonStyle}
                    mode="contained"
                    color="#f78522"
                    uppercase={false}
                    labelStyle={filledButtonLabelStyle}
                    onPress={() => console.log('Pressed')}
                >
                    Allow Location Access
                </Button>
                <Button
                    contentStyle={textButtonStyle}
                    mode="text"
                    color="#f78522"
                    uppercase={false}
                    labelStyle={textButtonLabelStyle}
                    onPress={() => navigation.navigate('FindLocation')}
                >
                    Enter My Location
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 30 },
    spacer: { flex: 1 },
    contentContainer: { flex: 3, alignItems: 'center' },
    img: { width: 120, height: 120 },
    headline: { marginTop: 60, marginBottom: 10, fontWeight: 'bold', textAlign: 'center' },
    info: { textAlign: 'center' },
    containerButtons: { flex: 2 },
    buttonStyle: { height: 50 },
    filledButtonLabelStyle: { color: '#fff', fontWeight: '600' },
    textButtonLabelStyle: { color: '#f78522', fontWeight: '600' },
    textButtonStyle: { marginTop: 20, alignSelf: 'center' },
})

export default AllowAccess
