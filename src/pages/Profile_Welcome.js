import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Edit_Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.LoginText}>
          <View style={styles.MainContainer3}>
            <Image
              source={require('../images/realuser.png')}
              style={{
                width: 100,
                position: 'absolute',
                height: 100,
                left: 100,
                top: 130,
                borderColor: 'black',
                borderRadius: 150 / 2,
              }}
            />
          </View>

          <Text style={styles.SignInName}>Jack Robinson</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer3: {
    alignContent: 'center',
  },
  SignInName: {
    color: 'black',
    fontSize: 46,
    top: 250,
  },
  container: {
    // flexGrow: 1,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  LoginText: {
    marginVertical: 50,
    fontSize: 36,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    position: 'absolute',
  },
  SignupText: {
    marginVertical: 45,
    fontSize: 36,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    position: 'absolute',
  },
});
