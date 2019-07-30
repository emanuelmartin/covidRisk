import React, {Component} from 'react';
import { Text } from 'react-native';


export default class PatientDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('item').names
  };
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');

    return (
      <Text>{JSON.stringify(item)}</Text>
    )
  }
}
