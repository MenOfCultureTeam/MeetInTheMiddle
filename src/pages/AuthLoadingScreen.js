import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {FIREBASE_CONFIG} from '../core/config';

// Initialize Firebase
!firebase.apps.length
  ? firebase.initializeApp(FIREBASE_CONFIG)
  : firebase.app();
console.log(firebase.name);
export default class AuthLoadingScreen extends Component {
  render() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is logged in
        this.props.navigation.navigate('Map');
      } else {
        // User is not logged in
        this.props.navigation.navigate('Login');
      }
    });
    return <ActivityIndicator size="large" color={'#ffffff'} />;
  }
}
