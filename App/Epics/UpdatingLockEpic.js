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

    // const newStations = stations.map(station => {
    //   return station.locks.filter(lock => {
    //     if (lock._id !== lockId) {
    //       return true
    //     }
    //     return false
    //   })
    // })

    const newStations = stations.map(station => {
      console.log('station 1', station)

      const locks = station.locks.filter(lock => {
        if (lock._id !== lockId) {
          return true
        }
      })

      console.log('locks', locks)
      station.locks = locks
      
      console.log('station: ', station)
      return station
    })

    const a = stations.map(station => {

    })

    // let locks = station.locks
    // let newLocks = locks.filter((lock) => {
    //   return lock._id !== lockId})
    // station.locks = newLocks
    // newListStations.push(station)

    console.log('newStation',newStations)

    return newStations


  }), map((newStations) => {
    console.log('newSt: ',newStations)
    GettingStationRedux.updateLockSuccess(newStations)})
)