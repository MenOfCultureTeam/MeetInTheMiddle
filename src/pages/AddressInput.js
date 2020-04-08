import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Button,
  Picker,
  Slider,
} from 'react-native';

import { GoogleAutoComplete } from 'react-native-google-autocomplete';

import LocationItem from '../components/LocationItem.js';

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
            <View>
            <View style={{height: 300}}>
                <ScrollView>
                    {this.state.textInput.map((value, index) => {
                        return value
                    })}
                    <Button title='+' onPress={() => this.addTextInput(this.state.textInput.length)} color='orange'/>
                </ScrollView>
            </View>
            
            <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Keyword (ex. cafe, taco, etc...)"
                    placeholderTextColor="#C0C0C0"
                    selectionColor="#fff"
                    onChangeText={Keyword => this.setState({Keyword})}
                    value={this.state.Keyword}
            />
            <Text style={{fontSize: 16}}>
                Mode
            </Text>
            <Picker
            selectedValue={this.state.Transport}
            onValueChange={(itemValue, itemIndex) =>
                this.setState({Transport: itemValue})
            }>
            <Picker.Item label="Freeway" value="freeway" />
            <Picker.Item label="Local" value="local" />
            
            </Picker>
                <Text style={{fontSize: 16}}>
                    Range: {this.state.Range}
                </Text>
            <Slider
                value={this.state.Range}
                onValueChange={Range => this.setState({ Range })}
                minimumValue = {1500}
                maximumValue = {5000}
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
                            onPress={() => this.props.navigation.navigate('Map', {Addresses: this.state.textInputValue, Keyword: this.state.Keyword,
                            Transport: this.state.Transport, Range: this.state.Range})}
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