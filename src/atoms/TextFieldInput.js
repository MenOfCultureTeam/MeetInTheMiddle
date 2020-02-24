import React from 'react';

import {StyleSheet, TextInput, View} from 'react-native';
//text: String to display in placeholder
//textFieldType: Normal (requires text input), Email, Password
const TextFieldInput = ({text, textFieldType}) => {
  return (
    <View style={styles.container}>
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
  container: {
    // flexGrow: 1,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,1)',
    borderRadius: 25,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'rgba(0, 0,0,1)',
    top: 60,
    marginVertical: 8,
    elevation: 8,
  },
});
