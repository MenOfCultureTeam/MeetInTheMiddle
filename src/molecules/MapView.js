import React from 'react';
import { View } from 'react-native';
import {TouchableOpacity, Text, StyleSheet,Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';


export const MView = () => {
  return(


    
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
        
  );
};

const styles = StyleSheet.create({
    map: {
        // ...StyleSheet.absoluteFillObject,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }
});