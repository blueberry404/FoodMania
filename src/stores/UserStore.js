import React from 'react'
import { action, makeObservable, observable, runInAction } from 'mobx'
import Geolocation from 'react-native-geolocation-service'

import keys from '../../keys.json'

class UserStore {
    location = null
    locationError = null
    locationAddress = null
    addressInfo = null

    constructor() {
        makeObservable(this, {
            location: observable,
            locationError: observable,
            locationAddress: observable,
            fetchUserLocation: action,
            getLocationSuccess: action,
            getLocationError: action,
            reverseGeocodeCoordinates: action,
        })
    }

    updateLocation(loc) {
        this.location = loc
    }

    fetchUserLocation() {
        this.getCurrentLocation().then(this.getLocationSuccess, this.getLocationError)
    }

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                (position) => {
                    resolve(position)
                },
                (error) => {
                    reject(error)
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            )
        })
    }

    getLocationSuccess = (locInfo) => {
        console.log(JSON.stringify(locInfo))
        const { longitude, latitude } = locInfo.coords
        this.location = { latitude, longitude }
    }

    getLocationError = (err) => {
        console.log(err)
        this.location = null
        this.locationError = err
    }

    async reverseGeocodeCoordinates(latitude, longitude) {
        // eslint-disable-next-line max-len
        const url = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apikey=${keys.HERE}&mode=retrieveAddresses&prox=${latitude},${longitude}`
        console.log(url)
        try {
            // eslint-disable-next-line no-undef
            const response = await fetch(url, { method: 'GET' })
            console.log(response)
            const resJson = await response.json()
            // console.log(JSON.stringify(resJson))
            if (
                resJson &&
                resJson.Response &&
                resJson.Response.View &&
                resJson.Response.View[0] &&
                resJson.Response.View[0].Result &&
                resJson.Response.View[0].Result[0]
            ) {
                runInAction(() => {
                    this.addressInfo = resJson.Response.View[0].Result[0].Location.Address
                    this.locationAddress = resJson.Response.View[0].Result[0].Location.Address.Label
                    // console.log(JSON.stringify(this.addressInfo))
                })
            } else {
                runInAction(() => {
                    this.addressInfo = null
                    this.locationAddress = null
                })
            }
        } catch (err) {
            console.error(err)
            runInAction(() => {
                this.addressInfo = null
                this.locationAddress = null
            })
        }
    }
}

const observableUserStore = new UserStore()
export const UserStoreContext = React.createContext(observableUserStore)
export const useUserStore = () => React.useContext(UserStoreContext)
