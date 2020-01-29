import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        {/* <Image
          style={{width: 150, height: 150}}
          source={require('../images/logo.png')}
        /> */}
        <Text style={styles.logoText}>Meet in the Middle</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  logoText: {
    marginVertical: 75,
    fontSize: 36,
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: "bold",
    position: "absolute"
  },
});
