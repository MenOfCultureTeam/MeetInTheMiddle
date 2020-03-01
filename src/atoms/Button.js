import React from 'react';

import {TouchableOpacity, Text, StyleSheet} from 'react-native';
//text: String to display in placeholder
const Button = ({text}) => {
  return (
    <TouchableOpacity
    // loading={this.state.loading}
    // onPress={_onLoginPressed}
    style={styles.button}
    > 
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#FF6201',
    borderRadius: 25,
    marginVertical: 23,
    paddingVertical: 5,
    elevation: 7,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});
