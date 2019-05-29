import {SETLOCKS} from '../actions/actionTypes'

const initial = {
    listLock: []
}

const setLocks = (state = initial, action) => {
    switch (action.type) {
        case SETLOCKS:
            console.log(action.payload)
            return action.payload
        default: 
            return state
    }
}

export default setLocks