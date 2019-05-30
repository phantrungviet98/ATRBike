import {SETCURRENTUSER, SETSTATIONS, SETLOCKS, RENTING_BIKE_FAILURE, RENTING_BIKE_SUCCESS, RENTING_BIKE_REQUEST} from './actionTypes'

export const setCurrentUser = (data) => {
    return {
        type: SETCURRENTUSER,
        payload: data
    }
}

export const setStations = (listStation) => {
    return {
        type: SETSTATIONS,
        payload: listStation
    }
} 

export const setLocks = (listLock) => {
    return {
        type: SETLOCKS,
        payload: listLock
    }
}

export const rentingBikeRequest = (lockID) => {
    return {
        type: RENTING_BIKE_REQUEST,
        payload: lockID
    }    
}

export const rentingBikeSuccess = (lockID) => {
    return {
        type: RENTING_BIKE_SUCCESS,
        payload: lockID
    }
}

export const rentingBikeFailure = (err) => {
    return {
        type: RENTING_BIKE_FAILURE,
        payload: err
    }
}