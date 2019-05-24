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


const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  SignIn: {screen: SignInScreen},
  SignUp: {screen: SignUpScreen}
},
{
  initialRouteName: "SignIn",
  
});

export default App = createAppContainer(MainNavigator)
