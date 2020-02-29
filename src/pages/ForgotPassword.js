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
import {sendEmailWithPassword} from '../api/auth-api';

//Feb 16, make sure you npm install react-native-animatable --save
//import animateable library
import * as Animateable from 'react-native-animatable';

//Feb 17, make sure you npm install --save react-native-video
//import video for background usage
import Video from 'react-native-video';

//Feb 24
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Signup extends Component {
  state = {email: '', loading: false, error: ''};
  render() {
    const _onForgotPasswordPressed = async () => {
      if (this.state.loading) return;

      const emailError = emailValidator(this.state.email);
        if (emailError) {
          this.state.error = emailError;
          console.log(this.state.error);
          return;
        }

      this.state.loading = true;

      const response = await sendEmailWithPassword({
              email: this.state.email,
      });

      if (response.error) {
        this.state.error = response.error;
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
        <Animateable.View style={styles.rectangle} animation="slideInUp" delay={300}>
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

          <TouchableOpacity style={styles.button} onPress={_onForgotPasswordPressed}>
            <Text style={styles.buttonText}>Forgot Password</Text>
          </TouchableOpacity>

          <View style={styles.signupTextCont}>
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
    color: 'rgba(0,0,0,1)',
    fontSize: 16,
  },
  signupButton: {
    color: '#FF6201',
    fontSize: 20,
    fontWeight: '500',
  },
  rectangle: {
    height: 450,
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
  buttonText: {
    fontSize: 25,
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
