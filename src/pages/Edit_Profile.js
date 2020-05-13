import React, {Component} from 'react';
import {StyleSheet, Dimensions, Text, View, Image, TextInput, Button,TouchableOpacity, ImageBackground} from 'react-native';
import {logoutUser} from '../api/auth-api';

//Feb 16, make sure you npm install react-native-animatable --save
//import animateable library
import * as Animateable from 'react-native-animatable';

//Apr 6, imagepicker
import ImagePicker from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import Video from 'react-native-video';
//import storage from '@react-native-firebase/storage'

export default class Edit_Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: require('../images/user.png'),
      username: '',
      currentPassword: '',
      newPassword:'',
      email:'',
      name:''
    };
    this.user=firebase.auth().currentUser;
    this.uid=this.user.uid; 
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
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(response.customButton);
      } else {
        let source = {uri:response.uri};
        this.setState({
          avatarSource: source,
        });
      }
    });
  };

  getRef() {
    return firebase.database().ref();
  }

  readDatabase = async () => {
    let promise = this.getRef().child("Users/").once("value")
    return await promise;
  }


  readUserIDs = async (userid) => {
    let promise = this.getRef().child("UserIDs/"+userid).once("value")
    return await promise;
  }


  readUsers = async (_id) => {
    let promise = this.getRef().child("Users/"+_id).once("value")
    return await promise;
  }


  componentDidMount = async () => {
  
    let users = await this.readUsers(this.uid);
    console.log(this.uid);
    console.log(users);
    console.log(users.val().Username);

    this.setState({
      email: users.val().Email,
      username: users.val().Username,
      name: users.val().Name
    })

  };


 
  //updateprofile(firstname,lastname, address, source.uri,)
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgContainer}>
          <Video
            source={require('../images/profileBG.mp4')}
            style={styles.backgroundVideo}
            muted={true}
            repeat={true}
            resizeMode={'cover'}
            rate={1.0}
            ignoreSilentSwitch={'obey'}
          />
          <View style ={styles.topBar}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
              <Image style={styles.returnIcon} source={require('../images/return.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Edit_Profile1')}>
              <Image style={styles.settingIcon} source={require('../images/editIcon.png')} />
            </TouchableOpacity>
          </View>
          <View style ={styles.userPicName}>
    <Text style={styles.fullName}></Text>
            <Image style={styles.avatar} source ={this.state.avatarSource}/>
          </View>
        </View>

        <View style={styles.editContent}>
        <Animateable.View
          style={styles.fullNameBar}
          animation="fadeInLeft">
            <ImageBackground source={require('../images/fullNameIcon.png')} style={styles.fullNameIcon}>
            </ImageBackground>
            <Text></Text>
            <Text style={styles.fullNameBox}>{this.state.name}</Text>
            <Text></Text>
          </Animateable.View>
          <Animateable.View
          style={styles.usernameBar}
          animation="fadeInRight">
            <ImageBackground source={require('../images/usernameIcon.png')} style={styles.fullNameIcon}>
            </ImageBackground>
            <Text></Text>
            <Text style={styles.usernameBox}>{this.state.username}</Text>
            <Text></Text>
          </Animateable.View>
          <Animateable.View
          style={styles.passwordBar}
          animation="fadeInLeft">
            <ImageBackground source={require('../images/passwordIcon.png')} style={styles.passwordIcon}>
            </ImageBackground>
            <Text></Text>
    <Text style={styles.passwordBox}>{this.state.email}</Text>
            <Text></Text>
          </Animateable.View>
          <TouchableOpacity style ={styles.loggoutBtn} onPress={() => logoutUser()}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rectangle}>
          <View style={styles.MainContainerMain}>
            <View style={styles.MainContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('friendList')}>
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
  container: {
    flex: 1, 
  },
  bgContainer:{
    height:'38%'
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  editContent:{
    flex:3,
    width: '100%',
    height:'62%',
    backgroundColor:'#FFFFFF',
    justifyContent:'space-around'
  },
  topBar:{
    flex:1,
    elevation: 9,
    flexDirection:'row',
    justifyContent:'space-between',
    padding:14,
  },
  returnIcon:{

  },
  settingIcon:{

  },
  userPicName:{
    flexDirection:'row',
    flex:5,
    justifyContent:'space-between',
  },
  fullName:{
    flex:4,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#808080',
    textAlign:'left'
  },
  avatar:{
    flex: 3,
    borderColor: '#969696', 
    borderWidth:3, 
    borderRadius: 300, 
    height: 200,
    width: 70, 
    alignSelf:'flex-end'
  },
  fullNameBar:{
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center',
  },
  fullNameIcon:{
    width: 61,
    height: 61,
    borderRadius: 150/2,
    backgroundColor: '#ffffff',
    elevation: 9,
  },
  fullNameBox:{
    fontSize: 32,
    fontWeight: 'bold',
    color: '#808080',
    textAlign:'center'
  },
  usernameBar:{
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center'
  },
  usernameIcon:{
    width: 61,
    height: 61,
    borderRadius: 150/2,
    backgroundColor: '#ffffff',
    elevation: 9,
  },
  usernameBox:{
    fontSize: 32,
    fontWeight: 'bold',
    color: '#808080',
    textAlign:'center'
  },
  passwordBar:{
    flexDirection: 'row',
    justifyContent:'space-around',
    alignItems: 'center'
  },
  passwordIcon:{
    width: 61,
    height: 61,
    borderRadius: 150/2,
    backgroundColor: '#ffffff',
    elevation: 9,
  },
  passwordBox:{
    fontSize: 32,
    fontWeight: 'bold',
    color: '#808080',
    textAlign:'center'
  },
  emailBar:{
    flexDirection: 'row',
    justifyContent:'space-around'
  },
  loggoutBtn:{
    width: '80%',
    height: 55,
    backgroundColor: '#1e90ff',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 5,
    elevation: 7,
    alignSelf:'center'
  },
  buttonText:{
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(108, 122, 137, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2
  },  
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
  container: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
