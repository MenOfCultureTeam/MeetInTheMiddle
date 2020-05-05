
import React , {Component} from 'react';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {FlatList,Text,View} from 'react-native';
import { ListItem } from 'react-native-elements';
export default class ChatMenu extends Component{

  constructor(props){
    super(props);
    this.state = {
      chatrooms:[],
      name:"",
      isLoading: true,
    };
    this.user=firebase.auth().currentUser;
    this.uid=this.user.uid;


    this.listenforitems = this.listenforitems.bind(this);
    
  }


  getRef() {
    return firebase.database().ref();
  }

  listenforitems(chatroomsref){
    chatroomsref.on("value", snap => {
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
    this.getRef().child("UserIDs/"+this.uid).once("value",snap   =>{
      this.setState({name:snap.val().username});
      this.chatroomsref=this.getRef().child("Users/"+this.state.name+"/Rooms")
      this.listenforitems(this.chatroomsref);
    })

  }
  render() {
    return (
      <View>
        <Text>Chatrooms:</Text>
        {/* https://react-native-elements.github.io/react-native-elements/docs/listitem.html */}
        <FlatList 
                keyExtractor={this.keyExtractor}
                data={this.state.chatrooms}
                renderItem={({ item }) => (
                    <ListItem
                      title={`${item}`}
                      bottomDivider
                      chevron 
                      onPress={() => this.props.navigation.navigate('Chatroom', {room:item,
                                                                                 username:this.state.name})}/>
                              )}
                      />
      </View>
    )
  }

}


