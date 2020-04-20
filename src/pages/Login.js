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
} from 'react-native';
import {emailValidator, passwordValidator} from '../core/utils';
import {loginUser} from '../api/auth-api';
import Logo from '../components/Logo';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

//Feb 16, make sure you npm install react-native-animatable --save
//import animateable library
import * as Animateable from 'react-native-animatable';

//Feb 17, make sure you npm install --save react-native-video
//import video for background usage
import Video from 'react-native-video';

//Feb 24
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Login extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      loading: false,
      error: '',
      ErrorStatus: false,
    };
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  componentDidMount = async () => {
    // this._isMounted = true;
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // google services are available
    } catch (err) {
      console.error('play services are not available');
    }
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      this.setState({GoogleLoginSuccess: userInfo});

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    this.setState({isLoginScreenPresented: !isSignedIn});
  };

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({currentUser});
  };

  setSigninState() {
    if (this.isSignedIn == true) {
      this.state = {display: 'map'};
    }
  }

  revokeAccess = async () => {
    try {
      await GoogleSignin.revokeAccess();
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({user: currentUser}); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const _onLoginPressed = async () => {
      if (this.state.loading) return;

      const emailError = emailValidator(this.state.email);
      const passwordError = passwordValidator(this.state.password);

      if (emailError || passwordError) {
        if (emailError) {
          this.state.error = emailError;
          this.setState({error: emailError, ErrorStatus: true});
        } else {
          this.state.error = passwordError;
          this.setState({error: passwordError, ErrorStatus: true});
        }
        // Alert.alert(this.state.error);
        // console.log(this.state.error);
        return;
      } else {
        if (this._isMounted) {
          this.setState({error: '', ErrorStatus: false});
        }
      }
      this.state.loading = true;
      // setLoading(true);

      const response = await loginUser({
        email: this.state.email,
        password: this.state.password,
      });

      if (response.error) {
        this.state.error = response.error;
        // Alert.alert(this.state.error);
        this.setState({error: response.error, ErrorStatus: true});
      } else {
        if (this._isMounted) {
          this.setState({error: '', ErrorStatus: false});
        }
        this.props.navigation.navigate('Map');
      }
      this.state.loading = false;

      
      // setLoading(false);
    };

    return (
      <View style={styles.container}>
        <Video
          source={require('../images/loginAnimatedBG.mp4')}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
        <Logo type="Login" />
        <Animateable.View
          style={styles.rectangle}
          animation="slideInUp"
          delay={1400}>
          <KeyboardAwareScrollView>
            {this.state.ErrorStatus == true ? (
              <Text style={styles.errorText}>{this.state.error}</Text>
            ) : null}
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

            <GoogleSigninButton //Google sigin api button object
              style={{width: 301, height: 51}}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn}
              disabled={this.state.isSigninInProgress}
            />
            <View style={styles.signupTextCont}>
              <Text style={styles.signupText}>New User? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Signup')}>
                <Text style={styles.signupButton}>Click here to Signup</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              loading={this.state.loading}
              style={styles.signupTextCont}
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.signupText}>Forgot Password?</Text>
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </Animateable.View>
      </View>
    );
  }
}

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '881043020153-8nuct9uetj96pd4qh3af8o9v7tdgmcg3.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  //  hostedDomain: '', // specifies a hosted domain restriction
  //  loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
  //  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
  //  accountName: '', // [Android] specifies an account name on the device that should be used
  //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
});

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
    height: 370,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(220, 220, 220, 0.6)',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
    borderTopLeftRadius: 55,
    borderTopRightRadius: 55,
  },
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
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  errorText: {
    fontWeight: 'bold',
    top: 10,
    color: 'rgb(230, 0, 0)',
    fontSize: 18,
    textAlign: 'center',
    textShadowColor: '#FFFFFF',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
});
