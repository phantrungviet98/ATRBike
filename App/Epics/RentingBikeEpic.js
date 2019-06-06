import AppConfig from '../Config/AppConfig'
import { ofType } from 'redux-observable'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'
import RentingBikeRedux, { RentingBikeTypes } from '../Redux/RentingBikeRedux'

export const rentingBikeEpic = action$ => action$.pipe(
  ofType(RentingBikeTypes.RENTING_BIKE_REQUEST),
  mergeMap(action =>
    ajax({
      url:  AppConfig.HOST + ':' + AppConfig.PORT + '/v1/shared/transactions/renting',
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + action.token,
        'Content-Type': 'application/json',
        'app-id': AppConfig.APP_ID,
        'secret-key': AppConfig.SECRET_KEY
      },
      body: {
        lockId: action.lockId
      }
    }).pipe(
      map(response => {
        return RentingBikeRedux.rentingBikeSuccess(response)
      }),
      catchError(error => {
        console.log('error',error)
        return of(
          RentingBikeRedux.rentingBikeFailure(error.response)
        )
      })
    )
  )
)