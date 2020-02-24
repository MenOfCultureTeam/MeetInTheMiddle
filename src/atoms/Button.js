import React from 'react';

import {TouchableOpacity, Text} from 'react-native';
//text: String to display in placeholder
const Button = ({text}) => {
  return (
    <TouchableOpacity
    //   loading={this.state.loading}
    //   style={styles.button}
    //   onPress={_onLoginPressed}
    >
      <Text> {text} </Text>
    </TouchableOpacity>
  );
};

export default Button;
