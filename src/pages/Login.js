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
      GoogleLoginSuccess:false
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
          <View style={styles.errorView}>
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
          </View>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={styles.signupButton}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            loading={this.state.loading}
            style={styles.button}
            onPress={_onLoginPressed}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>


          {/* {this.state.GoogleLoginSuccess!=null?this.props.navigation.navigate('Map'):null} */}
          <GoogleSigninButton //Google sigin api button object
            style={{width: 192, height: 48}}
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
        </View>
      </ImageBackground>
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
  errorView: {
    paddingVertical: 10,
    justifyContent: 'space-between',
    // marginTop: 5,
  },
  errorText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'left',
    // top: 15,
    paddingVertical: 0,
    color: 'red',
  },
});
