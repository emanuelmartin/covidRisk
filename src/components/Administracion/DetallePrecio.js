import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import SwipeView from 'react-native-swipeview';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Parse from 'parse/react-native';
import { SearchBar, Icon, CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { CardSection, Button, Input, FalseInput } from '../common';
import { queryFunc, cleanFunc, cleanBarCode } from '../../actions';
import update from 'react-addons-update';
import { Dropdown } from 'react-native-material-dropdown';

class DetallePrecio extends Component {

  static navigationOptions = {
    title: 'Actualizar Servicio/Producto',
  };

  constructor(props) {
    super(props);
    const servicio = props.navigation.getParam('item');
    this.state = { servicio: servicio.item, loading: false };
  }

    renderFields() {
      if (this.state.servicio.tipo !== '') {
        return (
          <View style={{ flex: 1 }}>
            <CardSection>
            <Input
            selectTextOnFocus
              label="Nombre"
              placeholder="Estudio"
              onChangeText={(text) => this.setState({
                servicio: update(this.state.servicio, { nombre: { $set: text } })
              })}
              value={String(this.state.servicio.nombre)}
            />
            </CardSection>
            <CardSection>
              <Input
              selectTextOnFocus
                label="Precio Público"
                placeholder="$100.00"
                keyboardType='numeric'
                onChangeText={(text) => this.setState({
                  servicio: update(this.state.servicio, { precioPublico: { $set: text } })
                })}
                value={String(this.state.servicio.precioPublico)}
              />
            </CardSection>
            <CardSection>
              <Input
              selectTextOnFocus
                label="Precio Seguro"
                placeholder="$100.00"
                keyboardType='numeric'
                onChangeText={(text) => this.setState({
                  servicio: update(this.state.servicio, { precioSeguro: { $set: text } })
                })}
                value={String(this.state.servicio.precioSeguro)}
              />
            </CardSection>
            <CardSection>
              <Text style={{ fontSize: 18 }}>
              Iva: {this.state.servicio.iva}%
              </Text>
            </CardSection>
            <CardSection>
              <Text style={{ fontSize: 18 }}>
              Precio público con iva: {this.precioPublicoIva(this.state.servicio)}
              </Text>
            </CardSection>
            <CardSection>
              <Text style={{ fontSize: 18 }}>
              Precio aseguradora con iva: {this.precioSeguroIva(this.state.servicio)}
              </Text>
            </CardSection>
            <CardSection>
              {this.renderButton()}
            </CardSection>
          </View>
      );
    }
  }

  precioPublicoIva(servicio){
    return(
      (servicio.precioPublico * (1 + servicio.iva/100)).toFixed(2)
    )
  }

  precioSeguroIva(servicio){
    return(
      (servicio.precioSeguro * (1 + servicio.iva/100)).toFixed(2)
    )
  }

  renderButton() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <Button onPress={() => this.actualizar()}>
          Actualizar
        </Button>
      );
    }
  }

  actualizar() {
    this.setState({ loading: true });
    console.log('Ingresando')
    const { servicio } = this.state;

    const Inventario = Parse.Object.extend('Servicios');
    const parseObject = new Inventario();

    parseObject.set('objectId', servicio.objectId)
    parseObject.set('nombre', servicio.nombre)
    parseObject.set('precioPublico', parseFloat(servicio.precioPublico));
    parseObject.set('precioSeguro', parseFloat(servicio.precioSeguro));
    parseObject.save().then(() => {
      Alert.alert(
        'Listo',
        'Servicio actualizado correctamente',
        [{ text: 'Ok', style: 'cancel' }]
      );
      this.setState({ loading: false });
    }).catch((error) => {
        Alert.alert(
        'Error',
        'Error al actualizar el Servicio, ' + error.message,
        [{ text: 'Ok', style: 'cancel' }]
      )
        this.setState({ loading: false });
    });
  }

  navigateToScreen = (route, item, modal) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      item
    });
    this.props.navigation.navigate(route, { item });
    this.setState({ [modal]: false })
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
          {this.renderFields()}
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    viewStyle: {
      flex: 1,
      backgroundColor: 'white',
    },
    textStyle: {
      padding: 10,
    },
    patientTextStyle: {
      fontSize: 18,
    },
    emphasisTextStyle: {
      fontSize: 18,
      color: '#000',
      fontWeight: 'bold'
    }
  });

const mapStateToProps = ({ query, barCodeReader, auth }) => {
  const { user } = auth;
  const userType = user.attributes.userType;
const { barCode, barType } = barCodeReader;
const { text, Proveedor, Inventario } = query;
return { text, Proveedor, Inventario, barCode, barType, user, userType };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, cleanBarCode })(DetallePrecio);
