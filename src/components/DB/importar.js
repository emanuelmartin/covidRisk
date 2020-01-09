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
        const Productos = require('./consignaPromedica.json');
        const objects = [];
        Productos.forEach((producto) => {
          console.log(producto)

          const tipo = producto.tipo;
          const umc = producto.UMC;
          const umv = producto.UMV;
          const codigo = producto.codigo;
          const nombre = producto.nombre;
          const codigoProveedor = producto.codigoProveedor;
          const stock = 0;
          const stockMinimo = 0;
          const IVA = parseInt(producto.IVA, 10);
          const cantidadUMV = parseInt(producto.cantidadUMV, 10);
          const costoUMC = parseFloat(producto.costoUMC, 10);
          const costoUMV = parseFloat(producto.costoUMV, 10);
          const precioPublico = parseFloat(producto.precioPublico, 10);
          const precioSeguro = parseFloat(producto.precioSeguro, 10);
          const laboratorio = '';
          const proveedor = '';

          const parseObject = new Inventario();
          parseObject.set('tipo', tipo);
          parseObject.set('umc', umc);
          parseObject.set('umv', umv);
          parseObject.set('codigo', codigo);
          parseObject.set('nombre', nombre);
          parseObject.set('codigoProveedor', codigoProveedor);
          parseObject.set('stock', stock);
          parseObject.set('stockMinimo', stockMinimo);
          parseObject.set('IVA', IVA);
          parseObject.set('cantidadUMV', cantidadUMV);
          parseObject.set('costoUMC', costoUMC);
          parseObject.set('costoUMV', costoUMV);
          parseObject.set('precioPublico', precioPublico);
          parseObject.set('precioSeguro', precioSeguro);
          parseObject.set('laboratorio', laboratorio);
          parseObject.set('proveedor', proveedor);

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
