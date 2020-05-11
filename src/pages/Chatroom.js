// @flow
import React , {Component} from 'react';

import { GiftedChat } from '../react-native-gifted-chat-0.13.0/GiftedChat'; // 0.3.0
import {ActivityIndicator, FlatList,Text,View,Image,StyleSheet, TouchableOpacity, Dimensions,  TextInput, Button, ImageBackground} from 'react-native';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';


var uid, room, username, recipientsIDs;

export default class Chatroom extends Component{

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      name:"",
      loading:false,
      chatroomMade:false,
      recipients:{}
    }; 
    const { params } = this.props.navigation.state;
    room=params.room;
    username=params.username;
    recipientsIDs=params.recipients;
    // console.log("Room:"+ room+", username: "+username);
    uid=firebase.auth().currentUser.uid;

    // console.log("User:" + this.user.uid);
    this.getRef().child("UserIDs/"+uid).once("value",snap=>{
      this.setState({name:snap.val().username});
    })

    

    this.chatRef=this.getRef().child("Rooms/"+room+"/Messages")
    this.chatRefData = this.chatRef.orderByChild("order");
  }

  get ref() {
    return this.chatRef;
  }

  checkIfChatroomMade = async (room) => {
    let promise = this.getRef().child("Rooms/"+room).once("value")
    return await promise;
 }

  readUserIDs = async (_id) => {
     let promise = this.getRef().child("UserIDs/"+_id).once("value")
     return await promise;
  }
  readDatabase = async (_id) => {
    let promise = this.getRef().child("Users/"+_id).once("value")
    return await promise;
 }
 readUserChatrooms = async (_id) => {
  let promise = this.getRef().child("Users/"+_id+"/Rooms").once("value")
  return await promise;
}



  setRecipients = async () => {
    var recep = {}
    this.setState({loading: true});
    await Promise.all(recipientsIDs.map(async data => {
                let name = await this.readUserIDs(data);
                recep[name.val().username]=data;
            }));
    this.setState({recipients:recep,
      loading: false});
  }

  parse = async snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    let newname = await this.readUserIDs(user._id);
    let newavatar = await this.readDatabase(user._id);
    let avatarlink = newavatar.val().Photo;
    const message = {
      _id:_id,
      timestamp,
      text,
      user:{_id:user._id,name:newname.val().username,avatar:avatarlink},
    };  
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => { this.parse(snapshot).then(callback) });

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  get user() {
    return {
      _id: uid,
      name:null
    };
  }


  // send the message to the Backend
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
      };
      // console.log(user._id)
      this.append(message);

    }
  };
  createChatroomInUsers = async (recipients) => {

    let chatroomname=""

    recipients.forEach(id => {
      chatroomname+=this.state.recipients[id]+" | ";
      this.getRef().child("Users/"+id+"/Rooms/"+room).set({ associated:true});
    });
    this.getRef().child("Rooms/"+room).set({ "ChatroomName":chatroomname});

  }
  append = message => {
    this.ref.push(message);
  }

  getRef() {
    return firebase.database().ref();
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return(
    <View style={styles.container}>
      <View style ={styles.topBar}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('friendList')}>
          <Image style={styles.returnIcon} source={require('../images/return.png')} />
          </TouchableOpacity>
      </View>
    <View style={styles.editContent}>

    <View style={styles.usersContainer}>
      <Text style={styles.UsersInChat}>Users: </Text>

      {Object.keys(this.state.recipients).map((item)=>( <Text style={styles.UsersInChat}> {item} </Text> )) }
    </View>
      
      {/* https://react-native-elements.github.io/react-native-elements/docs/listitem.html */}
        <GiftedChat
        messages={this.state.messages}
        onSend={this.send}
        user={this.user}
        renderUsernameOnMessage
        showAvatarForEveryMessage={false}
        alwaysShowSend

      />
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

)

  }

  componentDidMount() {
    // this.isMounted=false;
    if(!this.checkIfChatroomMade(room).exists){
      this.createChatroomInUsers(recipientsIDs);
    }

    this.setRecipients();

    this.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    // this.isMounted=false;
    // this.ref.off();
  }
}

const styles = StyleSheet.create({
  //Main Container
  container: {
      flex: 1,
      justifyContent:'space-between',
      
  },
  usersContainer: {
    alignContent: "flex-start",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10

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
  // Content Container
  editContent:{
      flex:2,
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
  },
  UsersInChat: {
    color: 'rgba(0, 0,0,1)',
    fontSize: 18,
    fontWeight: "bold"
  },
});
