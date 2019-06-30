import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  payboxRegisterRequest: ['token' ,'cardValues'],
  payboxRegisterSuccess: ['response'],
  payboxRegisterFailure: ['error'],
})

export const PayboxRegisterTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  cardStatus: '',
  status: 'deactivated',
  error: null
})

/* ------------- Reducers ------------- */

export const payboxRegisterRequest = (state, action) => {
  console.log('payBoxRegisterRequest', INITIAL_STATE)
  return state.merge({status: 'activated'})
}

export const payboxRegisterSuccess = (state, action) => {
  
  return state.merge({status: 'finished', cardStatus: action.response.status, error: null})
}

export const payboxRegisterFailure = (state, action) => {
  console.log('payBoxRegisterFailure', action)
  return state.merge({status: 'finished',  cardStatus: '', error: action.error})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAYBOX_REGISTER_REQUEST]: payboxRegisterRequest,
  [Types.PAYBOX_REGISTER_SUCCESS]: payboxRegisterSuccess,
  [Types.PAYBOX_REGISTER_FAILURE]: payboxRegisterFailure,
})
