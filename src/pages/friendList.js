





import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, Image, TextInput, Button,TouchableOpacity, ImageBackground} from 'react-native';
import {logoutUser} from '../api/auth-api';

//Feb 16, make sure you npm install react-native-animatable --save
//import animateable library
import * as Animateable from 'react-native-animatable';

//Apr 6, imagepicker
import ImagePicker from 'react-native-image-picker';

import Video from 'react-native-video';
//import storage from '@react-native-firebase/storage'

export default class friendList extends Component {
    constructor(props) {
        super(props);
        this.state = {

    };
    }

  render() {
    return (
        <View style={styles.container}>
            <View style ={styles.topBar}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
                <Image style={styles.returnIcon} source={require('../images/return.png')} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('addFriend')}>
                <Image style={styles.settingIcon} source={require('../images/editIcon.png')} />
            </TouchableOpacity>
        </View>

        <View style={styles.editContent}>
        </View>

        <View style={styles.rectangle}>
          <View style={styles.MainContainerMain}>
            <View style={styles.MainContainer}>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('friendList')}>
                <Image
                    source={require('../images/Message.png')}
                    style={{
                    width: 40,
                    height: 40,
                    borderColor: 'black',
                    borderRadius: 150 / 2,
                    }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.MainContainer2}>
                <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Edit_Profile')}>
                <Image
                    source={require('../images/user.png')}
                    style={{height: 40, width: 40}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.MainContainer3}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
    //Main Container
    container: {
        flex: 1,
        justifyContent:'space-between'
    },
    //Top Bar Container
    topBar:{
        elevation: 9,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:'white'
    },
    returnIcon:{

    },
    settingIcon:{

    },
    // Content Container
    editContent:{
        width: '100%',
        backgroundColor:'#FFFFFF'
        },
    // Footer Container
    rectangle: {
        elevation: 15,
        height:60,
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        alignItems: 'center',
        backgroundColor: 'white',
        bottom:0,
        borderColor: '#f5f5f5',
        borderWidth: 2,
    },
    MainContainerMain: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'space-between',
    },
    MainContainer:{
        height: 40,
        width: 40,
        backgroundColor: 'white',
        borderColor: 'white',
        marginHorizontal:'10%'  
    },
    MainContainer2: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderColor: 'white',
    marginHorizontal:'10%'  
    },
    MainContainer3:{
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderColor: 'white',
    marginHorizontal:'10%'  
    }
});
