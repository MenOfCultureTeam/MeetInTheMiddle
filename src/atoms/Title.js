import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const TitleField = ({text}) => {
  return (

    <Text style={styles.LoginText}>{text}</Text>

  );
};

export default TitleField;

const styles = StyleSheet.create({

  LoginText: {
    marginVertical: 150,
    fontSize: 55,
    color: 'rgba(255, 255, 255,1)',
    fontWeight: 'bold',
    position: 'relative',
    top: -60,
    textShadowColor: '#333399',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },
});
