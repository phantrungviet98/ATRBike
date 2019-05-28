import {SETCURRENTUSER} from '../actions/actionTypes'

const initial = {
    user: {},
    token: ''
};

const setCurrentUser = (state = initial, action) => {
    switch (action.type) {
        case SETCURRENTUSER:
            console.log(action.payload);
            state = {
                user: action.payload.user,
                token: action.payload.token
            }
            return {...state};
        default:
            return state;
    }
}

export default setCurrentUser;