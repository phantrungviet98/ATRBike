import { combineReducers } from 'redux'
import { combineEpics } from 'redux-observable'
import { persistReducer } from 'redux-persist'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'
import {rootEpic} from '../Epics'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  signIn: require('./SignInRedux').reducer
})


export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

  // let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)
  let { store, epicsManager, sagaMiddleware } = configureStore(finalReducers, rootEpic)

  // if (module.hot) {
  //   module.hot.accept(() => {
  //     const nextRootReducer = require('./').reducers
  //     store.replaceReducer(nextRootReducer)

  //     const newYieldedSagas = require('../Sagas').default
  //     epicsManager.cancel()
  //     epicsManager.done.then(() => {
  //       sagasManager = sagaMiddleware(newYieldedSagas)
  //     })
  //   })
  // }

  return store
}
