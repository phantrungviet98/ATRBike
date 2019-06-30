import { ofType } from 'redux-observable'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'
import AppConfig from '../Config/AppConfig'
import PayboxCaptureRedux, { PayboxCaptureTypes } from '../Redux/PayboxCaptureRedux'

export const payboxCaptureEpic = action$ => action$.pipe(
  ofType(PayboxCaptureTypes.PAYBOX_CAPTURE_REQUEST),
  mergeMap(action =>
    ajax({
      url: AppConfig.HOST + ':' + AppConfig.PORT + '/v1/shared/paybox/capture',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Authorization': 'Bearer ' + action.token,
        'Content-Type': 'application/json',
        'app-id': 'c0c45117-7a5b-4169-b1fc-06178cdef31a',
        'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
      },
      body: {
        amount: action.amount
      }
    }).pipe(
      map(response => {
        return PayboxCaptureRedux.payboxCaptureSuccess(response.response)
      }),
      catchError(error => {
        console.log(error)
        return of(
            PayboxRegisterRedux.payboxCaptureFailure(error.response)
        )
      })
    )
  )
)