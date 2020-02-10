import React from 'react';
import {StyleSheet, Platform, Image, Text, View} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
// import the different screens
import SignUp from './src/pages/Signup';
import Login from './src/pages/Login';
import AuthLoadingScreen from './src/pages/AuthLoadingScreen';
import Map from './src/pages/Map';
import Edit_Profile from './src/pages/Edit_Profile';
import Profile_Welcome from './src/pages/Profile_Welcome';
// create our app's navigation stack
export default createAppContainer(
  createSwitchNavigator(
    {
      Signup: SignUp,
      Login: Login,
      AuthLoadingScreen: AuthLoadingScreen,
      Map: Map,
      Edit_Profile: Edit_Profile,
      Profile_Welcome: Profile_Welcome,
    },
    {
      initialRouteName: 'AuthLoadingScreen',
    },
  ),
);
