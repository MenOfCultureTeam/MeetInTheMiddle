import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class Form extends Component {
  map() {
    Actions.map();
  }
  render() {
    const forumType = this.props.type;
    return (
      <View>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Username"
          placeholderTextColor="#C0C0C0"
          selectionColor="#fff"
          keyboardType="default"
          onSubmitEditing={() => this.password.focus()}
        />
        {forumType == 'Signup' ? (
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
            secureTextEntry={false}
            placeholderTextColor="#C0C0C0"
            keyboardType="email-address"
            onSubmitEditing={() => this.password.focus()}
          />
        ) : null}
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#C0C0C0"
          ref={input => (this.password = input)}
        />

        <TouchableOpacity
          style={styles.button}
          //onPress={this.props.onAuthButtonPress}>
          onPress={this.map}>
          <Text style={styles.buttonText}>{forumType}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,1)',
    // borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: 'rgba(0, 0,0,1)',
    marginVertical: 10,
  },
  button: {
    width: 300,
    height: 55,
    backgroundColor: '#FF6201',
    // borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});
