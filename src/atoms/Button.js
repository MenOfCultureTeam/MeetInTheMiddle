import React from 'react';
import { View } from 'react-native';
import {TouchableOpacity, Text, StyleSheet,Image} from 'react-native';
//text: String to display in placeholder
export const Button = ({text}) => {
  return (
    <TouchableOpacity
    // loading={this.state.loading}
    // onPress={_onLoginPressed}
    style={styles.button}
    >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
  );
};


export const RoundButton = () => {
  return(
    <View style={styles.MainContainer2}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Edit_Profile')}>
                <Image
                  source={require('../images/user.png')}
                  style={{height: 40, width: 40}}
                />
              </TouchableOpacity>
      </View>

  );

};


const styles = StyleSheet.create({
  button: {
    width: '40%',
    height: 55,
    backgroundColor: '#FF6201',
    marginVertical: 23,
    paddingVertical: 5,
    elevation: 3,
    marginLeft: 5,
    right:5
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});
