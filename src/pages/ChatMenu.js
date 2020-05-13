import PropTypes from 'prop-types'
import React , {Component} from 'react';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {FlatList,Text,View,Image,StyleSheet, TouchableOpacity, Dimensions,  TextInput, Button, ImageBackground} from 'react-native';
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
  getUsers(chatroomid){
    this.getRef().child("Users/").orderByChild()
  }
  //TODO: Make object with data of chatrooms that contains usernames, userids
  //look back at flatlistdemo and view how we changed to chatroom page by sending parameters of object data
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

    return (
      <View style={styles.container}>
            <View style ={styles.topBar}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('FlatListDemo')}>
                <Image style={styles.returnIcon} source={require('../images/return.png')} />
                </TouchableOpacity>
            </View>
        <View style={styles.editContent}>
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
                      onPress={() => this.props.navigation.navigate('Chatroom', {room:this.generateChatId(item.UserID),
                                                                                username:this.state.name,
                                                                                recipients:[this.uid,item.UserID],friend:item.UserID})}/>
                              )}
                      />
        </View>

        <View style={styles.rectangle}>
            <View style={styles.MainContainerMain}>
                <View style={styles.MainContainer}>
                    <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('FlatListDemo')}>
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
  }
});
