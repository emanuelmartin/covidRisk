import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, CardSection } from '../common';

export default class InventoryDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('item').name
    };
  };

  renderItem(item) {
    console.log(item);
    const data = { key: item[0].toString(), value: item[1].toString() };
    if (data.key !== 'stock') {
      return (
        <View>
          <Card>
            <CardSection>
            <Text>{data.key}</Text>
            </CardSection>
            <CardSection>
            <Text>{data.value}</Text>
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
