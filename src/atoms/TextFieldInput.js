import React from 'react';

import {StyleSheet, TextInput, View} from 'react-native';
//text: String to display in placeholder
//textFieldType: Normal (requires text input), Email, Password
const TextFieldInput = ({text, textFieldType}) => {
  return (
    <View >
      {textFieldType == 'Normal' ? (
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder={text}
          placeholderTextColor="#C0C0C0"
          returnKeyType="next"
          //   value={this.state.name}
          //   onChangeText={username => this.setState({username})}
        />
      ) : textFieldType == 'Email' ? (
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="#C0C0C0"
          selectionColor="#fff"
          keyboardType="email-address"
          returnKeyType="next"
          // value={this.state.email}
          // onChangeText={email => this.setState({email})}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
        />
      ) : textFieldType == 'Password' ? (
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          placeholderTextColor="#C0C0C0"
          selectionColor="#fff"
          returnKeyType="done"
          //   value={this.state.password}
          //   onChangeText={password => this.setState({password})}
          secureTextEntry
          autoCapitalize="none"
        />
      ) : null}
    </View>
  );
};

export default TextFieldInput;
const styles = StyleSheet.create({

  inputBox: {
    top: 15,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 25,
    fontSize: 16,
    color: 'rgba(0, 0,0,1)',
    elevation: 7,
    marginVertical: 13,
    paddingHorizontal: 16,
  },
});

