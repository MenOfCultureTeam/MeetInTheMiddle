import React, {Component} from 'react';
import * as Animateable from 'react-native-animatable'
import {TextInput, StyleSheet} from 'react-native';



export const Infofield = ({title})=>{
   return( 

    <Animateable.View style={styles.MainContainer2} animation="bounceInLeft">
    <TextInput
      style={styles.inputBox}
      underlineColorAndroid="rgba(0,0,0,0)"
      placeholder={title}
      placeholderTextColor="#C0C0C0"
      selectionColor="#fff"
      keyboardType="default"
      onSubmitEditing={() => this.password.focus()}
    />
  </Animateable.View>

   );
};

const styles = StyleSheet.create({

    inputBox: {
    height: 50,
    width: 250,
    top: 0,
    left:0,
    fontSize: 18,
    borderWidth: 2,
    borderColor: 'green',
    elevation: 2
    },

    MainContainer2: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        borderWidth: 2,
        borderColor: 'blue',
      },


});



