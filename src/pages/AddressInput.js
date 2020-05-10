import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  Picker,
  Slider,
} from 'react-native';

import { GoogleAutoComplete } from 'react-native-google-autocomplete';

import LocationItem from '../components/LocationItem.js';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Video from 'react-native-video';

export default class App extends React.Component {
    
    constructor(props)
    {
        super(props);
        this.state = {textInput : [],
            textInputValue : {}, 
            Keyword: '', 
            Transport: 'freeway', 
            Range: 1500};
        this.addTextInput(0)
        this.addTextInput(1)
    }
    addTextInput = (key) => {
    let textInput = this.state.textInput;
    let val = this.state.textInputValue;
    val[key] = ''
    textInput.push(
    <GoogleAutoComplete apiKey="AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA" debounce={300} key={key}>
            {({ inputValue, handleTextChange, changeInput, locationResults, fetchDetails, clearSearch }) => (
            <React.Fragment> 
                <TextInput
                style={styles.inputBox}
                value={inputValue}
                onChangeText={handleTextChange}
                placeholder= {"Address " + (key + 1)}
                />
                <ScrollView style={{ maxHeight: 100 }} nestedScrollEnabled = {true}>
                {locationResults.map((el, i) => (
                    <LocationItem
                    {...el}
                    fetchDetails={fetchDetails}
                    key={String(i)}
                    clearSearch={clearSearch}
                    setState={()=>{val[key] = el.place_id; changeInput(el.description);}}
                    />
                ))}
                </ScrollView>
                {key==0 &&
                <Button title="Use Current Location" color="orange" onPress={()=>{val[key] = "current"; changeInput("Current Location")}}></Button>
                }
                
            </React.Fragment>
        )}
    </GoogleAutoComplete>);
    this.setState({ textInput })
    this.setState({ val })
    }
    render() {
        return (
            <View style = {styles.containerBG}>
                <Video
                source={require('../images/loginAnimatedBG1.mp4')}
                style={styles.backgroundVideo}
                muted={true}
                repeat={true}
                resizeMode={'cover'}
                rate={1.0}
                ignoreSilentSwitch={'obey'}
                />
                <View style = {styles.topBar}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
                        <Image style={styles.returnIcon} source={require('../images/return.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerInput}>
                    <ScrollView>
                        {this.state.textInput.map((value, index) => {
                            return value
                        })}
                        <Button title='+' onPress={() => this.addTextInput(this.state.textInput.length)} color='orange'/>
                    </ScrollView>
                </View>
                
                <View style ={styles.containerKey}>
                    <KeyboardAwareScrollView>
                        <TextInput 
                            style={styles.inputBox}
                            underlineColorAndroid="rgba(0,0,0,0)"
                            placeholder="Search Nearby Restaurant ..."
                            placeholderTextColor="#C0C0C0"
                            selectionColor="#fff"
                            onChangeText={Keyword => this.setState({Keyword})}
                            value={this.state.Keyword}
                        />
                    </KeyboardAwareScrollView>
                    <Text style={styles.pickerText}>Mode</Text>
                    <Picker
                        selectedValue={this.state.Transport}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({Transport: itemValue})
                    }>
                        <Picker.Item label="Freeway" value="freeway" />
                        <Picker.Item label="Local" value="local" />
                    </Picker>
                    <Text style={styles.sliderText}>
                        Range: {this.state.Range}
                    </Text>
                    <Slider style={styles.slider}
                        value={this.state.Range}
                        onValueChange={Range => this.setState({ Range })}
                        minimumValue = {1500}
                        maximumValue = {5000}
                    />
                </View>
                <TouchableOpacity style ={styles.searchBtn} onPress={() => this.props.navigation.navigate('Map', {Addresses: this.state.textInputValue, Keyword: this.state.Keyword,
                    Transport: this.state.Transport, Range: this.state.Range})}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>

            </View>
            
      )
  }
}

const styles = StyleSheet.create({
    //BG part
    containerBG: {
        height:'100%',
        flexDirection: 'column',
        alignItems:'center',
        backgroundColor: 'rgba(222, 222, 222, 1)'
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      },
    //Top bar
    topBar: {
        width:'100%',
        backgroundColor: 'white',
        elevation: 9,
        flexDirection:'row',
        justifyContent:'space-between',
        padding:5,
    },
    //Address part
    containerInput:{
        width:'95%',
        height:'35%',
        backgroundColor: 'rgb(244, 244, 244)',
        borderRadius: 20,
        padding:10,
        elevation: 5,
        top:15,
        opacity: 0.9,
    },

    inputBox: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderWidth: 1,
        borderColor: '#dcdcdc',
        borderRadius: 7,
        elevation: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'rgba(0, 0, 0 ,1)',
        marginVertical: 10,
    },
    //Key part
    containerKey:{
        width:'95%',
        height:'35%',
        backgroundColor: 'rgb(244, 244, 244)',
        borderRadius: 20,
        padding:10,
        elevation: 5,
        top:25,
        opacity: 0.9,
        //justifyContent:'space-between',
    },
    pickerText:{
        fontSize: 18,
        textShadowColor: 'rgba(108, 122, 137, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1
    },
    sliderText:{
        fontSize: 18,
        textShadowColor: 'rgba(108, 122, 137, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1
    },
    slider:{
        top:3
    },
    //Button Container part
    searchBtn: {
        top:35,
        height:'18%',
        width: '35%',  //The Width must be the same as the height
        borderRadius: 1000, //Then Make the Border Radius twice the size of width or Height   
        backgroundColor:'#1e90ff',
        alignItems:'center',
        justifyContent:'center',
        elevation: 8,
    },

    buttonText:{
        fontSize: 32,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        textShadowColor: 'rgba(108, 122, 137, 1)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1
    }
});









// import React from 'react';
// import { StyleSheet, View, Dimensions, Animated } from 'react-native';
// import {
//     ProviderPropType,
//     Animated as AnimatedMap,
//     AnimatedRegion,
//     Marker,
//   } from 'react-native-maps';
//   import PanController from './PanController';
//   import PriceMarker from './AnimatedPriceMarker';
  
//   const screen = Dimensions.get('window');
  
//   const ASPECT_RATIO = screen.width / screen.height;
//   const LATITUDE = 37.78825;
//   const LONGITUDE = -122.4324;
//   const LATITUDE_DELTA = 0.0922;
//   const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  
//   const ITEM_SPACING = 10;
//   const ITEM_PREVIEW = 10;
//   const ITEM_WIDTH = screen.width - 2 * ITEM_SPACING - 2 * ITEM_PREVIEW;
//   const SNAP_WIDTH = ITEM_WIDTH + ITEM_SPACING;
//   const ITEM_PREVIEW_HEIGHT = 150;
//   const SCALE_END = screen.width / ITEM_WIDTH;
//   const BREAKPOINT1 = 246;
//   const BREAKPOINT2 = 350;
//   const ONE = new Animated.Value(1);
  
//   function getMarkerState(panX, i) {
//     const xLeft = -SNAP_WIDTH * i + SNAP_WIDTH / 2;
//     const xRight = -SNAP_WIDTH * i - SNAP_WIDTH / 2;
//     const xPos = -SNAP_WIDTH * i;
  
//     const isIndex = panX.interpolate({
//       inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
//       outputRange: [0, 1, 1, 0],
//       extrapolate: 'clamp',
//     });
  
//     const isNotIndex = panX.interpolate({
//       inputRange: [xRight - 1, xRight, xLeft, xLeft + 1],
//       outputRange: [1, 0, 0, 1],
//       extrapolate: 'clamp',
//     });
  
//     const center = panX.interpolate({
//       inputRange: [xPos - 10, xPos, xPos + 10],
//       outputRange: [0, 1, 0],
//       extrapolate: 'clamp',
//     });
  
//     const selected = panX.interpolate({
//       inputRange: [xRight, xPos, xLeft],
//       outputRange: [0, 1, 0],
//       extrapolate: 'clamp',
//     });
  
//     const translateX = panX;
  
//     // if i === index: [0 => 0]
//     // if i !== index: [0 => 1]
  
//     // if i === index: [1 => 1]
//     // if i !== index: [1 => 0]
  
//     const markerScale = selected.interpolate({
//       inputRange: [0, 1],
//       outputRange: [1, 1.2],
//     });
  
//     return {
//       translateY,
//       translateX,
//       scale,
//       opacity,
//       anim,
//       center,
//       selected,
//       markerOpacity,
//       markerScale,
//     };
//   }
  
//   class AddressInput extends React.Component {
//     constructor(props) {
//       super(props);
  
//       const panX = new Animated.Value(0);
  
//       const scrollX = panX.interpolate({
//         inputRange: [-1, 1],
//         outputRange: [1, -1],
//       });
  
//       const markers = [
//         {
//           id: 0,
//           amount: 99,
//           coordinate: {
//             latitude: LATITUDE,
//             longitude: LONGITUDE,
//           },
//         },
//         {
//           id: 1,
//           amount: 199,
//           coordinate: {
//             latitude: LATITUDE + 0.004,
//             longitude: LONGITUDE - 0.004,
//           },
//         },
//         {
//           id: 2,
//           amount: 285,
//           coordinate: {
//             latitude: LATITUDE - 0.004,
//             longitude: LONGITUDE - 0.004,
//           },
//         },
//       ];
  
//       const animations = markers.map((m, i) =>
//         getMarkerState(panX, i)
//       );
//       console.log("Animations:" + animations)
//       this.state = {
//         panX,
//         animations,
//         index: 0,
//         canMoveHorizontal: true,
//         scrollX,
//         scale,
//         translateY,
//         markers,
//         region: new AnimatedRegion({
//           latitude: LATITUDE,
//           longitude: LONGITUDE,
//           latitudeDelta: LATITUDE_DELTA,
//           longitudeDelta: LONGITUDE_DELTA,
//         }),
//       };
//     }
  
//     componentDidMount() {
//       const { region, panX, scrollX, markers } = this.state;
  
//       panX.addListener(this.onPanXChange);
  
//       region.stopAnimation();
//       region
//         .timing({
//           latitude: scrollX.interpolate({
//             inputRange: markers.map((m, i) => i * SNAP_WIDTH),
//             outputRange: markers.map(m => m.coordinate.latitude),
//           }),
//           longitude: scrollX.interpolate({
//             inputRange: markers.map((m, i) => i * SNAP_WIDTH),
//             outputRange: markers.map(m => m.coordinate.longitude),
//           }),
//           duration: 0,
//         })
//         .start();
//     }
  
//     onPanXChange = ({ value }) => {
//       const { index } = this.state;
//       const newIndex = Math.floor((-1 * value + SNAP_WIDTH / 2) / SNAP_WIDTH);
//       if (index !== newIndex) {
//         this.setState({ index: newIndex });
//       }
//     };
  
  
//     onRegionChange(/* region */) {
//       // this.state.region.setValue(region);
//     }
  
//     render() {
//       const {
//         panX,
//         panY,
//         animations,
//         canMoveHorizontal,
//         markers,
//         region,
//       } = this.state;
  
//       console.log(animations)
//       return (
//         <View style={styles.container}>
//           <PanController
//             style={styles.container}
//             vertical
//             horizontal={canMoveHorizontal}
//             xMode="snap"
//             snapSpacingX={SNAP_WIDTH}
//             yBounds={[-1 * screen.height, 0]}
//             xBounds={[-screen.width * (markers.length - 1), 0]}
//             panX={panX}
//             onStartShouldSetPanResponder={this.onStartShouldSetPanResponder}
//             onMoveShouldSetPanResponder={this.onMoveShouldSetPanResponder}
//           >
//             <AnimatedMap
//               provider={this.props.provider}
//               style={styles.map}
//               region={region}
//               onRegionChange={this.onRegionChange}
//             >
//               {markers.map((marker, i) => {
//                 const { selected, markerScale } = animations[i];
  
//                 return (
//                   <Marker key={marker.id} coordinate={marker.coordinate}>
//                     <PriceMarker
//                       style={{
//                         transform: [{ scale: markerScale }],
//                       }}
//                       amount={marker.amount}
//                       selected={selected}
//                     />
//                   </Marker>
//                 );
//               })}
//             </AnimatedMap>
//             <View style={styles.itemContainer}>
//               {markers.map((marker, i) => {
//                 const { translateX} = animations[i];
  
//                 return (
//                   <Animated.View
//                     key={marker.id}
//                     style={[
//                       styles.item,
//                       {
//                         transform: [{ translateX }],
//                       },
//                     ]}>
//                   </Animated.View>
//                 );
//               })}
//             </View>
//           </PanController>
//         </View>
//       );
//     }
//   }
  
//   AddressInput.propTypes = {
//     provider: ProviderPropType,
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       ...StyleSheet.absoluteFillObject,
//     },
//     itemContainer: {
//       backgroundColor: 'transparent',
//       flexDirection: 'row',
//       paddingHorizontal: ITEM_SPACING / 2 + ITEM_PREVIEW,
//       position: 'absolute',
//       // top: screen.height - ITEM_PREVIEW_HEIGHT - 64,
//       paddingTop: screen.height - ITEM_PREVIEW_HEIGHT - 64,
//       // paddingTop: !ANDROID ? 0 : screen.height - ITEM_PREVIEW_HEIGHT - 64,
//     },
//     map: {
//       backgroundColor: 'transparent',
//       ...StyleSheet.absoluteFillObject,
//     },
//     item: {
//       width: ITEM_WIDTH,
//       height: screen.height + 2 * ITEM_PREVIEW_HEIGHT,
//       backgroundColor: 'white',
//       marginHorizontal: ITEM_SPACING / 2,
//       overflow: 'hidden',
//       borderRadius: 3,
//       borderColor: '#000',
//     },
//   });
  
//   export default AddressInput
