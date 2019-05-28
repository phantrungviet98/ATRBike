import {SETCURRENTUSER, SETCURRENTTOKEN} from './actionTypes'

export const setCurrentUser = (data) => {
    return {
        type: SETCURRENTUSER,
        payload: data
    }
}