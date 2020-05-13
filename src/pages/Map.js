import React, {Component} from 'react';
import {
  Button,
  Dimensions,
  View,
  Linking,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
  findNodeHandle,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout, ProviderPropType, Animated as AnimatedMap, AnimatedRegion, } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import '@mapbox/polyline'
import ImageViewer from 'react-native-image-zoom-viewer';

import { ScrollView } from 'react-native-gesture-handler';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
let id = 0;
let index = 0;
const screen = Dimensions.get('window');
const API_KEY = 'AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA';

const ITEM_SPACING = 10;
const ITEM_PREVIEW = 10;
const ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;
const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
const ITEM_PREVIEW_HEIGHT = 150;


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

async function searchNearby(lat, lng)
{
  if (typeof this.props.navigation.state.params.Keyword != 'undefined')
  {
    var keyword = this.props.navigation.state.params.Keyword.replace(" ", "+")
    var radius = this.props.navigation.state.params.Range;
    if(keyword != '')
    {
      var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+
      lat + ',' + lng + '&radius=' + radius + '&type=restaurant&keyword='+keyword+'&key=AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA'
      const responseJson = await fetch(url).then((response) => response.json())
      var i = 0
      var result = responseJson['results']
      while(i < 5 && i < result.length)
      {
        var location = result[i]
        var place_id = location["place_id"]
        var detailUrl = "https://maps.googleapis.com/maps/api/place/details/json?place_id="+place_id+"&fields=photo,review&key="+API_KEY
        const detaileUrl = await fetch(detailUrl).then((response) => response.json())
        var pictures = []
        var reviews = []
        var pictureArray = detaileUrl["result"]["photos"]
        const reviewDetail = detaileUrl["result"]["reviews"]
        reviews = reviewDetail.map((review) => ({name: review["author_name"], rating: review["rating"], text: review["text"]}))
        if(typeof pictureArray != "undefined")
        {
          pictures = detaileUrl["result"]["photos"].map((pic) => (
            "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=400&photoreference=" + pic["photo_reference"] + 
            "&key=" + API_KEY))
        }
        var locationLat = location["geometry"]["location"]["lat"]
        var locationLng = location["geometry"]["location"]["lng"]
        var locationName = location["name"]
        var locationRating = location["rating"]
        var locationAddress = location["vicinity"]
        var locationPrice = location["price_level"]
        addInterestMarker.call(this, locationLat, locationLng, locationName, locationRating, locationAddress, locationPrice, pictures, reviews)
        i++
      }
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

function addInterestMarker(lat, lng, name, rating, address, price, pictures, reviews)
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
  var pictureURL = []
  for(var i = 0; i < pictures.length; i++)
  {
    pictureURL.push({url: pictures[i]})
  }
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
          pictures: pictures,
          pictureURL: pictureURL,
          reviews: reviews,
        },
      ],
    })
    
  index++
}
var image = [{url:"https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&maxheight=500&photoreference=CmRaAAAAJB-k6-TiDuzn1bsFPFSEwuwhJUp575ilLtrJbuJxFr9-rqYs335hqhG9QVZ_Ydt06EgXlw-bjvVpFHgEYaVrbDk6gEmxpGLTaQBt8X7EF1YrfXxeIwnvkRYw1yQ9kXWNEhApI7EbaaalrCjZC7ni-nF9GhQZvNjNbbjNlNXzA7DyRMlL-KtUeQ&key=AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA"}, {url:"https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&maxheight=500&photoreference=CmRaAAAAzFoTCjGumAred5Ucz_vVPa6Qo4TiplBs-F70g0lGLwOf3PFd1wyDEF2oVscY4uQpdt1RfWQcxHkEXT_5C4qY3DVQA3GGwqXQZK58tPbAZpkdqlLe4GZqyHosBemnIM3eEhDk8yrZ4X-6--3qI6Am-nRoGhQNV-F965cjoy6WRnXR7sYehU8biw&key=AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA"}, {url:"https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&maxheight=500&photoreference=CmRaAAAAaxLF8RzXsVnI5Oc195FL29_7WTAYHkAKTdzOxi2O0qt5TkBKZU6I29pvfbRyiSBJyMEOp8hfIxWw2TpeW8t0emZnPn8ycgHRZeKCbMBMf03vh5MeLmmg7JdrDoGYyCF8EhBnENbfNVshzzCBEFEEQB6oGhQa0Era6ld9DJIVURyb-Y1AEUA3Ww&key=AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA"}]
export default class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      markers: [],
      interestMarkers: [],
      middleLat: 0,
      middleLng: 0,
      currentLat: 0,
      currentLng: 0,
      modalVisible: [false, false, false, false, false],
      informationModal: [false, false, false, false, false],
      imageIndex: 0,

    }
    
    this.getLocation();
  }

  openGps = (lat, lng, name) => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${lat},${lng}`;
    const label = name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });


    Linking.openURL(url); 
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

  handleScroll = (event) => { 
    var i = Math.floor((event.nativeEvent.contentOffset.x + SNAP_WIDTH / 2) / SNAP_WIDTH)
    var cords = this.state.interestMarkers[i]["coordinate"]
    var lat = cords["latitude"]
    var lng = cords["longitude"]
    this.refs._mapView.animateToRegion({latitude: lat, longitude: lng, latitudeDelta: .05, longitudeDelta: .05}, 500)
    //this.setState({index: i})
   }
  
  handleImagePress = (event, length) => {
    var modal = this.state.modalVisible;
    for(var i = 0; i < length; i++)
    {
      if(findNodeHandle(this.refs["_"+this.state.index+"_"+i.toString()]) == event.nativeEvent.target)
      {
        modal[this.state.index] = true;
        this.setState({ modalVisible: modal, imageIndex: i})
      }
    }
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
    //edit profile checker
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
    const chatroom = async () =>
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
          {this.state.interestMarkers.map((marker, markerIndex) => (
            <View style={styles.item} key={marker.key}>
              <Text style = {{textAlign: 'center', fontWeight: 'bold', fontSize: 24, color: "white"}}>{marker.title}</Text>
              <ScrollView horizontal = {true} width = {ITEM_WIDTH} maxHeight = {50}>
                {marker.pictures.map((uri) => (
                   <Image
                   style={styles.ImageContainer}
                   source={{
                     uri: uri}}
                 />
                ))}
              </ScrollView>
              <Button title={"More Information"} color={"tomato"} 
              onPress={()=>{
                var modal = this.state.informationModal; 
                modal[markerIndex]=true; 
                this.setState({informationModal: modal, index: markerIndex})
                }}>
                </Button>
             </View>
          ))}
        </ScrollView>
        <View style={styles.rectangle}>
          <View style={styles.MainContainerMain}>
            <View style={styles.MainContainer}>
               <TouchableOpacity
                onPress={chatroom}>
                <Image
                  source={require('../images/Message.png')}
                  style={{
                    width: 40,
                    height: 40,
                    borderColor: 'black',
                    borderRadius: 150 / 2}}
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
        {this.state.interestMarkers.map((marker, markerIndex) => (
        <Modal visible={this.state.modalVisible[markerIndex]}
          transparent={true}
          onRequestClose={() => this.setState({ modalVisible: [false,false,false,false,false] })}>
          <ImageViewer index={this.state.imageIndex} imageUrls={marker.pictureURL} enableSwipeDown={true} onSwipeDown={() => this.setState({ modalVisible: [false,false,false,false,false] })}/>
        </Modal>
        ))}
        {this.state.interestMarkers.map((marker, markerIndex) => (
        <Modal visible={this.state.informationModal[markerIndex]}
          transparent={false}
          onRequestClose={() => this.setState({ informationModal: [false,false,false,false,false] })}>
            <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 24}}>{marker.title}</Text>
            <ScrollView horizontal = {true}>
                {marker.pictures.map((uri, pictureIndex) => (
                    
                  <TouchableOpacity onPress={(e) => this.handleImagePress(e, marker.pictures.length)}>
                   <Image
                   style={styles.InformationImageContainer}
                   source={{
                     uri: uri}}
                     ref={"_"+markerIndex+"_"+pictureIndex}
                 />
                    </TouchableOpacity>
                ))}
            </ScrollView>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>Address</Text>
            <View style={{padding: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>{marker.address}</Text>
              <Button color={"tomato"} title = {"Get Direction"} onPress = {() => this.openGps(marker.coordinate.latitude, marker.coordinate.longitude, marker.title)}></Button>
              </View>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>Reviews</Text>
            <ScrollView >
              {marker.reviews.map((review) => (
                <View style = {{justifyContent: 'space-between'}}>
                  <View style = {{padding: 5,flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{review.name}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{review.rating}★</Text>
                  </View>
                  <View style={{padding: 20, borderWidth: 1}}><Text>{review.text}</Text></View>
                </View>
              ))}
            </ScrollView>
          </Modal>
        ))}
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

  ImageContainer: {
    height: 50,
    width: 50,
  },

  InformationImageContainer: {
    height: 200,
    width: 200,
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
    backgroundColor: 'tomato',
    marginHorizontal: ITEM_SPACING / 2,
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#000',
    justifyContent: 'space-between',
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