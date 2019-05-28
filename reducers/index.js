import { combineReducers } from 'redux'
import setCurrentUser from './setCurrentUser'

const allReducers = combineReducers({
    setCurrentUser,
})

export default allReducers;