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
import {emailValidator, passwordValidator} from '../core/utils';
import {loginUser} from '../api/auth-api';
import Logo from '../components/Logo';
export default class Login extends Component {
  state = {email: '', password: '', loading: false, error: ''};
  render() {
    const _onLoginPressed = async () => {
      if (this.state.loading) return;

      const emailError = emailValidator(this.state.email);
      const passwordError = passwordValidator(this.state.password);

      if (emailError || passwordError) {
        if (emailError) {
          this.state.error = emailError;
        } else {
          this.state.error = passwordError;
        }
        console.log(this.state.error);
        return;
      }
      this.state.loading = true;
      // setLoading(true);

      const response = await loginUser({
        email: this.state.email,
        password: this.state.password,
      });

      if (response.error) {
        this.state.error = response.error;
      }
      this.state.loading = false;
      // setLoading(false);
    };
    return (
      <ImageBackground
        source={require('../images/road.png')}
        style={styles.backgroundImage}>
        <View style={styles.rectangle}>
          <Logo type="Login" />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Email"
            placeholderTextColor="#C0C0C0"
            returnKeyType="next"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
            // error={!!this.state.error}
            // errorText={this.state.error}
            autoCapitalize="none"
            //autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholderTextColor="#C0C0C0"
            placeholder="Password"
            returnKeyType="done"
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            // error={!!this.state.error}
            // errorText={this.state.error}
            secureTextEntry
            autoCapitalize="none"
          />
          <TouchableOpacity
            loading={this.state.loading}
            style={styles.button}
            onPress={_onLoginPressed}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>New User? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={styles.signupButton}>Click here to Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
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
