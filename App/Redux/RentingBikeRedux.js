import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  rentingBikeRequest: ['token', 'lockId'],
  rentingBikeSuccess: ['response'],
  rentingBikeFailure: ['error'],
})

export const RentingBikeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  rentingSuccessResponse: {} ,
  status: 'deactivated',
  error: null

})

/* ------------- Reducers ------------- */

export const rentingBikeRequest = (state, action) => {
  console.log('rentingBikeRequest', INITIAL_STATE)
  return state.merge({status: 'activated'})
}

export const rentingBikeSuccess = (state, action) => {
  console.log('rentingBikeSuccess', action)
  return state.merge({status: 'finished', rentingSuccessResponse: action.response, error: null})
}

export const rentingBikeFailure = (state, action) => {
  console.log('rentingBikeFailure', action)
  return state.merge({status: 'finished',  rentingSuccessResponse: {}, error: action.error})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RENTING_BIKE_REQUEST]: rentingBikeRequest,
  [Types.RENTING_BIKE_SUCCESS]: rentingBikeSuccess,
  [Types.RENTING_BIKE_FAILURE]: rentingBikeFailure,
})
