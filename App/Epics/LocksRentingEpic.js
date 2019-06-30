import { ofType } from 'redux-observable'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'
import LocksRentingRedux, { LocksRentingTypes } from '../Redux/LocksRentingRedux'

export const locksRentingEpic = action$ => action$.pipe(
  ofType(LocksRentingTypes.LOCKS_RENTING_REQUEST),
  mergeMap(action =>
    ajax({
      url: 'http://api.appebike.com:4000/v1/shared/transactions/locks-renting',
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
        return LocksRentingRedux.locksRentingSuccess(response.response)
      }),
      catchError(error => {
        console.log('error',error)
        return of(
            LocksRentingRedux.locksRentingFailure(error.response)
        )
      })
    )
  )
)