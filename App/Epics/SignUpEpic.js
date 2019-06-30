import { ofType } from 'redux-observable'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { of } from 'rxjs'
import SignUpAction, { SignUpTypes } from '../Redux/SignUpRedux'

export const signUpEpic = action$ => action$.pipe(
  ofType(SignUpTypes.SIGN_UP_REQUEST),
  mergeMap(action =>
    ajax({
      url: 'http://api.appebike.com:4000/v1/shared/auth/sign-up',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'app-id': 'c0c45117-7a5b-4169-b1fc-06178cdef31a',
        'secret-key': 'adb56c27-ea8d-49a8-a94d-68a1d4cb4d80'
      },
      body: {
        username: action.contentSignUpRequest.username,
        email: action.contentSignUpRequest.email,
        phoneNumber: action.contentSignUpRequest.phoneNumber,
        countryCode: action.contentSignUpRequest.countryCode,
        profile: {
          firstName: action.contentSignUpRequest.profile.firstName,
          lastName: action.contentSignUpRequest.profile.lastName
        },
        password: action.contentSignUpRequest.password

      }
    }).pipe(
      map(response => {
        return SignUpAction.signUpSuccess({
          token: response.response.token,
          user: response.response.user
        })
      }),
      catchError(error => {
        return of(
          SignUpAction.signUpFailure(error.response)
        )
      })
    )
  )
)