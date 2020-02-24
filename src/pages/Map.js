import React, {Component} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import '@mapbox/polyline'

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

function testMap() {
  if (typeof this.props.navigation.state.params.Address1 != 'undefined')
  {
    var url = 'https://maps.googleapis.com/maps/api/directions/json?origin='+
    this.props.navigation.state.params.Address1.replace(" ", "+") +
    '&destination=' +
    this.props.navigation.state.params.Address2.replace(" ", "+") +
    '&key=AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA'
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
        var curLatLng = steps[i].end_location;
        var testDistance = curDistance;
        i = curPath.length - 1;
        while(testDistance >= halfDistance)
        {
          testDistance = curDistance - Math.abs(calDistance(curPath[i],curLatLng));
          i--;
        }
        var initAddress = responseJson.routes[0].legs[0]
        var address1 = initAddress.start_location
        var address2 = initAddress.end_location
        var midLat = curPath[i][0]
        var midLng = curPath[i][1]
        addMarker.call(this, midLat, midLng)
        addMarker.call(this, address1.lat,address1.lng)
        addMarker.call(this, address2.lat,address2.lng)
        
        this.setState({middleLat: midLat,
          middleLng: midLng})
        searchNearby.call(this, midLat, midLng)
      })
      .catch((error) => {
      console.error(error);
    });
  }
  
}

function searchNearby(lat, lng)
{
  if (typeof this.props.navigation.state.params.Keyword != 'undefined')
  {
    var keyword = this.props.navigation.state.params.Keyword
    if(keyword != '')
    {
      var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+
      lat + ',' + lng + '&radius=1500&type=restaurant&keyword='+keyword+'&key=AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA'
      console.log(url)
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
  constructor(props)
  {
    super(props);
    this.state = {
      markers: [],
      interestMarkers: [],
      middleLat: 0,
      middleLng: 0
    }
    if(typeof this.props.navigation.state.params !== 'undefined')
    {
      testMap.call(this);
    }
  }
  
  render() {
    console.log(this.state.interestMarkers)
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
