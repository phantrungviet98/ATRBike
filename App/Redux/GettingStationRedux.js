import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gettingStationRequest: ['token'],
  gettingStationSuccess: ['response'],
  gettingStationFailure: ['error'],

  updateLockRequest: ['lockData'],
  updateLockSuccess: ['payload']
})

export const GettingStationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  listStation: [],
  isRequesting: false,
  error: null
})

/* ------------- Reducers ------------- */

export const gettingStationRequest = (state, action) => {
  console.log('gettingStation', INITIAL_STATE)
  return state.merge({ isRequesting: true })
}

export const gettingStationSuccess = (state, action) => {
  console.log('gettingStationSuccess', action)
  return state.merge({ isRequesting: false, listStation: action.response.listStation })
}

export const gettingStationFailure = (state, action) => {
  console.log('gettingStationSuccess', action)
  return state.merge({ isRequesting: false, error: action.error, token: null, user: {} })
}


export const updateLockRequest = (state, action) => {
  console.log('updateLockRequest', action)
  return state.merge({ isRequesting: true })
}

export const updateLockSuccess = (state, action) => {
  console.log('updateLockSuccess', action)
  
  return state.merge({ isRequesting: false, listStation: action.payload})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GETTING_STATION_REQUEST]: gettingStationRequest,
  [Types.GETTING_STATION_SUCCESS]: gettingStationSuccess,
  [Types.GETTING_STATION_FAILURE]: gettingStationFailure,

  [Types.UPDATE_LOCK_REQUEST]: updateLockRequest,
  [Types.UPDATE_LOCK_SUCCESS]: updateLockSuccess
})
