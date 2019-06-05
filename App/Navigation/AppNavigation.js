import { createStackNavigator, createAppContainer } from 'react-navigation'
import LaunchScreen from '../Containers/LaunchScreen'
import SignInScreen from '../Containers/SignInScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import StationScreen from '../Containers/StationScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  SignInScreen: { screen: SignInScreen },
  SignUpScreen: { screen: SignUpScreen },
  StationScreen: { screen: StationScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SignInScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
