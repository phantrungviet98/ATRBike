import { ofType } from 'redux-observable'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'
import SignInRedux, { SignInTypes } from '../Redux/SignInRedux'

export const signInEpic = action$ => action$.pipe(
  ofType(SignInTypes.SIGN_IN_REQUEST),
  // mergeMap(action =>
  //   ajax.getJSON(`http://api.appebike.com:4000/v1/shared/auth/sign-in`)
  //     .pipe(
  //       map(response => fetchDataFulfilled(response))
  //     )
  // )

  mergeMap(action =>
    ajax({
      url: 'http://api.appebike.com:4000/v1/shared/auth/sign-in',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'app-id': 'c0c45117-7a5b-4169-b1fc-06178cdef31a',
        'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
      },
      body: {
        phoneNumber: action.contentSignInRequest.phoneNumber,
        countryCode: action.contentSignInRequest.countryCode,
        password: action.contentSignInRequest.password
      }
    }).pipe(
      map(response => {
        return SignInRedux.signInSuccess({
          token: response.response.token, 
          user: response.response.user
        })
      }),
      catchError(error => {
        console.log('error',error)
        return of(
          SignInRedux.signInFailure(error.response)
        )
      })
    )
  )
)