import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
  TextField,
} from 'react-native';

export default class AddressInput extends Component {
    state = {Address1: '', Address2: '', Keyword: ''};
    render()
    {
        return (
            <View>
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Address 1"
                    placeholderTextColor="#C0C0C0"
                    selectionColor="#fff"
                    onChangeText={Address1 => this.setState({Address1})}
                    value={this.state.Address1}
                />
                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Address 2"
                    placeholderTextColor="#C0C0C0"
                    selectionColor="#fff"
                    onChangeText={Address2 => this.setState({Address2})}
                    value={this.state.Address2}
                />
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
                            onPress={() => this.props.navigation.navigate('Map', {Address1: this.state.Address1, Address2: this.state.Address2, Keyword: this.state.Keyword})}
                            title="Find the Middle"
                            color="orange"
                        />
                    </View>
                </View>
            </View>
            );
            
    }

}
const styles = StyleSheet.create({
    button: {paddingHorizontal: 10},
    buttonContainer: {
        top: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    inputBox: {
      width: 300,
      backgroundColor: 'rgba(255, 255,255,0.2)',
      borderRadius: 25,
      backgroundColor: 'rgba(255, 255,255,1)',
      // borderRadius: 25,
      paddingHorizontal: 16,
      fontSize: 16,
      color: '#ffffff',
      color: 'rgba(0, 0,0,1)',
      marginVertical: 10,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: '500',
      fontSize: 32,
      fontWeight: 'bold',
      color: '#ffffff',
      textAlign: 'center',
    },
})
