import React, { Component } from 'react';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import { View, Text } from 'react-native';
import {RoundButton, StandardButton} from '../atoms/Button';
import { NavMenu } from '../molecules/NavMenu';


class Testpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  user = {
  name: '',
  address:'',
  email:'moeoj',
  };

 readUserData() {
   return(
    firebase.database().ref('User info/').once('value', function (snapshot) {
        user.email = snapshot.val().email;
        user.name = snapshot.val().name;
        user.address = snapshot.val().address;
    })
   );
  }
  
  render() {

    const email = this.readUserData()
   
    return (
      <View>
    <Text>{email}</Text>
      </View>
    );
  }
}

export default Testpage;
