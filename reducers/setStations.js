import {SETSTATIONS} from '../actions/actionTypes'

const initial = {
    listStation: []
}

const setStations = (state = initial, action) => {
    switch (action.type) {
        case SETSTATIONS:
            console.log(action.payload)
            return action.payload
        default: 
            return state
    }
}

export default setStations