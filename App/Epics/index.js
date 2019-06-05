import { combineEpics } from 'redux-observable';
import {signInEpic} from './SignInEpic'
import { signUpEpic } from './SignUpEpic';
import { gettingStationEpic } from './GettingStationEpic'
export const rootEpic = combineEpics(
  signInEpic,
  signUpEpic,
  gettingStationEpic
);
