import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';

class OutputItemScreen extends Component {
  static navigationOptions = {
    title: 'Inventario',
  };

  goHome() {
    this.props.navigation.navigate('PharmacyScreen');
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={this.goHome.bind(this)}>
            Farmacia
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default OutputItemScreen;
