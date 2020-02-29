
import React, {Component} from 'react';
import {View} from 'react-native';

import TextFieldInput from '../atoms/TextFieldInput'
import ErrorText from '../atoms/ErrorText'
export default class EmailPassword extends Component {
    render() {
      return (
        <View>
          <ErrorText/>
          <TextFieldInput textFieldType="Email"/>
          <TextFieldInput textFieldType="Password"/>
        </View>
      );
    }
  }

  