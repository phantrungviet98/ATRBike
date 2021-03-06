import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import SignInScreen from '../Containers/SignInScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import StationScreen from '../Containers/StationScreen'
import LockScreen from '../Containers/LockScreen'
import RentingBikeScreen from '../Containers/RentingBikeScreen'
import RentingBikeSuccessfullyScreen from '../Containers/RentingBikeSuccessfullyScreen'
import GreetingScreen from '../Containers/GreetingScreen'
import AddCardScreen from '../Containers/AddCardScreen'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  SignInScreen: { screen: SignInScreen },
  SignUpScreen: { screen: SignUpScreen },
  AddCardScreen: { screen: AddCardScreen },
  StationScreen: { screen: StationScreen },
  RentingBikeScreen: { screen: RentingBikeScreen},
  RentingBikeSuccessfullyScreen: { screen: RentingBikeSuccessfullyScreen },
  GreetingScreen: {screen: GreetingScreen}
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'GreetingScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})


export default createAppContainer(PrimaryNav)
