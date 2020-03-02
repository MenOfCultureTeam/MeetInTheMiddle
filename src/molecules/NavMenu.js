import React, { Component } from 'react';
import { View, Image, TouchableOpacity, StyleSheet} from 'react-native';

//Navigation menu at map page 
export const NavMenu = () => {
    return (
    <View>
        <View style = {styles.MainBackground}>
          <View>
            <Image
              source={require('../images/Message.png')}
              style={{
                width: 40,
                height: 40,
                borderColor: 'black',
                borderRadius: 150 / 2,
              }}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Edit_Profile')}>
              <Image
                source={require('../images/user.png')}
                style={{height: 40, width: 40}}
              />
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('AddressInput')}>
            <Image
              source={require('../images/Location.png')}
              style={{
                width: 40,
                height: 40,
                borderColor: 'black',
                borderRadius: 150 / 2,
              }}
            />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );

    
};


const styles = StyleSheet.create({
    MainBackground: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }

});