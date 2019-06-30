import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gettingStationRequest: ['token'],
  gettingStationSuccess: ['response'],
  gettingStationFailure: ['error'],
})

export const GettingStationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  listStation: [],
  status: 'deactivated',
  error: null
})

/* ------------- Reducers ------------- */

export const gettingStationRequest = (state, action) => {
  console.log('gettingStation', INITIAL_STATE)
  return state.merge({ status: 'activated' })
}

export const gettingStationSuccess = (state, action) => {
  console.log('gettingStationSuccess', action)
  return state.merge({ status: 'finished', listStation: action.response.listStation, error: null })
}

export const gettingStationFailure = (state, action) => {
  console.log('gettingStationFailure', action)
  return state.merge({ status: 'finished', error: action.error, token: null, user: {} })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GETTING_STATION_REQUEST]: gettingStationRequest,
  [Types.GETTING_STATION_SUCCESS]: gettingStationSuccess,
  [Types.GETTING_STATION_FAILURE]: gettingStationFailure,
})
