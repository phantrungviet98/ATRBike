import { ofType } from 'redux-observable'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'
import AppConfig from '../Config/AppConfig'
import PingRedux, { PingTypes } from '../Redux/PingRedux'
import LocksRentingRedux from '../Redux/LocksRentingRedux'

export const pingEpic = action$ => action$.pipe(
  ofType(PingTypes.PING_REQUEST),
  mergeMap(action =>
    ajax({
      url: AppConfig.HOST + ':' + AppConfig.PORT + '/v1/shared/auth/ping',
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
        console.log('action.token',action.token)
        return PingRedux.pingSuccess(response.response)
      }),
      catchError(error => {
        return of(
            PingRedux.pingSuccess(error.response)
        )
      })
    )
  )
)