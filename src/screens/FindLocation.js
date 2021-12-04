import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'
import { IconButton, Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLOR_BLUE, COLOR_PINK, COLOR_TEXT_BG, COLOR_GRAY_ICON } from '../colors'

const FindLocation = ({ navigation }) => {
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
                            placeholder="Enter delivery address"
                            autoCorrect={false}
                            borderWidth={0}
                        />
                        <IconButton
                            icon="close-circle-outline"
                            style={iconView}
                            color={COLOR_GRAY_ICON}
                            size={20}
                            onPress={() => {}}
                        />
                        <IconButton
                            icon="crosshairs-gps"
                            style={iconView}
                            color={COLOR_PINK}
                            size={20}
                            onPress={() => {}}
                        />
                    </View>
                </View>
                <View style={contentContainer}>
                    <View style={container}></View>
                    <View style={buttonContainer}>
                        <Button
                            contentStyle={buttonStyle}
                            mode="contained"
                            color="#f78522"
                            uppercase={false}
                            labelStyle={filledButtonLabelStyle}
                            onPress={() => console.log('Pressed')}
                        >
                            Confirm
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    cardStyle: {
        backgroundColor: COLOR_BLUE,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        backgroundColor: COLOR_TEXT_BG,
        height: 40,
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
