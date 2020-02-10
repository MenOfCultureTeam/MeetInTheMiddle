import React, {Component} from 'react';
import {StyleSheet, Platform, Image, Text, View, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
export default class Main extends Component {
  state = { currentUser: null }

  componentDidMount() {
    const { currentUser } = auth()

    this.setState({ currentUser })
  }

  render() {
    const { currentUser } = this.state

    return (
      <View style={styles.container}>
        <Text>
          Hi {currentUser && currentUser.email}!
        </Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Map')}>
            <Text style={styles.buttonText}>Go to Map</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    width: 300,
    height: 55,
    backgroundColor: '#FF6201',
    // borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
})