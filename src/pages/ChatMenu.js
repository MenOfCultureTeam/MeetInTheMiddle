import PropTypes from 'prop-types'
import React , {Component} from 'react';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {FlatList,Text,View,Image,StyleSheet, TouchableOpacity} from 'react-native';
import { ListItem } from 'react-native-elements';





//Chatmenu of chatrooms/messages of friends
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
      this.listenforitems(this.getRef().child("Users/"+this.uid+"/Rooms"));
      console.log(this.uid);
    })

  }
  render() {
    const chatRoom = async (room,friendname) =>
    {
      //TODO: must check if friend exists before updating 
      this.getRef().child("Users/"+friendname+"/Rooms/"+room).update({associated:"true"})
    };

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
        <View style={styles.MainContainer}>
          <TouchableOpacity
            onPress={() => chatRoom("room123","Valiant")}>
            <Image
              source={require('../images/Message.png')}
              style={{
                width: 40,
                height: 40,
                borderColor: 'black',
                borderRadius: 150 / 2,
              }} />
            </TouchableOpacity>
        </View>
      </View>

    );
  }

}


const styles = StyleSheet.create({

  MainContainer:{
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderColor: 'white',
    marginHorizontal:'10%'  
    
  }
})