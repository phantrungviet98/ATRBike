import AppConfig from '../Config/AppConfig'
import { ofType } from 'redux-observable'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'
import GettingStationRedux, { GettingStationTypes } from '../Redux/GettingStationRedux'

export const updateLockEpic = (action$, state$) => action$.pipe(
  ofType(GettingStationTypes.UPDATE_LOCK_REQUEST),
  mergeMap(action => {
    const lockId = action.lockData._id
    const stations = state$.value.gettingStation.listStation
    console.log(lockId)
    console.log(stations)

    const newStations = stations.map(station => {
      return station.locks.filter(lock => {
        if (lock._id !== lockId) {
          return true
        }
        return false
      })
    })

      // let locks = station.locks
      // let newLocks = locks.filter((lock) => {
      //   return lock._id !== lockId})
      // station.locks = newLocks
      // newListStations.push(station)
    

    console.log('newStation', newStations)
  })
)