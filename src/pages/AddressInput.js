// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   Text,
//   Button,
//   View,
//   TextInput,
//   TouchableOpacity,
//   ImageBackground,
//   Dimensions,
//   Alert,
//   TextField,
// } from 'react-native';
// import Autocomplete from 'react-native-autocomplete-input';
// export default class AddressInput extends Component {
//     state = {Address1: '', Address2: '', Keyword: ''};
//     render()
//     {
//         return (
//             <View>
//                 <Autocomplete
//                     style={styles.inputBox}
//                     placeholder="Test"
//                 />
//                 <TextInput
//                     style={styles.inputBox}
//                     underlineColorAndroid="rgba(0,0,0,0)"
//                     placeholder="Address 1"
//                     placeholderTextColor="#C0C0C0"
//                     selectionColor="#fff"
//                     onChangeText={Address1 => this.setState({Address1})}
//                     value={this.state.Address1}
//                 />
//                 <TextInput
//                     style={styles.inputBox}
//                     underlineColorAndroid="rgba(0,0,0,0)"
//                     placeholder="Address 2"
//                     placeholderTextColor="#C0C0C0"
//                     selectionColor="#fff"
//                     onChangeText={Address2 => this.setState({Address2})}
//                     value={this.state.Address2}
//                 />
//                 <TextInput
//                     style={styles.inputBox}
//                     underlineColorAndroid="rgba(0,0,0,0)"
//                     placeholder="Keyword (ex. cafe, taco, etc...)"
//                     placeholderTextColor="#C0C0C0"
//                     selectionColor="#fff"
//                     onChangeText={Keyword => this.setState({Keyword})}
//                     value={this.state.Keyword}
//                 />
//                 <View style={styles.buttonContainer}>
//                     <View style={styles.button}>
//                         <Button
//                             onPress={() => this.props.navigation.navigate('Map')}
//                             title="Back"
//                             color="orange"
//                         />
//                     </View>
//                     <View style={styles.button}>
//                         <Button
//                             onPress={() => this.props.navigation.navigate('Map', {Address1: this.state.Address1, Address2: this.state.Address2, Keyword: this.state.Keyword})}
//                             title="Find the Middle"
//                             color="orange"
//                         />
//                     </View>
//                 </View>
//             </View>
//             );

//     }

// }
// const styles = StyleSheet.create({
//     button: {paddingHorizontal: 10},
//     buttonContainer: {
//         top: 100,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },

//     inputBox: {
//       width: 300,
//       borderRadius: 25,
//       backgroundColor: 'rgba(255, 255,255,1)',
//       // borderRadius: 25,
//       paddingHorizontal: 16,
//       fontSize: 16,
//       color: 'rgba(0, 0,0,1)',
//       marginVertical: 10,
//     },
//     buttonText: {
//       fontSize: 16,
//       fontWeight: '500',
//       color: '#ffffff',
//       textAlign: 'center',
//     },
// })
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Button
} from 'react-native';

import { GoogleAutoComplete } from 'react-native-google-autocomplete';

import LocationItem from '../components/LocationItem.js';

export default class App extends React.Component {
    state = {Address1: '', Address2: '', Keyword: '', Address1Id: '', Address2Id: ''};
    render() {
        return (
            <View>
                <Text style={{fontSize: 16}}>Address 1</Text>
                <Text style={{fontSize: 16}}>{this.state.Address1}</Text>
                <View style={styles.inputWrapper}>
                    <GoogleAutoComplete apiKey="AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA" debounce={300}>
                    {({ inputValue, handleTextChange, locationResults, fetchDetails, clearSearch }) => (
                        <React.Fragment>
                            <TextInput
                            style={styles.inputBox}
                            value={inputValue}
                            onChangeText={handleTextChange}
                            placeholder="Address 1"
                            />
                            <ScrollView style={{ maxHeight: 100 }}>
                            {locationResults.map((el, i) => (
                                <LocationItem
                                {...el}
                                fetchDetails={fetchDetails}
                                key={String(i)}
                                clearSearch={clearSearch}
                                setState={()=>this.setState({Address1:el.description, Address1Id:el.place_id})}
                                />
                            ))}
                            </ScrollView>
                        </React.Fragment>
                    )}
                    </GoogleAutoComplete>
                    <Button style={styles.buttonText} color="orange" title={"Current\nLocation"} onPress={()=>this.setState({Address1:"Current Location", Address1Id:"current"})} />
                </View>
                
                <Text style={{fontSize: 16}}>{styles.text} Address 2</Text>
                <Text style={{fontSize: 16}}>{this.state.Address2}</Text>
                <GoogleAutoComplete apiKey="AIzaSyA2ADvVjhV9plDSKkMZYHl3PM0fq1bT3OA" debounce={300}>
                {({ inputValue, handleTextChange, locationResults, fetchDetails, clearSearch }) => (
                    <React.Fragment>
                        <TextInput
                        style={styles.inputBox}
                        value={inputValue}
                        onChangeText={handleTextChange}
                        placeholder="Address 2"
                        />
                        <ScrollView style={{ maxHeight: 100 }}>
                        {locationResults.map((el, i) => (
                            <LocationItem
                            {...el}
                            fetchDetails={fetchDetails}
                            key={String(i)}
                            clearSearch={clearSearch}
                            setState={()=>this.setState({Address2:el.description, Address2Id:el.place_id})}
                            />
                        ))}
                        </ScrollView>
                    </React.Fragment>
                )}
            </GoogleAutoComplete>
            <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Keyword (ex. cafe, taco, etc...)"
                    placeholderTextColor="#C0C0C0"
                    selectionColor="#fff"
                    onChangeText={Keyword => this.setState({Keyword})}
                    value={this.state.Keyword}
            />
            <View style={styles.buttonContainer}>
                     <View style={styles.button}>
                         <Button
                            onPress={() => this.props.navigation.navigate('Map')}
                            title="Back"
                            color="orange"
                        />
                    </View>
                    <View style={styles.button}>
                        <Button
                            onPress={() => this.props.navigation.navigate('Map', {Address1: this.state.Address1Id, Address2: this.state.Address2Id, Keyword: this.state.Keyword})}
                            title="Find the Middle"
                            color="orange"
                        />
                    </View>
            </View>
            </View>
            
      )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {paddingHorizontal: 10},
    buttonContainer: {
        top: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inputBox: {
        width: 300,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255,255,1)',
        // borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: 'rgba(0, 0,0,1)',
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'orange',
        textAlign: 'center',
        height: 100,
    },
});