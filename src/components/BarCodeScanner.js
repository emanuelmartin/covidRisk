import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class BarCodeScanner extends Component {
  constructor(props) {
    super(props);
    this.handleTourch = this.handleTourch.bind(this);
    this.state = {
      torchOn: false,
    };
  }
  onBarCodeRead = e => {
    Alert.alert('Barcode value is ' + e.data, '\nBarcode type is ' + e.type);
  };
  onFacesDetected = e => {
    Alert.alert('Face detected: ' + e.faces);
  };
  onTextRecognized = e => {
    var text = '';
    if (e.textBlocks.length > 0) {
      e.textBlocks.forEach(function(txt) {
        text += txt.value + '\n';
      });
      Alert.alert('Text detected: ' + text);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          flashMode={
            this.state.torchOn
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          onBarCodeRead={this.onBarCodeRead}
          ref={cam => (this.camera = cam)}>
          <View style={styles.rectangleContainer}>
            <View style={styles.rectangle}>
              <View style={styles.rectangleColor} />
              <View style={styles.topLeft} />
              <View style={styles.topRight} />
              <View style={styles.bottomLeft} />
              <View style={styles.bottomRight} />
            </View>
          </View>
          <View style={styles.textBg}>
            <Text style={styles.scanText}>
              Coloca el código de barras dentro del recuadro
            </Text>
          </View>
        </RNCamera>
        <View style={styles.bottomOverlay}>
          <TouchableOpacity
            onPress={() => this.handleTourch(this.state.torchOn)}>
            <Image
              style={styles.cameraIcon}
              source={
                this.state.torchOn === true
                  ? require('./images/torch_off.png')
                  : require('./images/torch_on.png')
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  handleTourch(value) {
    if (value === true) {
      this.setState({torchOn: false});
    } else {
      this.setState({torchOn: true});
    }
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  rectangle: {
    borderLeftColor: 'rgba(0, 0, 0, .6)',
    borderRightColor: 'rgba(0, 0, 0, .6)',
    borderTopColor: 'rgba(0, 0, 0, .6)',
    borderBottomColor: 'rgba(0, 0, 0, .6)',
    borderLeftWidth: deviceWidth / 5,
    borderRightWidth: deviceWidth / 5,
    borderTopWidth: deviceHeight / 2,
    borderBottomWidth: deviceHeight / 4,
  },
  rectangleColor: {
    height: 250,
    width: 250,
    backgroundColor: 'transparent',
  },
  topLeft: {
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    position: 'absolute',
    left: -1,
    top: -1,
    borderLeftColor: 'white',
    borderTopColor: 'white',
  },
  topRight: {
    width: 50,
    height: 50,
    borderTopWidth: 2,
    borderRightWidth: 2,
    position: 'absolute',
    right: -1,
    top: -1,
    borderRightColor: 'white',
    borderTopColor: 'white',
  },
  bottomLeft: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    position: 'absolute',
    left: -1,
    bottom: -1,
    borderLeftColor: 'white',
    borderBottomColor: 'white',
  },
  bottomRight: {
    width: 50,
    height: 50,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    position: 'absolute',
    right: -1,
    bottom: -1,
    borderRightColor: 'white',
    borderBottomColor: 'white',
  },
  textBg: {
    backgroundColor: '#63C0B9',
  },
  scanText: {
    color: 'white',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cameraIcon: {
    margin: 5,
    height: 40,
    width: 40,
    backgroundColor: 'white',
  },
  bottomOverlay: {
    position: 'absolute',
    width: '100%',
    flex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
