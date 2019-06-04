import { combineEpics } from 'redux-observable';
import {signInEpic} from './SignInEpic'
export const rootEpic = combineEpics(
  signInEpic
);
