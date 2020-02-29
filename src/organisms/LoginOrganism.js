import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Button from '../atoms/Button'
import EmailPassword from '../molecules/EmailPassword'
import BackgroundVideo from '../atoms/BackgroundVideo';
import Logo from '../components/Logo'
import * as Animateable from 'react-native-animatable'
import GoogleSignInButtonAtom from '../atoms/GoogleSignInButtonAtom'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SignupText from '../molecules/SignupText'
import ClickableText from '../atoms/ClickableText';
export default class LoginOrganism extends Component {
    render() {
      return (
        <View style={styles.container}>
            <BackgroundVideo/>
            <Logo type="Login" />
            <Animateable.View style={styles.rectangle} animation="slideInUp" delay={1400}>
              <KeyboardAwareScrollView>
                <EmailPassword/>
                <Button text="Login"/>
                <GoogleSignInButtonAtom/>
                <SignupText/>
                <ClickableText text="Forgot Password?" location="ForgotPassword"/>
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
  });

  