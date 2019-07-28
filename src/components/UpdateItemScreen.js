import React, { Component } from 'react';
import { Card, CardSection } from './common';

class UpdateItemScreen extends Component {
  static navigationOptions = {
    title: 'Actualizar Inventario',
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

export default UpdateItemScreen;
