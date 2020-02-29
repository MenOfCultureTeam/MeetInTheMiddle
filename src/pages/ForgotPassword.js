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
} from 'react-native';

import Logo from '../components/Logo';
import {sendEmailWithPassword} from '../api/auth-api';
export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          loading: false
        };
      }
  render() {
    const _SendPassword = async () => {
        if (this.state.loading) return;
        this.state.loading = true;
        const response = await sendEmailWithPassword({
            email: this.state.email,
            password: this.state.password,
          });
        this.state.loading = false;
    };
    return (
      <ImageBackground
        source={require('../images/road.png')}
        style={styles.backgroundImage}>
        <View style={styles.rectangle}>
            <Logo type="ForgotPassword" />
            <View style={styles.view}>
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Email"
                    placeholderTextColor="#C0C0C0"
                    returnKeyType="done"
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                    // error={!!this.state.error}
                    // errorText={this.state.error}
                    autoCapitalize="none"
                    //autoCompleteType="email"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                />  
                <Text style={styles.description}>Enter your email address. We'll send email instructions on how to reset your password</Text>
            </View>

            <TouchableOpacity
                    style={styles.button}
                    onPress={_SendPassword}> 

                    <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                    style={styles.buttonBack}
                    onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>


            </View>



      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({

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
    position: 'absolute',
    top: 350
  },
  buttonBack: {
    width: 300,
    height: 55,
    backgroundColor: '#FF6201',
    // borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 5,
    position: 'absolute',
    top: 425
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
  view: {
    // paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',   
    position: 'absolute',
    top:200,

    
  },
  SignupText: {
    // marginVertical: 45,
    fontSize: 36,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    alignSelf: 'center',    

    
  },
  description: {
    // marginVertical: 45,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 1)',
    // fontWeight: 'bold',
    // alignSelf: 'flex-start',
    lineHeight: 22,
    paddingHorizontal:20
    
    // position: 'absolute',
  },
});
