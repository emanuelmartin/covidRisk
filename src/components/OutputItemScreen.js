import React, { Component } from 'react';
import { Card, CardSection } from './common';

class OutputItemScreen extends Component {
  static navigationOptions = {
    title: 'Venta de Producto',
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
