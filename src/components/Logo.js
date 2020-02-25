import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

//Feb 16, make sure you npm install react-native-animatable --save
//import animateable library
import * as Animateable from 'react-native-animatable'

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          style={{width: 150, height: 150}}
          source={require('../images/logo.png')}
        /> */}
        {this.props.type == 'Login' ? (
          <Text style={styles.LoginText}>Meet{"\n"}In{"\n"}Middle </Text>
        ) : this.props.type == 'Signup' ? (
          <Animateable.Text style={styles.SignupText} animation="slideInRight" delay = {1400}>Personal Info</Animateable.Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  //Feb 17, change some value for login logo
  LoginText: {
    marginVertical: 150,
    fontSize: 55,
    color: 'rgba(255, 255, 255,1)',
    fontWeight: 'bold',
    position: 'relative',
    top:-60,
    textShadowColor: '#333399',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1
  },
  SignupText: {
    marginVertical: 30,
    width: '100%',
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold',
    position: 'relative',
    top:10,
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius:5
  },
});
