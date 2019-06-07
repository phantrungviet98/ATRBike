import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  gettingLockRequest: ['stationId'],
  gettingLockSuccess: ['response'],
  gettingLockFailure: ['error'],
})

export const GettingLockTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  listLock: [],
  isRequesting: false,
  error: null

})

/* ------------- Reducers ------------- */

export const gettingLockRequest = (state, action) => {
  console.log('gettingLock', INITIAL_STATE)
  return state.merge({isRequesting: true})
}

export const gettingLockSuccess = (state, action) => {
  console.log('gettingLockSuccess', action)
  return state.merge({isRequesting: false, listStation: action.response.listStation})
}

export const gettingLockFailure = (state, action) => {
  console.log('gettingLockFailure', action)
  return state.merge({isRequesting: false, error: action.error, token: null, user: {}})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GETTING_LOCK_REQUEST]: gettingLockRequest,
  [Types.GETTING_LOCK_SUCCESS]: gettingLockSuccess,
  [Types.GETTING_LOCK_FAILURE]: gettingLockFailure,
})
