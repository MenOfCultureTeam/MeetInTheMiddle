import React from 'react';
import {StyleSheet, Platform, Image, Text, View} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
// import the different screens
import SignUp from './src/pages/Signup';
import Login from './src/pages/Login';
import AuthLoadingScreen from './src/pages/AuthLoadingScreen';
import Map from './src/pages/Map';
// create our app's navigation stack
export default createAppContainer(
  createSwitchNavigator(
    {
      Signup: SignUp,
      Login: Login,
      AuthLoadingScreen: AuthLoadingScreen,
      Map: Map,
    },
    {
      initialRouteName: 'AuthLoadingScreen',
    },
  ),
);
