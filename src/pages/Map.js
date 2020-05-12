import React, {Component} from 'react';
import {
  Button,
  Dimensions,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  Alert,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import '@mapbox/polyline'
import firebase from '@react-native-firebase/app';
let id = 0;

function calDistance(point1, point2)
{
  var R = 6371e3; // metres
  var lat1 = point1[0];
  var lat2 = point2.lat;
  var lng1 = point1[1];
  var lng2 = point2.lng;
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

async function testMap(middleLat, middleLng) {
  if (typeof this.props.navigation.state.params.Addresses != 'undefined')
  {
    var addresses = this.props.navigation.state.params.Addresses;
    var length = Object.keys(addresses).length
    if(length < 3)
    {
      var Address1 = "place_id:"+addresses[0]
      var Address2 = "place_id:"+addresses[1]
      if(Address1 == 'place_id:current')
      {
        Address1 = middleLat + ',' + middleLng
      }
      if(Address2 == 'place_id:current')
      {
        Address2 = middleLat + ',' + middleLng
      }
      var url = 'https://maps.googleapis.com/maps/api/directions/json?origin='
      + Address1
      + '&destination=' 
      + Address2 
      if(this.props.navigation.state.params.Transport=='local') url += '&avoid=highways'
      url += '&key=AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA'
      try {
        const response = await fetch(url);
        const responseJson = await response.json();
        var i = 0;
        var steps = responseJson.routes[0].legs[0].steps;
        var totalDistance = responseJson.routes[0].legs[0].distance.value;
        var halfDistance = totalDistance / 2;
        var curDistance = 0;
        while (curDistance <= halfDistance) {
          curDistance += steps[i].distance.value;
          i++;
        }
        var polyline = require('@mapbox/polyline');
        var curPath = polyline.decode(steps[i - 1]['polyline']['points']);
        var curLatLng = steps[i].end_location;
        var testDistance = curDistance;
        i = curPath.length - 1;
        while (testDistance >= halfDistance) {
          testDistance = curDistance - Math.abs(calDistance(curPath[i], curLatLng));
          i--;
        }
        var initAddress = responseJson.routes[0].legs[0];
        var address1 = initAddress.start_location;
        var address2 = initAddress.end_location;
        var midLat = curPath[i][0];
        var midLng = curPath[i][1];
        addMarker.call(this, midLat, midLng);
        addMarker.call(this, address1.lat, address1.lng);
        addMarker.call(this, address2.lat, address2.lng);
        this.setState({
        middleLat: midLat,
          middleLng: midLng
        });
        searchNearby.call(this, midLat, midLng);
      }
      catch (error) {
        console.error(error);
      }
    }
    else
    {
      var uri = "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA&place_id="
      var totalX = 0, totalY = 0, midX, midY
      for(var index in addresses)
      {
        var place_id = addresses[index]
        if(place_id == "current")
        {
          addMarker.call(this, middleLat, middleLng);
          totalX += middleLat
          totalY += middleLng
        }
        else
        {
          const responseJson = await fetch(uri+place_id).then((response) => response.json())
          var loc = responseJson["result"]["geometry"]["location"]
          addMarker.call(this, loc["lat"], loc["lng"]);
          totalX += loc["lat"]
          totalY += loc["lng"]
        }
      }
      midX = totalX/length
      midY = totalY/length
      addMarker.call(this, midX, midY);
      this.setState({
        middleLat: midX,
        middleLng: midY
        });
        searchNearby.call(this, midX, midY);
    }
  }
}
function searchNearby(lat, lng)
{
  if (typeof this.props.navigation.state.params.Keyword != 'undefined')
  {
    var keyword = this.props.navigation.state.params.Keyword.replace(" ", "+")
    var radius = this.props.navigation.state.params.Range;
    if(keyword != '')
    {
      var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+
      lat + ',' + lng + '&radius=' + radius + '&type=restaurant&keyword='+keyword+'&key=AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA'
      return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => 
      {
        var i = 0
        var result = responseJson['results']
        while(i < 5 && i < result.length)
        {
          var location = result[i]
          var locationLat = location["geometry"]["location"]["lat"]
          var locationLng = location["geometry"]["location"]["lng"]
          var locationName = location["name"]
          var locationRating = location["rating"]
          var locationAddress = location["vicinity"]
          var locationPrice = location["price_level"]
          addInterestMarker.call(this, locationLat, locationLng, locationName, locationRating, locationAddress, locationPrice)
          i++
        }
      })
      .catch((error) => {
        console.error(error)});
    }
  }
}
function addMarker(lat, lng)
{
  this.setState(
    {
      markers: [
        ...this.state.markers,
        {
          coordinate: {latitude: lat,
            longitude: lng},
          key: id++,
        },
      ],
    })
}

function addInterestMarker(lat, lng, name, rating, address, price)
{
  var color = '';
  if(rating <= 2)
  {
    color = 'darkred'
  }
  else if(rating <= 4)
  {
    color = 'goldenrod'
  }
  else
  {
    color = 'darkgreen'
  }
  var greenPrice = '$'.repeat(price)
  var leftOverPrice = '$'.repeat(4-price)
  this.setState(
    {
      interestMarkers: [
        ...this.state.interestMarkers,
        {
          coordinate: {latitude: lat,
            longitude: lng},
          key: id++,
          title: name,
          address: address,
          rating: rating,
          color: color,
          greenPrice: greenPrice,
          leftOverPrice: leftOverPrice,
        },
      ],
    })
}
export default class Map extends Component {
  state = {
    markers: [],
    interestMarkers: [],
    middleLat: 0,
    middleLng: 0,
    currentLat: 0,
    currentLng: 0,
  }
  hasLocationPermission = async () => {
    if (Platform.OS === 'ios' ||
        (Platform.OS === 'android' && Platform.Version < 23)) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show('Location permission denied by user.', ToastAndroid.LONG);
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show('Location permission revoked by user.', ToastAndroid.LONG);
    }

    return false;
  }

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();

    if (!hasLocationPermission)
    {
      if(typeof this.props.navigation.state.params !== 'undefined')
      {
        
        testMap.call(this, 0, 0);
      }
      return;
    }

    Geolocation.getCurrentPosition(
        (position) => {
          this.setState({middleLat: position.coords.latitude, middleLng: position.coords.longitude,
                        currentLat: position.coords.latitude, currentLng: position.coords.longitude})
          if(typeof this.props.navigation.state.params !== 'undefined')
          {
            testMap.call(this, position.coords.latitude, position.coords.longitude);
          }
        },
        (error) => {
          console.log(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000, distanceFilter: 50, forceRequestLocation: true }
      );
  }
  constructor(props)
  {
    super(props);
    this.getLocation();
    
  }
  
  render() {

    const editProfile = async () =>
    {
        if (firebase.auth().currentUser==null) {
          Alert.alert(
            "Currently Not Signed in",
            "Login to use this feature",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Login", onPress: () => this.props.navigation.navigate('Login') }
            ],
            { cancelable: false }
          );
        }
        else{
          this.props.navigation.navigate('Edit_Profile')
        }
    };
    const chatRoom = async () =>
    {
        if (firebase.auth().currentUser==null) {
          Alert.alert(
            "Currently Not Signed in",
            "Login to use this feature",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Login", onPress: () => this.props.navigation.navigate('login') }
            ],
            { cancelable: false }
          );
        }
        else{
          ////FlatListDemo
          this.props.navigation.navigate('FlatListDemo')
        }
    };

    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: this.state.middleLat,
            longitude: this.state.middleLng,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }}
          region={{
            latitude: this.state.middleLat,
            longitude: this.state.middleLng,
            latitudeDelta: .05,
            longitudeDelta: .05,
          }}>
            {this.state.markers.map(marker => (
            <Marker
              key={marker.key}
              coordinate={marker.coordinate}
            />))}
            {this.state.interestMarkers.map(interestMarkers => (
            <Marker
              key={interestMarkers.key}
              coordinate={interestMarkers.coordinate}
              pinColor={interestMarkers.color}>
              <Callout>
                <View>
                  <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>{interestMarkers.title}</Text>
                  <Text style={{textAlign: 'center', fontSize: 14}}>{interestMarkers.address}</Text>
                  <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={{color: interestMarkers.color, fontWeight: 'bold', fontSize: 22}}>{interestMarkers.rating}★</Text>
                    <Text style={{color: 'green', fontWeight: 'bold', fontSize: 22}}>{interestMarkers.greenPrice}
                      <Text style={{color: 'grey'}}>{interestMarkers.leftOverPrice}</Text>
                    </Text>
                  </View>
                  
                </View>
              </Callout>
              </Marker>
            ))}
          </MapView>
            
        <View style={styles.rectangle}>
          <View style={styles.MainContainerMain}>
            <View style={styles.MainContainer}>
              <TouchableOpacity onPress={chatRoom}>
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
                onPress={editProfile}>
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
  MainContainerMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
  },

  container: {
    // ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    flex: 3,
    height: 60,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    bottom:0,
    borderColor: 'rgba(255,255,255,0.2)',
    borderWidth: 1,
  },
});
