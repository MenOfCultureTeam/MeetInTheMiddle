import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, TouchableOpacity, Text} from 'react-native';
import Button from '../atoms/Button'
import UsernameEmailPassword from '../molecules/UsernameEmailPassword'
import BackgroundVideo from '../atoms/BackgroundVideo';
import Logo from '../components/Logo'
import * as Animateable from 'react-native-animatable'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class SignupOrganism extends Component {
    render() {
      return (
        <View style={styles.container}>
            <BackgroundVideo/>
            <Logo type="Signup" />
            <Animateable.View style={styles.rectangle}  animation="slideOutUp" delay={300}>
              <KeyboardAwareScrollView>
                <UsernameEmailPassword/>
                <Button text="Signup"/>
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
  });

  