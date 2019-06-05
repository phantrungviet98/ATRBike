import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  signUpRequest: ['contentSignUpRequest'],
  signUpSuccess: ['response'],
  signUpFailure: ['error'],
})

export const SignUpTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  token: null,
  user: {},
  isRequesting: false,
  error: null

})

/* ------------- Reducers ------------- */

export const signUpRequest = (state, action) => {
  console.log(INITIAL_STATE)
  return state.merge({isRequesting: true})
}

export const signUpSuccess = (state, action) => {
  console.log(action)
  return state.merge({isRequesting: false, token: action.response.token, user: action.response.user, error: null})
}

export const signUpFailure = (state, action) => {
  console.log(action)
  return state.merge({isRequesting: false, error: action.error, token: null, user: {}})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_UP_REQUEST]: signUpRequest,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_FAILURE]: signUpFailure,
})