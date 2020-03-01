
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import TextFieldInput from '../atoms/TextFieldInput'
import ErrorText from '../atoms/ErrorText'
export default class UsernameEmailPassword extends Component {
    render() {
      return (
        <View>
          <ErrorText/>
          <TextFieldInput text="Username" textFieldType="Normal"/>
          <TextFieldInput textFieldType="Email"/>
          <TextFieldInput textFieldType="Password"/>

        </View>
      );
    }
  }