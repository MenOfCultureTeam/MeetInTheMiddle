// @flow
import React , {Component} from 'react';

import { GiftedChat } from '../react-native-gifted-chat-0.13.0/GiftedChat'; // 0.3.0


import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';


var uid, room, username;

export default class Chatroom extends Component{

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      name:"",
    }; 
    const { params } = this.props.navigation.state;
    room=params.room;
    username=params.username;
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

  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
    };
    return message;
  };

  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  get user() {
    return {
      name: this.state.name,
      _id: uid,
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
      this.append(message);
    }
  };

  append = message => this.ref.push(message);

  getRef() {
    return firebase.database().ref();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    this.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    // this.ref.off();
  }
}


