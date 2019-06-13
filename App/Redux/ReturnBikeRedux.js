import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  returnBikeRequest: ['contentReturnBikeRequest'],
  returnBikeSuccess: ['response'],
  returnBikeFailure: ['error'],
})

export const ReturnBikeTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  token: null,
  user: {},
  isRequesting: false,
  error: null
})

/* ------------- Reducers ------------- */

export const signInRequest = (state, action) => {
  console.log('signInRequest', INITIAL_STATE)
  return state.merge({isRequesting: true})
}

export const signInSuccess = (state, action) => {
  console.log('signSuccess', action)
  return state.merge({isRequesting: false, token: action.response.token, user: action.response.user, error: null})
}

export const signInFailure = (state, action) => {
  console.log('signFailure', action)
  return state.merge({isRequesting: false, error: action.error, token: null, user: {}})
}

export const signOut = (state, action) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_REQUEST]: signInRequest,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILURE]: signInFailure,
  [Types.SIGN_OUT]: signOut,
})
