
import React , {Component} from 'react';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {FlatList} from 'react-native';
import { ListItem } from 'react-native-elements';
export default class ChatMenu extends Component{

  constructor(props){
    super(props);
    this.state = {
      chatrooms:[],
      name:"",
    };
    this.user=firebase.auth().currentUser;
    this.uid=this.user.uid;

    this.getRef().child("UserIDs/"+this.uid).once("value",snap   =>{
      this.setState({name:snap.val().username});
    })

    this.chatroomsref=this.getRef().child("Users/Tooslick252/Rooms")

    this.listenforitems = this.listenforitems.bind(this);
  }



  getRef() {
    return firebase.database().ref();
  }

  listenforitems(chatroomsref){
    chatroomsref.once("value", snap => {
        var items = [];
        snap.forEach(child => {
            items.push(child.key);
        });
        this.setState({
            chatrooms:items
        });
    });
  }
  keyExtractor = (item, index) => index.toString()
  componentDidMount() {
    this.listenforitems(this.chatroomsref);
  }
  render() {
    return (
        <FlatList 
                keyExtractor={this.keyExtractor}
                data={this.state.chatrooms}
                renderItem={({ item }) => (
                    <ListItem
                      title={`${item}`}

                    />
                )}
                />

    );
  }

}


