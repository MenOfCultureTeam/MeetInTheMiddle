import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Logo from '../components/Logo';
import Form from '../components/Form';
export default class Signup extends Component {
  goBack() {
    Actions.pop();
  }
  render() {
    return (
      <ImageBackground
        source={require('../images/road.png')}
        style={styles.backgroundImage}>
        <View style={styles.rectangle}>
          <Logo type="Signup" />
          <Form type="Signup" />
          <View style={styles.signupTextCont}>
            <Text style={styles.signupText}>Already have an account? </Text>
            <TouchableOpacity onPress={this.goBack}>
              <Text style={styles.signupButton}>Sign in</Text>
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
});
