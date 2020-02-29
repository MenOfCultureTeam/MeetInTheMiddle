import React, {Component}from 'react';

import {TouchableOpacity, Text, StyleSheet, navigation} from 'react-native';
//text: String to display 
const ClickableText = ({text, location}) => {
  return (
    <TouchableOpacity
        onPress={() => navigation.navigate(location)}>
        <Text style={styles.signupButton}>{text}</Text>
  </TouchableOpacity>
  );
};

export default ClickableText;

const styles = StyleSheet.create({
    signupButton: {
        color: '#FF6201',
        fontSize: 16,
        fontWeight: '500',
        alignSelf: 'center'
        },
});