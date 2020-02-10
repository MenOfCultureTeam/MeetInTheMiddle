import React from 'react';
import {StyleSheet, Platform, Image, Text, View} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
// import the different screens
import Loading from './src/pages/Loading';
import SignUp from './src/pages/Signup';
import Login from './src/pages/Login';
import Main from './src/pages/Main';
import Map from './src/pages/Map';
import Form from './src/components/Form';
// create our app's navigation stack
export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      Signup: SignUp,
      Login: Login,
      Main: Main,
      Map: Map,
      Form: Form,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
