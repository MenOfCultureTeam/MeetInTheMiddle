import React, {Component} from 'react';
import {StyleSheet, Platform, Image, Text, View} from 'react-native';
import {SwitchNavigator} from 'react-navigation';
// import the different screens
import Loading from './src/pages/Loading';
import SignUp from './src/pages/SignUp';
import Login from './src/pages/Login';
import Main from './src/pages/Main';
import Map from './src/pages/Map';
// create our app's navigation stack
const App = SwitchNavigator(
  {
    Loading,
    SignUp,
    Login,
    Main,
    Map,
  },
  {
    initialRouteName: 'Loading',
  },
);
export default App;
