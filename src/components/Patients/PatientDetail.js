import React, {Component} from 'react';
import { Text } from 'react-native';


export default class PatientDetail extends Component {
  static navigationOptions = {
    title: 'Detalle',
  };

  render() {
    const {navigation} = this.props;
    const item = navigation.getParam('item');
    return (
      <Text>{item.lastName1}</Text>
    )
  }
}
