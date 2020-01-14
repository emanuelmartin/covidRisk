import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
  Alert
} from 'react-native';
import Parse from 'parse/react-native';
import { SearchBar, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { CardSection, Button, Input } from '../common';
import { queryFunc, cleanFunc } from '../../actions';
import update from 'react-addons-update';
import { Dropdown } from 'react-native-material-dropdown';


export default class Importar extends Component {

  constructor(props) {
    super(props);
    //setting default state
		this.state = { type: '' }
  }

  importar() {
        const Servicios = Parse.Object.extend('Servicios');
        const Productos = require('./preciosEstudios.json');
        const objects = [];
        Productos.forEach((producto) => {
          console.log(producto)

          const tipo = producto.tipo;
          const nombre = producto.nombre;
          const iva = parseInt(producto.iva, 10);
          const precioPublico = parseFloat(producto.precioPublico, 10);
          const precioSeguro = parseFloat(producto.precioSeguro, 10);

          const parseObject = new Servicios();
          parseObject.set('tipo', tipo);
          parseObject.set('nombre', nombre);
          parseObject.set('iva', iva);
          parseObject.set('precioPublico', precioPublico);
          parseObject.set('precioSeguro', precioSeguro);
          parseObject.set('tipoCobro', 'unitario');

          objects.push(parseObject);
          }
        );

        Parse.Object.saveAll(objects).then(() => {
          Alert.alert(
            'Listo',
            'Ingreso registrado correctamente',
            [{ text: 'Ok', style: 'cancel' }],
            { cancelable: false }
          );
        });
  }

  render() {
    console.log(this.state);
    return (
      <View style={ {flex: 1} }>
      <Button onPress={() => this.importar()}>
      Importar a DB
      </Button>
      </View>
    );
    }

}
