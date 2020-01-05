import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import {
	updateBarCode,
	cleanBarCode,
  setItemCode
} from '../actions';

class BarCodeScanner extends Component {
  constructor(props) {
    super(props);
    this.handleTourch = this.handleTourch.bind(this);
    this.state = {
      torchOn: false,
    };
  }

  componentDidMount() {
   const { navigation } = this.props;
   navigation.addListener('willFocus', () =>
     this.setState({ focusedScreen: true, readBarCode: false }),
     this.props.cleanBarCode()
   );
   navigation.addListener('willBlur', () =>
     this.setState({ focusedScreen: false })
   );
 }

  onAcceptPress(e) {
    const update = this.props.navigation.getParam('updateCode', false);
    const req = this.props.navigation.getParam('pageRequest', '');
    if (update) {
      this.props.setItemCode(e.data, e.type);
    } else {
      this.props.updateBarCode({ barCode: e.data, barType: e.type, pageRequest: req });
    }
    this.props.navigation.goBack();
  }

  onCancelPress() {
    this.props.cleanBarCode();
    this.setState({ readBarCode: false });
    console.log('Cancel Pressed');
  }

  onBarCodeRead = e => {
    if (this.state.readBarCode === false) {
      this.setState({ readBarCode: true });
      Alert.alert(
        'Código Detectado: ' + e.data,
        '¿Desea continuar? ',
        [
          { text: 'Si', onPress: () => this.onAcceptPress(e) },
          { text: 'No', onPress: () => this.onCancelPress(), style: 'cancel' },
        ],
        { cancelable: false }
      );
    }
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
    const { hasCameraPermission, focusedScreen } = this.state;
   if (hasCameraPermission === null) {
     return <View />;
   } else if (hasCameraPermission === false) {
     return <Text>No access to camera</Text>;
   } else if (focusedScreen) {
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
           ref={cam => (this.camera = cam)}
         >
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
           <Icon
             name={
               this.state.torchOn === true
                 ? 'flash-off'
                 : 'flash-on'
             }
             type='material'
             onPress={() => this.handleTourch(this.state.torchOn)}
             color='yellow'
             size={34}
           />
         </View>
       </View>
     );
   } else {
     return <View />;
   }
  }

  handleTourch(value) {
    if (value === true) {
      this.setState({ torchOn: false });
    } else {
      this.setState({ torchOn: true });
    }
  }
}

const mapStateToProps = ({ barCodeReader }) => {
  return {
    barCode: barCodeReader.barCode,
    barType: barCodeReader.barType
  };
};

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
    borderBottomWidth: deviceHeight / 2,
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

export default connect(mapStateToProps, {
	updateBarCode,
  cleanBarCode,
  setItemCode
})(BarCodeScanner);
