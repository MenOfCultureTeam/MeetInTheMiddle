import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

export default class Map extends Component {
  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
        <View style={styles.rectangle}></View>

        <View style={styles.MainContainerMain}>
          <View style={styles.MainContainer}>
            <Image
              source={require('../images/Message.png')}
              style={{
                width: 40,
                height: 40,
                borderColor: 'black',
                borderRadius: 150 / 2,
              }}
            />
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
            <Image
              source={require('../images/Location.png')}
              style={{
                width: 40,
                height: 40,
                borderColor: 'black',
                borderRadius: 150 / 2,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainContainerMain: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'space-between',
    marginTop: 610,
  },

  MainContainer2: {
    height: 40,
    width: 40,
    backgroundColor: 'white',
    borderColor: 'white',
  },

  container: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  rectangle: {
    justifyContent: 'center',
    flex: 2,
    height: 60,
    width: 450,
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    top: 600,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
  },
});
