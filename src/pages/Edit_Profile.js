import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Button} from 'react-native';
import  map from '../pages/Map'
import { Actions } from 'react-native-router-flux';

export default class Profile_Welcome extends Component {
map(){
    Actions.map();
}

goback(){
  Actions.pop();
}
  render() {
    return (
      <View style={styles.container}>
          <Image style={{width: 150, height: 150, top: 80}} source={require('../images/realuser.png')} />   
          
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
          <Button
            onPress={() => this.goback()}
            title="Save Changes"
            color="orange"
          />
        </View>



        </View>
    );
  }
}

const styles = StyleSheet.create({

  buttonContainer:
  {
    top:300

  },
    MainContainer:
    {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    alignItems: 'center'
    },

    MainContainer2:
    {
    flexDirection: "row",
    justifyContent: 'space-evenly',

    },

    inputBox:
    {
        height: 50,
        width:135,
        top: 100,
        right: 35,
        fontSize: 18,
        borderColor:'black',
        borderWidth: .25
        
    },
    inputBox2:
    {
        height: 50,
        width:135,
        top: 100,
        left: 35,
        fontSize: 18,
        borderColor:'black',
        borderWidth: .25
        
    },
    inputBox3:
    {
        height: 50,
        width:300,
        top: 120,
        fontSize: 18,
        borderColor:'black',
        borderWidth: .20
        
    },
    inputBox4:
    {
        height: 50,
        width:300,
        top: 130,
        fontSize: 18,
        borderColor:'black',
        borderWidth: .20
        
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
 
rectangle : {

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


}

});
