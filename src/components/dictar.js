import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  AppRegistry,
  Alert,
  Modal
} from 'react-native';

import Voice from 'react-native-voice';
export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
      showModal: false
    };
Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
  }
componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };
onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };
onSpeechResults(e) {
    this.setState({
      results: e.value,
      showModal: true
    });
  }
async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
    });
    try {
      await Voice.start('es-MX');
    } catch (e) {
      Alert.error(e);
    }
  }
render () {
    return (
      <View>
        <Text style={styles.transcript}>
            Transcript
        </Text>
            <Modal
            visible={this.state.showModal}>
            <View>
        {<Text style={styles.transcript}> {this.state.results[0]}</Text>}
        </View>
        </Modal>
        <Button style={styles.transcript}
        onPress={this._startRecognition.bind(this)}
        title="Start"></Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  transcript: {
    textAlign: 'center',
    color: '#B0171F',
    marginBottom: 10,
    top: '100%',
  },
});
