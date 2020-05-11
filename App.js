import React from 'react';
import {StyleSheet, Platform, Image, Text, View} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
// import the different screens
import SignUp from './src/pages/Signup';
import Login from './src/pages/Login';
import AuthLoadingScreen from './src/pages/AuthLoadingScreen';
import Map from './src/pages/Map';
import friendList from './src/pages/friendList';
import addFriend from './src/pages/addFriend';
import Edit_Profile from './src/pages/Edit_Profile';
import Edit_Profile1 from './src/pages/Edit_Profile1';
import Profile_Welcome from './src/pages/Profile_Welcome';
import AddressInput from './src/pages/AddressInput';
import ForgotPassword from './src/pages/ForgotPassword';
import LoginOrganism from './src/organisms/LoginOrganism'
import SignupOrganism from './src/organisms/SignupOrganism'
import {FlatListDemo} from "./src/pages/FlatListDemo";
import Testpage from "./src/pages/Testpage"
import Chatroom from "./src/pages/Chatroom"
import ChatMenu from "./src/pages/ChatMenu"
// create our app's navigation stack
export default createAppContainer(
  createSwitchNavigator(
    {
      Signup: SignUp,
      Login: Login,
      AuthLoadingScreen: AuthLoadingScreen,
      Map: Map,
      friendList: friendList,
      addFriend: addFriend,
      Edit_Profile: Edit_Profile,
      Edit_Profile1: Edit_Profile1,
      Profile_Welcome: Profile_Welcome,
      AddressInput: AddressInput,
      ForgotPassword: ForgotPassword,
      LoginOrganism: LoginOrganism,
      SignupOrganism: SignupOrganism,
      Testpage: Testpage,
      FlatListDemo: FlatListDemo,
      Chatroom: Chatroom,
      ChatMenu: ChatMenu
    },
    {
      initialRouteName: 'Signup',
    },
  ),
);
