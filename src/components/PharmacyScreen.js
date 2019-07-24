import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';

class PharmacyScreen extends Component {
  static navigationOptions = {
    title: 'Farmacia',
    headerTitleStyle: {
      fontWeight: 'bold',
      textAlign: 'center',
      flexGrow: 1,
      alignSelf: 'center',
    },
  };

  goInventory() {
    this.props.navigation.navigate('InventoryScreen');
  }

  goUpdateItem() {
    this.props.navigation.navigate('UpdateItemScreen');
  }

  goOutputItem() {
    this.props.navigation.navigate('OutputItemScreen');
  }

  goAddItem() {
    this.props.navigation.navigate('AddItemScreen');
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={this.goOutputItem.bind(this)}>
            Ventas
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.goInventory.bind(this)}>
            Inventario
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.goAddItem.bind(this)}>
            Alta Producto
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.goUpdateItem.bind(this)}>
            Actualizar Inventario // Cambiar nombre por Entradas de Inventario
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default PharmacyScreen;
