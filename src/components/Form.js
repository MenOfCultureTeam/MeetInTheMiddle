import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class Form extends Component {
  state = {username: '', email: '', password: '', errorMessage: null};
  handleSignUp = () => {
    // TODO: Firebase stuff...
    console.log('handleSignUp');
  };
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
          // onSubmitEditing={() => this.password.focus()}
          onChangeText={password => this.setState({username})}
          value={this.state.username}
        />
        {forumType == 'Signup' ? (
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
            secureTextEntry={false}
            placeholderTextColor="#C0C0C0"
            keyboardType="email-address"
            onChangeText={email => this.setState({email})}
            // onSubmitEditing={() => this.password.focus()}
            value={this.state.email}
          />
        ) : null}
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#C0C0C0"
          // ref={input => (this.password = input)}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />

        {forumType == 'Login' ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Map')}>
            <Text style={styles.buttonText}>{forumType}</Text>
          </TouchableOpacity>
        ) : this.props.type == 'Signup' ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>{forumType}</Text>
          </TouchableOpacity>
        ) : null}
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
