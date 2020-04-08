import React, {Component} from 'react';
import { View, Text,Image } from 'react-native';
import * as Animateable from 'react-native-animatable'


export const Userimg = () => {
return (
<Animateable.View animation="bounceInDown">
          <Image
            style={{borderColor: 'green', borderWidth:5, borderRadius: 100, width: 180, height: 180, top: 90}}
            source={require('../images/realuser.png')}
          />
</Animateable.View>
);
};

