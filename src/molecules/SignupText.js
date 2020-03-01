
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ClickableText from '../atoms/ClickableText';

export default class SignupText extends Component {
    render() {
      return (
        <View>
            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>New User? </Text>
              <ClickableText text="Click here to Signup" location="Signup"/>
            </View>
        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    signupTextCont: {
      flexGrow: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingVertical: 16,
      flexDirection: 'row',
    },
    signupText: {
      color: 'rgba(82, 82, 82, 1)',
      fontSize: 16,
    },
});