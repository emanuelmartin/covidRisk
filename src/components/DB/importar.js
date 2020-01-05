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
        const Inventario = Parse.Object.extend('Inventario');
        const Productos = require('./pedidoDimeja.json');
        const objects = [];
        Productos.forEach((producto) => {
          console.log(producto)

          const codigo = producto.codigo;
      		const nombre = producto.nombre;
      		const umc = producto.umc;
      	   const umv = producto.umv;
      		const cantidadUMV = parseInt(producto.cantidadUMV, 10);
          const costoUMC = parseFloat(producto.costoUMC, 10);
      		const precioLista = parseFloat(producto.precioLista, 10);
      		const precioPublico = parseFloat(producto.precioPublico, 10);



          const parseObject = new Inventario();
          parseObject.set('codigo', codigo);
          parseObject.set('nombre', nombre);
          parseObject.set('umc', umc);
          parseObject.set('umv', umv);
          parseObject.set('cantidadUMV', cantidadUMV);
          parseObject.set('costoUMC', costoUMC);
          parseObject.set('precioLista', precioLista);
          parseObject.set('precioPublico', precioPublico);

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
