import {SETCURRENTTOKEN} from '../actions/actionTypes'

const setCurrentToken = (token = 'chua', action) => {
    switch (action.type) {
        case SETCURRENTTOKEN:
            console.log(action.payload)
            return action.payload;
        default:
            return token;
    }
}

export default setCurrentToken;