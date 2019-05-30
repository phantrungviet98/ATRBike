import {RENTING_BIKE_FAILURE} from '../actions/actionTypes'

const initial = {
    err = ''
}

const rentingBikeFailure = (state = initial, action) => {
    switch (action.type) {
        case RENTING_BIKE_FAILURE:
            return action.payload
        default:
            return state
    }
}

export default rentingBikeFailure