import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, Image, TextInput, Button,TouchableOpacity, ImageBackground} from 'react-native';
import {logoutUser} from '../api/auth-api';

//Feb 16, make sure you npm install react-native-animatable --save
//import animateable library
import * as Animateable from 'react-native-animatable'

//Apr 6, imagepicker
import ImagePicker from 'react-native-image-picker'
//import storage from '@react-native-firebase/storage'

export default class EditProfile1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: require('../images/user.png'),
    };
  }

  selectFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { 
          name: 'customOptionKey', 
          title: 'Choose file from Custom Option' 
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      //console.log('Response = ', response);
      //console.log('Response = ', response.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(response.customButton);
      } else {
        let source = {uri:response.uri};
        console.log('Response = ', source);
        this.setState({
          avatarSource: source,
        });
      }
    });
  };
  //updateprofile(firstname,lastname, address, source.uri,)
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.rectangle}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Edit_Profile')}>
            <Image style={styles.returnIcon} source={require('../images/return.png')} />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
        </View>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={this.selectFile.bind(this)}>
          <Image style={styles.avatar} source ={this.state.avatarSource}/>
          </TouchableOpacity>
        </View>
        <View style ={styles.editContent}>
          <Text style={styles.firstNameLB}>Full Name:</Text>
          <TextInput
            style={styles.inputBox1}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Jack"
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="default"
            onSubmitEditing={() => this.password.focus()}
          />
          <Text style={styles.lastNameLB}>Username:</Text>
          <TextInput
            style={styles.inputBox2}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="Robinson"
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="default"
            onSubmitEditing={() => this.password.focus()}
          />
          <Text style={styles.addressLB}>Password:</Text>
          <TextInput
            style={styles.inputBox3}
            underlineColorAndroid="rgba(0,0,0,0)"
            placeholder="*******."
            placeholderTextColor="#C0C0C0"
            selectionColor="#fff"
            keyboardType="default"
            onSubmitEditing={() => this.password.focus()}
          />

        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.props.navigation.navigate('Edit_Profile')}>
            <Text style={styles.updateText}>UPDATE PROFILE</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#ffffff",
  },
  rectangle: {
    width: '100%',
    height: '9%',
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    paddingTop:18,
    paddingLeft:8
    //flexDirection: 'row',
    //paddingTop: '5%',
  },
  title:{
    fontSize: 20,
    color: '#5A5757',
    textShadowColor: '#000000',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 2,
    position:"absolute",
    top:'35%',
    left: '38%'
  }, 
  returnIcon: {
    
  },
  avatarContainer:{
    padding: 20,
  },
  avatar:{
    borderColor: '#969696', 
    borderWidth:5, 
    borderRadius: 90, 
    width: 180, 
    height: 180, 
    alignSelf:'center'
  },
  editContent:{
    padding:40,
    justifyContent:"space-around"
  },
  firstNameLB:{
    paddingTop:10,
    color: '#00c8ff',
    fontWeight: "bold",
    lineHeight:20,
    textShadowColor: '#c2c9cc',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 1,
  },
  lastNameLB:{
    paddingTop:10,
    color: '#42c8f5',
    fontWeight: "bold",
    lineHeight:20,
    textShadowColor: '#c2c9cc',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 1,
  },
  addressLB:{
    paddingTop:10,
    color: '#42c8f5',
    fontWeight: "bold",
    lineHeight:20,
    textShadowColor: '#c2c9cc',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 1,
  },
  phoneNumberLB:{
    paddingTop:10,
    color: '#42c8f5',
    fontWeight: "bold",
    lineHeight:20,
    textShadowColor: '#c2c9cc',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 1,
  },
  inputBox1:{
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 2,
    height:35
  },
  inputBox2:{
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 2,
    height:35
  },
  inputBox3:{
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 2,
    height:35
  },
  inputBox4:{
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 2,
    height:35
  },
  buttonContainer:{
    flex:1
  },
  buttonStyle:{
    width: '80%',
    height: 50,
    backgroundColor: '#42c8f5',
    borderRadius: 25,
    elevation: 2,
    alignSelf:'center'
  },
  updateText:{
    top:10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: '#969696',
    textShadowOffset: {width: -1, height: -1},
    textShadowRadius: 2,
  }
});
