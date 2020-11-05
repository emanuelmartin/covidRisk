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
<<<<<<< HEAD
        const Productos = require('./farmacia.json');
=======
        //const Productos = require('./farmacia.json');
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
        const objects = [];
        Productos.forEach((producto) => {
          console.log(producto)

          const codigo = producto.codigo;
          const codigoProveedor = producto.codigoProveedor;
          const proveedor = '';
          const nombre = producto.nombre;
          const laboratorio = producto.laboratorio;
          const formula = producto.formula;
          const presentacion = producto.presentacion;
          const contenido = '';
          const viaAdministracion = producto.viaAdministracion;
          let costoUMC = parseFloat(producto.costoUMC).toFixed(2);
          costoUMC = parseFloat(costoUMC);
          const umc = producto.umc;
          const umv = producto.umv;
          const cantidadUMV = parseInt(producto.cantidadUMV, 10);
          let costoUMV = parseFloat(producto.costoUMV);
          costoUMV = parseFloat(costoUMV);
          let porcentajeUtilidad = parseInt(producto.porcentajeUtilidad, 10);
          if(!porcentajeUtilidad) porcentajeUtilidad = 0;
          let precioPublico = parseFloat(producto.precioPublico).toFixed(2);
          precioPublico = parseFloat(precioPublico)
          const porcentajeAumentoSeguro = 35;
          let precioSeguro = parseFloat(producto.precioSeguro).toFixed(2);
          precioSeguro = parseFloat(precioSeguro);
          const iva = parseInt(producto.iva, 10);
          const stock = 0
          const stockMinimo = 0;
          const tipo = producto.tipo;
          let precioMaximo = parseFloat(producto.precioMaximo).toFixed(2);
          precioMaximo = parseFloat(precioMaximo);

          const parseObject = new Inventario();
          parseObject.set('codigo', codigo);
          parseObject.set('codigoProveedor', codigoProveedor);
          parseObject.set('proveedor', proveedor);
          parseObject.set('nombre', nombre);
          parseObject.set('laboratorio', laboratorio);
          parseObject.set('formula', formula);
          parseObject.set('presentacion', presentacion);
          parseObject.set('contenido', contenido);
          parseObject.set('viaAdministracion', viaAdministracion);
          parseObject.set('costoUMC', costoUMC);
          parseObject.set('umc', umc);
          parseObject.set('umv', umv);
          parseObject.set('cantidadUMV', cantidadUMV);
          parseObject.set('costoUMV', costoUMV);
          parseObject.set('porcentajeUtilidad', porcentajeUtilidad);
          parseObject.set('precioPublico', precioPublico);
          parseObject.set('porcentajeAumentoSeguro', porcentajeAumentoSeguro);
          parseObject.set('precioSeguro', precioSeguro);
          parseObject.set('iva', iva);
          parseObject.set('stock', stock);
          parseObject.set('stockMinimo', stockMinimo);
          parseObject.set('tipo', tipo);
          parseObject.set('precioMaximo', precioMaximo);

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
