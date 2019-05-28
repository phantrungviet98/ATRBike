/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import SignInScreen from './Screens/SignInScreen'
import HomeScreen from './Screens/HomeScreen'
import {createStackNavigator, createAppContainer} from 'react-navigation';
import SignUpScreen from './Screens/SignUpScreen';
import {createStore} from 'redux'
import allReducers from './reducers/index'
import {Provider} from 'react-redux'


const MainNavigator = createAppContainer(createStackNavigator({
  Home: {screen: HomeScreen},
  SignIn: {screen: SignInScreen},
  SignUp: {screen: SignUpScreen}
},
{
  initialRouteName: "SignIn",
  
}));

const store = createStore(allReducers)

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigator/>
      </Provider>
      

    )
  }
}
