
import React, { Component } from 'react';
import {StatusBar} from 'react-native';

import GetLocation from 'react-native-get-location';
import MapView, { Marker } from 'react-native-maps';
import AsyncStorage from '@react-native-community/async-storage';

    const styles = StyleSheet.create({
     container: {
       ...StyleSheet.absoluteFillObject,
       height: 400,
       width: 400,
       justifyContent: 'flex-end',
       alignItems: 'center',
     },
     map: {
       ...StyleSheet.absoluteFillObject,
     },
    });

export default class App extends Component {

    constructor () {
        super();

        this.state={
      location: '',
      locationArray: []
      }
    }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 1000);
    this.interval2 = setInterval(() => this.tock(), 5000);
    GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
})
.then(location => {
  location.latitudeDelta = 0.015;
  location.longitudeDelta = 0.0121;

  this.setState({location})
})
.catch(error => {
    const { code, message } = error;
    console.warn(code, message);
})
}


tick() {
  GetLocation.getCurrentPosition({
  enableHighAccuracy: true,
  timeout: 15000,
    }).then((location, state) => {
      location.latitudeDelta = 0.015;
      location.longitudeDelta = 0.0121;

      this.setState({location});
    })
}

tock() {
  let {locationArray, location} = this.state;
  if(Array.isArray(locationArray)) {
    locationArray.push(location)
  } else {
  locationArray = [location]
}

console.log(locationArray)
this.setState({locationArray});

}

render() {
const { location } = this.state;
if (location !== '') {
return (
       <View style={styles.container}>
         <MapView
           style={styles.map}
           region={location}
         >
         {this.state.locationArray.map(marker => (
    <Marker
    coordinate={{
      latitude: location.latitude,
      longitude: location.longitude
    }}
    />
  ))}
          </MapView>
       </View>
    );
  }
  return (
         <View style={styles.container}>

         </View>
      );
  }
}
