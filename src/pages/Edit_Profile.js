import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Button, ImageBackground} from 'react-native';
import {logoutUser} from '../api/auth-api';

//Feb 16, make sure you npm install react-native-animatable --save
//import animateable library
import * as Animateable from 'react-native-animatable'

export default class Profile_Welcome extends Component {
  render() {
    return (
      
      <ImageBackground style={styles.container} 
      source={require('../images/userProfileBG.jpg')}>

        <Animateable.View animation="bounceInDown">
          <Image
            style={{ width: 180, height: 180, top: 90}}
            source={require('../images/realuser.png')}
          />
        </Animateable.View>

        <Animateable.View style={styles.MainContainer} animation="bounceInRight">
          <Text style={styles.firstNameLB}>First Name:</Text>
          <TextInput
            style={styles.inputBox}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Jack"
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="default"
            onSubmitEditing={() => this.password.focus()}
          />
          <Text style={styles.lastNameLB}>Last Name:</Text>
          <TextInput
            style={styles.inputBox2}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Robinson"
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="default"
            onSubmitEditing={() => this.password.focus()}
          />
        </Animateable.View>


        <Animateable.Text style={styles.AddressLB} animation="bounceInLeft">Address:</Animateable.Text>

        <Animateable.View style={styles.MainContainer2} animation="bounceInLeft">
          <TextInput
            style={styles.inputBox3}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="3315 Maple Wood Ave."
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="default"
            onSubmitEditing={() => this.password.focus()}
          />
        </Animateable.View>

        <Animateable.Text style={styles.aptLB} animation="bounceInLeft">Appartment:</Animateable.Text>
        
        <Animateable.View animation="bounceInLeft">
          <TextInput
            style={styles.inputBox4}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Apt #6A"
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="default"
            onSubmitEditing={() => this.password.focus()}
          />
        </Animateable.View>

        <Animateable.View style={styles.buttonContainer} animation="zoomIn">
          <View style={styles.button}>
            <Button
              onPress={() => this.props.navigation.navigate('Map')}
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
        </Animateable.View>


      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: {paddingHorizontal: 10},
  buttonContainer: {
    top: 250,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  MainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
    
  },

  MainContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  firstNameLB:{

    top: 140,
    left:70,
    fontSize: 30,
    color:'#19194d'
  },
  inputBox: {
    height: 50,
    width: 250,
    top: 140,
    left:138,
    fontSize: 18,
    elevation: 2
  },
  lastNameLB:{
    top: 210,
    right: 163,
    fontSize: 18,
    color:'#19194d',
    },
  inputBox2: {
    height: 50,
    width: 250,
    top: 210,
    right: 95,
    fontSize: 18,   
    elevation: 2
  },
  AddressLB:{
    top: 245,
    right:150,
    fontSize: 18,
    color:'#19194d'
  },
  inputBox3: {
    height: 50,
    width: 250,
    top: 208,
    left: 40,
    fontSize: 18,    
    elevation: 2
  },
  aptLB:{
    top: 247,
    right:144,
    fontSize: 18,
    color:'#19194d',
  },
  inputBox4: {
    height: 50,
    width: 250,
    top: 210,
    left: 40,
    fontSize: 18,   
    elevation: 2
  },
  firstNameLB:{

    top: 140,
    left:70,
    fontSize: 18,
    color:'#19194d'
  },
  container: {
    // flexGrow: 1,
    height: 200,
    width: 410,
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
