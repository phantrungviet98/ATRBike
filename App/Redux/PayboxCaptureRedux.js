import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  payboxCaptureRequest: ['token' ,'amount'],
  payboxCaptureSuccess: ['response'],
  payboxCaptureFailure: ['error'],
})

export const PayboxCaptureTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  cardStatus: '',
  status: 'deactivated',
  error: null
})

/* ------------- Reducers ------------- */

export const payboxCaptureRequest = (state, action) => {
  console.log('payboxCaptureRequest', INITIAL_STATE)
  return state.merge({status: 'activated'})
}

export const payboxCaptureSuccess = (state, action) => {
    console.log('payboxCaptureSuccess', INITIAL_STATE)
  return state.merge({status: 'finished', cardStatus: action.response.status, error: null})
}

export const payboxCaptureFailure = (state, action) => {
  console.log('payboxCaptureFailure', action)
  return state.merge({status: 'finished',  cardStatus: '', error: action.error})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAYBOX_CAPTURE_REQUEST]: payboxCaptureRequest,
  [Types.PAYBOX_CAPTURE_SUCCESS]: payboxCaptureSuccess,
  [Types.PAYBOX_CAPTURE_FAILURE]: payboxCaptureFailure,
})
