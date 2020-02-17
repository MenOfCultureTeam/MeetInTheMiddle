import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';
import {logoutUser} from '../api/auth-api';
export default class Profile_Welcome extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 150, height: 150, top: 80}}
          source={require('../images/realuser.png')}
        />

        <View style={styles.MainContainer}>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Jack"
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="default"
            onSubmitEditing={() => this.password.focus()}
          />

          <TextInput
            style={styles.inputBox2}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Robinson"
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="default"
            onSubmitEditing={() => this.password.focus()}
          />
        </View>

        <View style={styles.MainContainer2}>
          <TextInput
            style={styles.inputBox3}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="3315 Maple Wood Ave."
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="default"
            onSubmitEditing={() => this.password.focus()}
          />
        </View>

        <TextInput
          style={styles.inputBox4}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Apt #6A"
          placeholderTextColor="#C0C0C0"
          selectionColor="#fff"
          keyboardType="default"
          onSubmitEditing={() => this.password.focus()}
        />

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              onPress={() => this.props.navigation.navigate('Map', {findAddress: false})}
              title="Save Changes"
              color="orange"
            />
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => logoutUser()}
              title="Sign Out"
              color="orange"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {paddingHorizontal: 10},
  buttonContainer: {
    top: 300,
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  MainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  MainContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  inputBox: {
    height: 50,
    width: 135,
    top: 100,
    right: 35,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 0.25,
  },
  inputBox2: {
    height: 50,
    width: 135,
    top: 100,
    left: 35,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 0.25,
  },
  inputBox3: {
    height: 50,
    width: 300,
    top: 120,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 0.2,
  },
  inputBox4: {
    height: 50,
    width: 300,
    top: 130,
    fontSize: 18,
    borderColor: 'black',
    borderWidth: 0.2,
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
    color: 'black',
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
  MainHeadline: {
    marginVertical: 50,
    fontSize: 36,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: 'bold',
    position: 'absolute',
  },

  rectangle: {
    justifyContent: 'center',
    flex: 2,
    height: 200,
    width: 200,
    alignItems: 'center',
    backgroundColor: '#403E3F',
    position: 'absolute',
    alignSelf: 'center',
    top: 95,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
  },
});
