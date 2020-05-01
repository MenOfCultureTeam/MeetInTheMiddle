import React, { Component } from 'react';
import { View } from 'react-native-animatable';
import {Button} from '../atoms/Button'
import { StyleSheet } from 'react-native';


export const ButtonCarousel = ({button1,button2}) => {
  
return(

<View style = {styles.buttonContainer}>
<Button text={button1}/>
<Button style = {styles.button2} text={button2}/>
</View>

);

};


const styles = StyleSheet.create({

    buttonContainer: {
        top: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: 'green',
      },

      button1: {
          top: 60
      },

      button2: {
        top: 30

      }


});
