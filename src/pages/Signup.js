import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Logo from '../components/Logo';
import {emailValidator, passwordValidator, nameValidator} from '../core/utils';
import {signInUser} from '../api/auth-api';
export default class Signup extends Component {
  state = {username: '', email: '', password: '', loading: false, error: ''};
  render() {
    const _onSignUpPressed = async () => {
      if (this.state.loading) return;

      const nameError = nameValidator(this.state.username);
      const emailError = emailValidator(this.state.email);
      const passwordError = passwordValidator(this.state.password);

      if (emailError || passwordError || nameError) {
        if (emailError) {
          this.state.error = emailError;
        } else if (passwordError) {
          this.state.error = passwordError;
        } else {
          this.state.error = nameError;
        }
        console.log(this.state.error);
        return;
      }

      this.state.loading = true;

      const response = await signInUser({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      });

      if (response.error) {
        this.state.error = response.error;
      }

      this.state.loading = false;
    };
    return (
      <ImageBackground
        source={require('../images/road.png')}
        style={styles.backgroundImage}>
        <View style={styles.rectangle}>
          <Logo type="Signup" />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="email-address"
            returnKeyType="next"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            // error={!!email.error}
            // errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
          />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Username"
            placeholderTextColor="#C0C0C0"
            returnKeyType="next"
            value={this.state.name}
            onChangeText={username => this.setState({username})}
            // error={!!name.error}
            // errorText={name.error}
          />
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Password"
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            returnKeyType="done"
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            // error={!!password.error}
            // errorText={password.error}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={_onSignUpPressed}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>

          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={styles.signupButton}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Toast message={error} onDismiss={() => setError('')} /> */}
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#191816',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  signupButton: {
    color: '#FF6201',
    fontSize: 16,
    fontWeight: '500',
  },
  rectangle: {
    justifyContent: 'center',
    flex: 2,
    height: 550,
    width: 350,
    alignItems: 'center',
    backgroundColor: '#403E3F',
    position: 'absolute',
    alignSelf: 'center',
    top: 75,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
