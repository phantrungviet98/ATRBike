import {RENTING_BIKE_SUCCESS} from '../actions/actionTypes'

const initial = {
    lockId = ''
}

const rentingBikeSuccess = (state = initial, action) => {
    switch (action.type) {
        case RENTING_BIKE_SUCCESS:
            return action.payload
        default:
            return state
    }
}

export default rentingBikeSuccess