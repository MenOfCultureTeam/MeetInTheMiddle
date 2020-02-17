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
import '@mapbox/polyline'
function calDistance(point1, point2)
{
  var R = 6371e3; // metres
  var lat1 = point1[0];
  var lat2 = point2[0];
  var lng1 = point1[1];
  var lng2 = point2[1];
  var φ1 = toRadians(lat1);
  var φ2 = toRadians(lat2);
  var Δφ = toRadians(lat2-lat1);
  var Δλ = toRadians(lng2-lng1);

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;

  return d;
}
function toRadians(degrees)
{
  var pi = Math.PI;
  return degrees * (pi/180);
}

function testMap() {
  if (typeof this.props.navigation.state.params !== 'undefined')
  {
    var url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+
    this.props.navigation.state.params.Address1.replace(" ", "+") +
    '&destination=' +
    this.props.navigation.state.params.Address2.replace(" ", "+") +
    '&key=AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA'
    console.log(url);
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        var i = 0;
        var steps = responseJson.routes[0].legs[0].steps;
        var totalDistance = responseJson.routes[0].legs[0].distance.value;
        var halfDistance = totalDistance/2;
        var curDistance = 0;
        while(curDistance <= halfDistance){
          curDistance += steps[i].distance.value;
          i++;
        }
        var polyline = require('@mapbox/polyline');
        var curPath = polyline.decode(steps[i-1]['polyline']['points']);
        var curLatLng = steps[i].start_location;
        var testDistance = curDistance;
        i = curPath.length - 1;
      
        while(testDistance >= halfDistance)
        {
          testDistance = curDistance - Math.abs(calDistance(curPath[i],curLatLng));
          i--;
        }
        
        var Middle = curPath[i];
        console.log("MIDDLE: " + Middle[0] + ", " + Middle[1]);
        return responseJson;
      })
      .catch((error) => {
      console.error(error);
    });
  }
  
}
export default class Map extends Component {
  render() {
    testMap.call(this);
    console.log('hii');
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
