// @flow
import React , {Component} from 'react';

import { GiftedChat } from '../react-native-gifted-chat-0.13.0/GiftedChat'; // 0.3.0

// import Fire from '../api/auth-api';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

export default class Chatroom extends Component{

  constructor(props){
    super(props);
    this.state = {
      messages: [],
      name:"",
    }; 
    this.user=firebase.auth().currentUser;
    this.uid=this.user.uid;
    


    // console.log("User:" + this.user.uid);
    this.getRef().child("UserIDs/"+this.uid).once("value",snap=>{
      this.state.name=snap.val()["username"]
    })

    this.chatRef=this.getRef().child("Rooms/room123/Messages")
    this.chatRefData = this.chatRef.orderByChild("order");
  }

  getRef() {
    return firebase.database().ref();

  }


  listenforitems(chatRef) {
    chatRef.on("value", snap => {
      var items = [];
      snap.forEach(child => {
        items.push({
          text: child.val().text,
          createdAt: new Date(child.val().createdAt),
          user: {
            
          }
        });
      });

      this.setState({
        messages: items
      });
    });
  }


  onSend(messages = []) {
    messages.forEach(message => {
      var now = new Date().getTime();
      this.chatRef.push({
        _id: now ,
        text: message.text,
        createdAt: now,
        uid: this.user.uid,
        username:this.state.name,
      });
    });
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend.bind(this)}
        user={{name:this.state.name,
              _id:this.uid}}
      />
    );
  }

  componentDidMount() {
    // Fire.shared.on(message =>
    //   this.setState(previousState => ({
    //     messages: GiftedChat.append(previousState.messages, message),
    //   }))
    // );
    this.listenforitems(this.chatRefData);
  }
  componentWillUnmount() {
    // Fire.shared.off();
    this.chatRefData.off();
  }
}


