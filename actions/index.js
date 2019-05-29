import {SETCURRENTUSER, SETSTATIONS, SETLOCKS} from './actionTypes'

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