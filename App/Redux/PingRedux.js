import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  pingRequest: ['token'],
  pingSuccess: ['response'],
  pingFailure: ['error'],
})

export const PingTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  value : 'notpong',
  status: 'deactivated',
  error: null

})

/* ------------- Reducers ------------- */

export const pingRequest = (state, action) => {
  console.log('pingRequest', INITIAL_STATE)
  return state.merge({status: 'activated'})
}

export const pingSuccess = (state, action) => {
  console.log('pingSuccess', action)
  return state.merge({status: 'finished', value: action.response.value, error: null})
}

export const pingFailure = (state, action) => {
  console.log('pingFailure', action)
  return state.merge({status: 'finished',  value: '', error: action.error})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PING_REQUEST]: pingRequest,
  [Types.PING_SUCCESS]: pingSuccess,
  [Types.PING_FAILURE]: pingFailure,
})
