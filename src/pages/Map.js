import React, {Component} from 'react';
import {
  Button,
  Dimensions,
  View,
  Animated,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout, ProviderPropType, Animated as AnimatedMap, AnimatedRegion, } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import '@mapbox/polyline'

import { ScrollView } from 'react-native-gesture-handler';

let id = 0;
let index = 0;
const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;
const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const ITEM_PREVIEW_HEIGHT = 150;
const SCALE_END = screen.width / ITEM_WIDTH;
const BREAKPOINT1 = 246;
const BREAKPOINT2 = 350;
const ONE = new Animated.Value(1);

function getMarkerState(panX, i) {
  const xLeft = -SNAP_WIDTH * i + SNAP_WIDTH / 2;
  const xRight = -SNAP_WIDTH * i - SNAP_WIDTH / 2;
  const xPos = -SNAP_WIDTH * i;

  const isIndex = panX.interpolate({
    inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
    outputRange: [0, 1, 1, 0],
    extrapolate: 'clamp',
  });

  const isNotIndex = panX.interpolate({
    inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
    outputRange: [1, 0, 0, 1],
    extrapolate: 'clamp',
  });

  const center = panX.interpolate({
    inputRange: [xPos - 10, xPos, xPos + 10],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  const selected = panX.interpolate({
    inputRange: [xRight, xPos, xLeft],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  });

  const translateX = panX;

  const anim = Animated.multiply(
    isIndex,
  );

  const scale = Animated.add(
    ONE,
    Animated.multiply(
      isIndex,
    )
  );

  const markerScale = selected.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return {
    translateX,
    scale,
    anim,
    center,
    selected,
    markerScale,
  };
}

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
        console.log(responseJson)
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
  id++
  this.setState(
    {
      markers: [
        ...this.state.markers,
        {
          coordinate: {latitude: lat,
            longitude: lng},
          key: id,
        },
      ],
    })
}

function addInterestMarker(lat, lng, name, rating, address, price)
{
  var color = '';
  var panX = new Animated.Value(0)
  var animations = this.state.animations
  
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
  animations.push(getMarkerState(panX, index))
  console.log("Animations: " + this.state.animations)
  this.setState(
    {
      animations: animations,
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
    
  index++
}
export default class Map extends Component {
  constructor(props) {
    super(props);

    const panX = new Animated.Value(0);

    const scrollX = panX.interpolate({
      inputRange: [-1, 1],
      outputRange: [1, -1],
    });

    this.state = {
      panX,
      animations: [],
      index: 0,
      canMoveHorizontal: true,
      scrollX,
      markers: [],
      interestMarkers: [],
      middleLat: 0,
      middleLng: 0,
      currentLat: 0,
      currentLng: 0,
    }
    
    this.getLocation();
  }
  componentDidMount() {
    const { panX } = this.state;

    panX.addListener(this.onPanXChange);
  }

  onPanXChange = ({ value }) => {
    const { index } = this.state;
    const newIndex = Math.floor((-1 * value + SNAP_WIDTH / 2) / SNAP_WIDTH);
    if (index !== newIndex) {
      this.setState({ index: newIndex });
    }
  };
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

  handleScroll = (event) => { 
    var index = Math.floor((event.nativeEvent.contentOffset.x + SNAP_WIDTH / 2) / SNAP_WIDTH)
    var cords = this.state.interestMarkers[index]["coordinate"]
    var lat = cords["latitude"]
    var lng = cords["longitude"]
    this.refs._mapView.animateToRegion({latitude: lat, longitude: lng, latitudeDelta: .05, longitudeDelta: .05}, 500)
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
  
  render() {
    
    return (
      <View style={styles.container}>
        <MapView
        ref='_mapView'
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
          {this.state.interestMarkers.map((interestMarkers,i) => (
          <Marker
            key={interestMarkers.key}
            coordinate={interestMarkers.coordinate}
            pinColor={interestMarkers.color}
            onPress={() => { this.refs._scrollView.scrollTo({x: i * ITEM_WIDTH + ITEM_SPACING / 2 + ITEM_PREVIEW, y:0, animated: true})}}>
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
        <ScrollView horizontal= {true} decelerationRate={0} snapToInterval={ITEM_WIDTH + ITEM_SPACING} //your element width
    snapToAlignment={"center"} style = {styles.itemContainer} ref='_scrollView' onMomentumScrollEnd = {this.handleScroll}>
          {this.state.interestMarkers.map(marker => (
            <View style={styles.item} key={marker.key}>
              <Text>{marker.title}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.rectangle}>
          <View style={styles.MainContainerMain}>
            <View style={styles.MainContainer}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('friendList')}>
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
  item: {
    width: ITEM_WIDTH,
    height: screen.height + 2 * ITEM_PREVIEW_HEIGHT,
    backgroundColor: 'gray',
    marginHorizontal: ITEM_SPACING / 2,
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#000',
  },
  itemContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    paddingHorizontal: ITEM_SPACING / 2 + ITEM_PREVIEW,
    position: 'absolute',
    top: screen.height - ITEM_PREVIEW_HEIGHT - 64,
    //paddingTop: screen.height - ITEM_PREVIEW_HEIGHT - 64,
    // paddingTop: !ANDROID ? 0 : screen.height - ITEM_PREVIEW_HEIGHT - 64,
  },
});
