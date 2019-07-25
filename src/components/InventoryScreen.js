import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';

class OutputItemScreen extends Component {
  static navigationOptions = {
    title: 'Inventario',
  };

  goHome() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <Card>
        <CardSection />
      </Card>
    );
  }
}

export default OutputItemScreen;
