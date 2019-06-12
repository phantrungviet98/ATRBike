import { combineEpics } from 'redux-observable';
import {signInEpic} from './SignInEpic'
import { signUpEpic } from './SignUpEpic';
import { gettingStationEpic } from './GettingStationEpic'
import { rentingBikeEpic } from "./RentingBikeEpic";
import { updateLockEpic } from './UpdatingLockEpic'
import { locksRentingEpic } from './LocksRentingEpic'
export const rootEpic = combineEpics(
  signInEpic,
  signUpEpic,
  gettingStationEpic,
  rentingBikeEpic,
  updateLockEpic,
  locksRentingEpic
);
