import { combineReducers } from 'redux'
import setCurrentUser from './setCurrentUser'
import setStations from './setStations'

const allReducers = combineReducers({
    setCurrentUser, setStations 
})

export default allReducers;