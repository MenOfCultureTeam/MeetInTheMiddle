import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';

export class FlatListDemo extends Component {
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

  readDatabase = async () => {
    let promise = this.getRef().child("Users/").once("value")
    return await promise;
  }

  readUserIDs = async (userid) => {
    let promise = this.getRef().child("UserIDs/"+userid).once("value")
    return await promise;
  }

  setUserInfoItem = async (snap, contacts) => {
    var items = []
    let data =  snap.docs;
    await Promise.all(await data.map(async (data) => {
      if(data.key in contacts){
        let username = await this.readUserIDs(data.key);
        let test = data.val();
        test.UserID=data.key;
        test.Username=username.val().username;
        console.log(test);
        items.push(test);//
      }
    }))
    
    return items
  }


   makeRemoteRequest = async () => {

    let userids = await this.readUsers(this.uid);
    let contacts = userids.val().Contacts; //list of userids of your contacts

    var test=[]
    const snapshot = await this.readDatabase();
    test = await this.setUserInfoItem(snapshot, contacts);
    console.log(test);


    // this.setState({data:})
    // let userinfo = await this.readUserInfo(userids);
    // let items = await this.setUserInfoItem(userinfo);
   
    // const data={

    // }
    



    const url = `https://randomuser.me/api/?&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
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
      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
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
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem
              leftAvatar={{ source: { uri: item.picture.thumbnail } }}
              title={`${item.name.first} ${item.name.last}`}
              subtitle={item.email}
            />
          )}
          keyExtractor={item => item.email}
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