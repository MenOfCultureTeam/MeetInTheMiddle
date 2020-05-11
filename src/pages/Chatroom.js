// @flow
import React , {Component} from 'react';

import { GiftedChat } from '../react-native-gifted-chat-0.13.0/GiftedChat'; // 0.3.0

import {View, StyleSheet,} from 'react-native';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';


var uid, room, username;

export default class Chatroom extends Component{

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      name:"",
      loading:false,
      
    }; 
    const { params } = this.props.navigation.state;
    room=params.room;
    username=params.username;
    // console.log("Room:"+ room+", username: "+username);
    uid=firebase.auth().currentUser.uid;

    // console.log("User:" + this.user.uid);
    this.getRef().child("UserIDs/"+uid).once("value",snap=>{
      this.setState({name:snap.val().username});
    })
    this.chatRef=this.getRef().child("Rooms/"+room+"/Messages")
    // this.chatRefData = this.chatRef.orderByChild("order");
  }

  get ref() {
    return this.chatRef;
  }


  readName = async (_id) => {

     let promise = this.getRef().child("UserIDs/"+_id).once("value")
     return await promise;

  }
  readAvatar = async (_id) => {
    let promise = this.getRef().child("Users/"+_id).once("value")
    return await promise;
 }

  parse = async snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);

    let newname = await this.readName(user._id);
    let newavatar = await this.readAvatar(user._id);
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

  append = message => this.ref.push(message);

  getRef() {
    return firebase.database().ref();
  }

  render() {

    return(
      <GiftedChat
      messages={this.state.messages}
      onSend={this.send}
      user={this.user}
      renderUsernameOnMessage
      showAvatarForEveryMessage={false}
      alwaysShowSend
      
      
    />
)

  }

  componentDidMount() {
    // this.isMounted=false;


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

