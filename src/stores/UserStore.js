import React from 'react'
import { action, makeObservable, observable } from 'mobx'
import Geolocation from 'react-native-geolocation-service'

class UserStore {
    location = null
    locationError = null

    constructor() {
        makeObservable(this, {
            location: observable,
            locationError: observable,
            fetchUserLocation: action,
            getLocationSuccess: action,
            getLocationError: action,
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
}

const observableUserStore = new UserStore()
export const UserStoreContext = React.createContext(observableUserStore)
export const useUserStore = () => React.useContext(UserStoreContext)
