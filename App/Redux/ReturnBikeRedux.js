import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  returnBikeRequest: ['token', 'contentReturnBikeRequest'],
  returnBikeSuccess: ['response'],
  returnBikeFailure: ['error'],
})

export const ReturnBikeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  duration: -1,
  amount: -1,
  status: 'deactivated',
  error: null
})

/* ------------- Reducers ------------- */

export const returnBikeRequest = (state, action) => {
  console.log('returnBikeRequest', INITIAL_STATE)
  return state.merge({status: 'activated'})
}

export const returnBikeSuccess = (state, action) => {
  console.log('returnBikeSuccess', action)
  return state.merge({status: 'finished', duration: action.response.response.duration, amount: action.response.response.amount, error: null})
}

export const returnBikeFailure = (state, action) => {
  console.log('returnBikeFailure', action)
  return state.merge({status: 'finished', duration: -1, amount: -1,  error: action.error})
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RETURN_BIKE_REQUEST]: returnBikeRequest,
  [Types.RETURN_BIKE_SUCCESS]: returnBikeSuccess,
  [Types.RETURN_BIKE_FAILURE]: returnBikeFailure,
})
