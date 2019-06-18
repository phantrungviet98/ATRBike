import { combineEpics } from 'redux-observable';
import {signInEpic} from './SignInEpic'
import { signUpEpic } from './SignUpEpic';
import { gettingStationEpic } from './GettingStationEpic'
import { rentingBikeEpic } from "./RentingBikeEpic";
import { locksRentingEpic } from './LocksRentingEpic'
import { pingEpic } from './PingEpic'
import { returnBikeEpic } from './ReturnBikeEpic'
export const rootEpic = combineEpics(
  signInEpic,
  signUpEpic,
  gettingStationEpic,
  rentingBikeEpic,
  locksRentingEpic,
  pingEpic,
  returnBikeEpic
);
