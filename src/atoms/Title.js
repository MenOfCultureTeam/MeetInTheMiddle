import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const TitleField = ({text}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.LoginText}>{text}</Text>
    </View>
  );
};

export default TitleField;

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
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
