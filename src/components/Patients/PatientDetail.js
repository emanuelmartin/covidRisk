import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
//import { mapValues } from 'lodash';
import { Card, CardSection } from '../common';

export default class PatientDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('item').names
    };
  };

  renderItem(item) {
    console.log(item);
    if (item[0].toString() === 'Ocupada' && item[1] === true) item[1] = 'Ocupado';
    if (item[0].toString() === 'Ocupada' && item[1] === false) item[1] = 'Disponible';
    if (typeof item === 'object') {
      console.log(item);
    }
    const data = { key: item[0].toString(), value: item[1].toString() };
    if (
      data.key !== 'createdAt' &&
      data.key !== 'updatedAt' &&
      data.key !== 'ACL' &&
      data.key !== 'objectId' &&
      data.key !== 'password') {
    return (
      <View>
      <Card>
        <CardSection>
        <Text
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          marginTop: 15,
          padding: 5,
          color: '#000'
        }}
        >
          {data.key}
        </Text>
        </CardSection>
        <CardSection>
        <Text> {data.value}</Text>
        </CardSection>
      </Card>
      </View>
    );
  }
  }

  render() {
    const { navigation } = this.props;
    let data = navigation.getParam('item');
    const array = Object.entries(data);
    console.log(array);
    return (
      <ScrollView>
      {array.map(item => this.renderItem(item))}
      </ScrollView>
    );
  }
}
