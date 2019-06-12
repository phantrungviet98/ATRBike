import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  locksRentingRequest: ['token'],
  locksRentingSuccess: ['locksRentingList'],
  locksRentingFailure: ['error'],
})

export const LocksRentingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  locksRentingList: [],
  isRequesting: false,
  error: null

})

/* ------------- Reducers ------------- */

export const locksRentingRequest = (state, action) => {
  console.log('locksRentingRequest', INITIAL_STATE)
  return state.merge({ isRequesting: true })
}

export const locksRentingSuccess = (state, action) => {
  console.log('locksRentingSuccess', action)
  return state.merge({ isRequesting: false, locksRentingList: action.locksRentingList, error: null })
}

export const locksRentingFailure = (state, action) => {
  console.log('locksRentingFailure', action)
  return state.merge({ isRequesting: false, rentingSuccessResponse: [], error: action.error })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOCKS_RENTING_REQUEST]: locksRentingRequest,
  [Types.LOCKS_RENTING_SUCCESS]: locksRentingSuccess,
  [Types.LOCKS_RENTING_FAILURE]: locksRentingFailure,
})
