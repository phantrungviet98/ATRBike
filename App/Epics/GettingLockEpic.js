import { ofType } from 'redux-observable'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'
import GettingLockRedux, { GettingLockTypes } from '../Redux/GettingLockRedux'


export const gettingStationEpic = action$ => action$.pipe(
  ofType(GettingStationTypes.GETTING_STATION_REQUEST),
  mergeMap(action =>
    ajax({
      url: 'http://api.appebike.com:4000/v1/shared/stations?populate=locks',
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + action.token,
        'Content-Type': 'application/json',
        'app-id': 'c0c45117-7a5b-4169-b1fc-06178cdef31a',
        'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
      }
    }).pipe(
      map(response => {
        return GettingStationRedux.gettingStationSuccess({
          listStation: response.response.results
        })
      }),
      catchError(error => {
        return of(
          GettingStationRedux.gettingStationFailure(error.response)
        )
      })
    )
  )
)