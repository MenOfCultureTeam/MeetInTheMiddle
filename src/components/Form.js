import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { SwitchActions } from 'react-navigation';
export default class Form extends Component {
  state = {username: '', email: '', password: '', errorMessage: null};
  handleSignUp = () => {
     auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => this.props.navigation.navigate('Main'))
    .catch(function(error){
      // Handle Errors here.
      var errorCode = error.code;
      this.setState({errorMessage})
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('Email already associated with another account.');
        // Handle account linking here, if using.
      } else {
        console.error(error);
      }
    }); 
  };
  handleLogin = () => {
      //  const { email, password } = this.state
      //  auth()
      // .signInWithEmailAndPassword(email, password)
      // .catch(function(error){
      //   // Handle Errors here.
      //   var errorCode = error.code;
      //   this.setState({errorMessage})
      //   if (errorCode === 'auth/wrong-password') {
      //     alert('Wrong password.');
      //   } else {
      //     alert(errorMessage);
      //   }
      //   console.log(error);
      // });

      SwitchActions.jumpTo('Main');

       
  };
  render() {
    const forumType = this.props.type;
    return (
      <View>
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Email"
          placeholderTextColor="#C0C0C0"
          selectionColor="#fff"
          keyboardType="email-address"
          // onSubmitEditing={() => this.password.focus()}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        {forumType == 'Signup' ? (
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Username"
            secureTextEntry={false}
            placeholderTextColor="#C0C0C0"
            keyboardType="email-address"
            //onChangeText={email => this.setState({email})}
            // onSubmitEditing={() => this.password.focus()}
            //value={this.state.email}
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
            onPress={this.handleLogin}>
            <Text style={styles.buttonText}>{forumType}</Text>
          </TouchableOpacity>
        ) : this.props.type == 'Signup' ? (
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleSignUp}>
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
