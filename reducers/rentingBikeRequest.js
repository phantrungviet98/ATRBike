import {RENTING_BIKE_REQUEST} from '../actions/actionTypes'

const initial = {
    lockId = ''
}

const rentingBikeRequest = (state = initial, action) => {
    switch (action.type) {
        case RENTING_BIKE_REQUEST:
            return action.payload
        default:
            return state
    }
}

export default rentingBikeRequest