import React, { Component } from 'react';
import { View,Dimensions, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

export class AddFriends extends Component {
  constructor(props) {

    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };
    this.user=firebase.auth().currentUser;
    this.uid=this.user.uid;
    
    this.arrayholder = [];
  }
  getRef() {
    return firebase.database().ref();
  }
  componentDidMount() {
    this.makeRemoteRequest();
  }

  readUsers = async (_id) => {
    let promise = this.getRef().child("Users/"+_id).once("value")
    return await promise;
  }
  readUserContacts = async (_id) => {
    let promise = this.getRef().child("Users/"+_id+"/Contacts").once("value")
    return await promise;
  }
  readDatabase = async () => {
    let promise = this.getRef().child("Users/").once("value")
    return await promise;
  }

  readUserIDs = async (userid) => {
    let promise = this.getRef().child("UserIDs/"+userid).once("value")
    return await promise;
  }

  readAllUserIDs = async () => {
    let promise = this.getRef().child("UserIDs/").once("value")
    return await promise;
  }
  setAllUserInfoItemIgnoreContacts = async (snap,contacts) => {
    var items = []
    let users = snap.val()
    await Promise.all(Object.keys(users).map(async (key) => {
        if(!(key in contacts) && key!=this.uid){
            let username = await this.readUserIDs(key);
            let data = users[key];
            data.UserID=key;
            data.Username=username.val().Username;
            items.push(data);
        }
    }))
    return items
  }
  setAllUserInfoItem = async (snap) => {
    var items = []
    let users = snap.val()
    await Promise.all(Object.keys(users).map(async (key) => {
          if(key != this.uid){
            let username = await this.readUserIDs(key);
            let data = users[key];
            console.log(data);
            data.UserID=key;
            data.Username=username.val().Username;
            items.push(data);
          }

    }))
    return items
  }

   makeRemoteRequest = async () => {
    let userids = await this.readUsers(this.uid);

    let contacts = userids.val().Contacts; //list of userids of your contacts
    var test=[]
    if(contacts!=null){
      this.setState({ loading: true });
      const snapshot = await this.readDatabase();
      test = await this.setAllUserInfoItemIgnoreContacts(snapshot, contacts);
      // console.log(test);
      this.setState({data:test,
                    error: null,
                    loading: false,})
      this.arrayholder = test;  
    }
    else{
      this.setState({ loading: true });
      const snapshot = await this.readDatabase();
      test = await this.setAllUserInfoItem(snapshot);
      // console.log(test);
      this.setState({data:test,
                    error: null,
                    loading: false,})
      this.arrayholder = test;  
    }
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.Username.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  generateChatId(frienduid) {
    if (this.uid > frienduid) return `${this.uid}-${frienduid}`;
    else return `${frienduid}-${this.uid}`;
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (



      <View style={{ flex: 1 }}>

          

        <View style ={styles.topBar}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("FlatListDemo")}>
            <Image style={styles.returnIcon} source={require('../images/return.png')} />
            </TouchableOpacity>
        </View>


        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ source: { uri: item.Photo } }}
              title={item.Username}
              subtitle={`${item.Name}`}
              onPress={() => this.props.navigation.navigate('Chatroom', {room:this.generateChatId(item.UserID),
                username:this.state.name,
                recipients:[this.uid,item.UserID], friend:item.Name, frienduid:item.UserID})}
            />
          )}
          keyExtractor={item => item.UserID}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
        
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
