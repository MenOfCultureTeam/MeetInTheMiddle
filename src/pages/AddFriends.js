import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity,Image } from 'react-native';
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

  setUserInfoItem = async (snap,contacts) => {
    var items = []
    let test = snap.val()
    // console.log(test);
    await Promise.all(Object.keys(test).map(async (key) => {
        if(!(key in contacts)){
            let username = await this.readUserIDs(key);
            let data = test[key];
    
            data.UserID=key;
            data.Username=username.val().username;
    
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
      test = await this.setUserInfoItem(snapshot, contacts);
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
      const itemData = `${item.Username.toUpperCase()} ${item.FirstName.toUpperCase()} ${item.LastName.toUpperCase()}`;
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
            <TouchableOpacity onPress={() => this.props.navigation.navigate("AddFriends")}>
            <Image style={styles.returnIcon} source={require('../images/return.png')} />
            </TouchableOpacity>
        </View>


        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ source: { uri: item.Photo } }}
              title={item.Username}
              subtitle={`${item.FirstName} ${item.LastName}`}
              onPress={() => this.props.navigation.navigate('Chatroom', {room:this.generateChatId(item.UserID),
                username:this.state.name,
                recipients:[this.uid,item.UserID]})}
            />
          )}
          keyExtractor={item => item.UserID}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
        
        <View style={styles.rectangle}>
        <View style={styles.MainContainerMain}>
            <View style={styles.MainContainer2}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Map')}>
                <Image
                  source={require('../images/Location.png')}
                  style={{height: 40, width: 40}}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.MainContainer3}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('AddressInput')}>
              <Image
                source={require('../images/user.png')}
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
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
    //Top Bar Container
    topBar:{
        elevation: 9,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        backgroundColor:'white'
    },
  MainContainerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
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





});