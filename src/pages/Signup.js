import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
  TextField,
  alert
} from 'react-native';

import Logo from '../components/Logo';
import {emailValidator, passwordValidator, nameValidator} from '../core/utils';
import {signInUser} from '../api/auth-api';


//Feb 16, make sure you npm install react-native-animatable --save
//import animateable library
import * as Animateable from 'react-native-animatable';

//Feb 17, make sure you npm install --save react-native-video
//import video for background usage
import Video from 'react-native-video';

//Feb 24
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Signup extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      Name:'',
      email: '',
      password: '',
      fullName: '',
      loading: false,
      error: '',
      ErrorStatus: false,
    };
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount = async () => {
    this._isMounted = true;
  };

  render() {
    const _onSignUpPressed = async () => {
      if (this.state.loading) return;

      const nameError = nameValidator(this.state.username);
      const emailError = emailValidator(this.state.email);
      const passwordError = passwordValidator(this.state.password);

      if (emailError || passwordError || nameError) {
        if (emailError) {
          this.state.error = emailError;
          this.setState({error: emailError, ErrorStatus: true});
        } else if (nameError) {
          this.state.error = nameError;
          this.setState({error: nameError, ErrorStatus: true});
        } else {
          this.state.error = passwordError;
          this.setState({error: passwordError, ErrorStatus: true});
        }

        // Alert.alert(this.state.error);
        //console.log(this.state.error);
        return;
      } else {
        if (this._isMounted) {
          this.setState({error: '', ErrorStatus: false});
        }
      }

      this.state.loading = true;

      const response = await signInUser({
        Name: this.state.Name,
        username:this.state.username,
        email: this.state.email,
        password: this.state.password,
      });

      if (response.error) {
        this.state.error = response.error;
        this.setState({error: response.error, ErrorStatus: true});
        // Alert.alert(response.error);
      } else {
        if (this._isMounted) {
          this.setState({error: '', ErrorStatus: false});
          this.props.navigation.navigate('Map')
        }
      }

      this.state.loading = false;
    };
    return (
      <View style = {styles.container}>
        <Video source ={require('../images/loginAnimatedBG.mp4')}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={"cover"}
        rate={1.0}
        ignoreSilentSwitch={"obey"}/>
        <Animateable.View style={styles.rectangle} animation="slideInUp" delay = {1400}>
        <KeyboardAwareScrollView>
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
            value={this.state.username}
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
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Full Name"
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="email-address"
            returnKeyType="next"
            value={this.state.Name}
            onChangeText={Name => this.setState({Name})}
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
        </KeyboardAwareScrollView>
        </Animateable.View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  signupButton: {
    color: '#FF6201',
    fontSize: 16,
    fontWeight: '500',
  },
  rectangle: {
    height: 530,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(220, 220, 220, 0.6)',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center', 
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderTopLeftRadius:55,
    borderTopRightRadius:55
  },
  inputBox: {
    width: '100%',
    backgroundColor: 'rgba(255, 255,255, 1)',
    borderRadius: 25,
    fontSize: 16,
    color: 'rgba(0, 0,0,1)',
    elevation: 7,
    marginVertical: 10,
    paddingHorizontal: 16
  },
  button: {
    width: '100%',
    height: 55,
    backgroundColor: '#FF6201',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 5,
    elevation: 7,
  },
  errorText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'left',
    // top: 15,
    paddingVertical: 0,
    color: 'red',
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top:0,
    left:0,
    bottom:0,
    right:0
  }
});
