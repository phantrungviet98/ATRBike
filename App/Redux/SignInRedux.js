import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signInRequest: ['contentSignInRequest'],
  signInSuccess: ['response'],
  signInFailure: ['error'],
  signOut: []
})

export const SignInTypes = Types
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
  console.log(INITIAL_STATE)
  return state.merge({isRequesting: true})
}

export const signInSuccess = (state, action) => {
  console.log(action)
  return state.merge({isRequesting: false, token: action.response.token, user: action.response.user})
}

export const signInFailure = (state, action) => {
  console.log(action)
  return state.merge({isRequesting: false, error: action.error})
}

export const signOut = (state, action) => INITIAL_STATE

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_REQUEST]: signInRequest,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILURE]: signInFailure,
  [Types.SIGN_OUT]: signOut,
})
