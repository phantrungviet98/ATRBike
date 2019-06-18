import AppConfig from '../Config/AppConfig'
import { ofType } from 'redux-observable'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'
import ReturnBikeRedux, { ReturnBikeTypes } from '../Redux/ReturnBikeRedux'

export const returnBikeEpic = action$ => action$.pipe(
  ofType(ReturnBikeTypes.RETURN_BIKE_REQUEST),
  mergeMap(action =>
    ajax({
      url:  AppConfig.HOST + ':' + AppConfig.PORT + '/v1/shared/transactions/return',
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + action.token,
        'Content-Type': 'application/json',
        'app-id': AppConfig.APP_ID,
        'secret-key': AppConfig.SECRET_KEY
      },
      body: {
        lockId: action.contentReturnBikeRequest.lockId,
        endAtStationId: action.contentReturnBikeRequest.endAtStationId
      }
    }).pipe(
      map(response => {
        return ReturnBikeRedux.returnBikeSuccess(response)
      }),
      catchError(error => {
        console.log('error',error)
        return of(
          ReturnBikeRedux.returnBikeFailure(error.response)
        )
      })
    )
  )
)