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
import { CardSection, Button, Input } from '../common';
import { queryFunc, cleanFunc, cleanBarCode } from '../../actions';
import update from 'react-addons-update';
import { Dropdown } from 'react-native-material-dropdown';

const INITIAL_STATE = {
  search: '',
  buscarProveedor: false,
  buscarProducto: false,
  Proveedor: {},
  Productos: null,
  Pedido: {},
  Inventario: {},
  tipoIngreso: null,
  numFactura: '',
  detalleProducto: false,
  item: '',
  index: '',
  barCode: '',
  barType: '',
  pedidoID: '',
  cargarPedido: false,
  paquete: null
}

class ArmarPaquetes extends Component {

  constructor(props) {
    super(props);

    this.state = INITIAL_STATE;
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }



  renderIt(item, index, objeto, tipo, modal) {

    this.state.item = item;

      return (
      <TouchableWithoutFeedback
      onPress={() => { this.props.cleanFunc(); this.cargarPaquete(item); }}
      >
        <View>
        <CardSection>
          <Text> {item.nombre} </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  cargarPaquete(item) {
    if (item.tipo === 'paquete') {
    const incluye = [];
    const Inventario = Parse.Object.extend('Inventario');
    item.incluye.forEach((producto) => {
      const query = new Parse.Query(Inventario);
      query.get(producto.objectId.toString())
      .then((resultado) => {
        producto.stock = resultado.get('stock');
        incluye.push(producto)
        console.log('incluye', incluye)
        item.incluye = incluye;
      })
    })
    console.log('item', item)
    this.setState({ paquete: item })
  }
  }


  buscarProducto() {
      return (
        <View style={{ padding: 15 }}>
        <Button onPress={() => this.setState({ buscarProducto: true })}>
        Buscar paquete
        </Button>
        <Modal
        visible={this.state.buscarProducto}
        animationType='slide'
        transparent={false}
        >
        <View style={{ flex: 1 }}>
          <CardSection>
            <SearchBar
            autoCapitalize={'characters'}
              round
              lightTheme
              containerStyle={{ flex: 1, backgroundColor: 'white' }}
              searchIcon={
                <Icon
                  name='camera'
                  type='material-community'
                  onPress={this.navigateToScreen('BarCodeScanner', { updateCode: false }, 'buscarProducto')}
                />}
              onChangeText={text => this.props.queryFunc({
                type: 'startsWith',
                object: 'Inventario',
                variable: 'nombre',
                text })}
              onClear={() => this.props.cleanFunc()}
              placeholder="Nombre"
              value={this.props.text}
            />
            </CardSection>
            <ScrollView>
          <CardSection>
            {this.listaProducto()}
          </CardSection>
                  </ScrollView>
        </View>
        <CardSection>
        <Button
        onPress={() => {
        this.props.cleanFunc(); this.props.navigation.navigate('AgregarProducto'); this.setState({ buscarProducto: false }) }}
        >
        Agregar producto
        </Button>
        <Button
        onPress={() => {
        this.props.cleanFunc(); this.setState({ buscarProducto: false });
}}
        >
        Cancelar
        </Button>
        </CardSection>
        </Modal>
        </View>
      );
  }

  listaProducto() {
    let dataList = null;

    if (Array.isArray(this.props.Inventario)) {
      dataList = this.props.Inventario;
    } else {
      dataList = [this.props.Inventario];
    }

    if (this.props.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
        );
      } else if (this.props.Inventario === 'Failed') {
      return (
        <Text>
        Sin resultados
        </Text>
      );
    } else if (this.props.Inventario !== '') {
    return (
      <FlatList
        data={dataList}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        keyExtractor={item => item.objectId}
        renderItem={({ item, index }) => (
          this.renderIt(item, index, 'Productos', 'Lista', 'buscarProducto')
        )}
        style={{ marginTop: 10 }}
      />
    );
  }
  }

  listaPaquete() {
    if (this.state.paquete) {
        const paquete = this.state.paquete
    const dataList = this.state.paquete.incluye;

    return (
      <View style={{ flex: 1 }}>
      <Text
      style={{ flex: 1 }}>
      { paquete.nombre}
      </Text>
      <Input
      style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }}
      keyboardType="numeric"
      placeholder="10"
      selectTextOnFocus
      value={this.state.paquete.cantidad}
      onChangeText={value =>
        this.setState({
          paquete: update(this.state.paquete, { cantidad: { $set: value } })
        })}
      />
      <View style={{ justifyContent: 'space-around' }}>
        <CardSection>
          <View style={{ flex: 1 }}>
            <Text style={[styles.emphasisTextStyle, { textAlign: 'left', fontSize: 16 }]}>
              Descripción
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.emphasisTextStyle, { textAlign: 'center', fontSize: 16 }]}
            >
              Cantidad
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.emphasisTextStyle, { textAlign: 'center', fontSize: 16 }]}
            >
              Agregado
            </Text>
          </View>
          </CardSection>
          <View style={{ flex: 1, padding: 15, paddingEnd: 90 }}>
      <FlatList
        data={dataList}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        keyExtractor={item => item.objectId}
        renderItem={({ item, index }) => this.renderProductos(item, index)}
        style={{ marginTop: 10 }}
      />
      </View>
      </View>
      </View>
    );
  }
  }

  renderProductos(item, index) {
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'baseline' }}>
        <CardSection>
        <Text>
        {item.nombre}
        </Text>
        </CardSection>
        <CardSection>
        <Text>
        {item.cantidad}
        </Text>
        </CardSection>
        <CardSection>
        <CheckBox
          size={38}
            checked={this.state.paquete.incluye[index].agregado }
            onPress={() => {
              this.setState({
              paquete: update(this.state.paquete, { incluye: { [index]: { agregado: { $set: !this.state.paquete.incluye[index].agregado } } } })
            })} }
              />
              </CardSection>
            </View>
  );
  }

  onCameraPress(modal) {
		this.props.navigation.navigate('BarCodeScanner', { updateCode: true });
    this.setState({ [modal]: false });
	}


  ingresarPedido() {
    let failed = 0;
const { paquete } = this.state;
const objects = [];
const Inventario = Parse.Object.extend('Inventario');
console.log('PAQUETE', paquete)
paquete.incluye.forEach((product) => {
  const producto = new Inventario();
  console.log('PRODUCT', product)
  if (!product.agregado){ failed += 1; } else {
  product.stock = parseInt(product.stock, 10) - (parseInt(product.cantidad, 10) * parseInt(paquete.cantidad, 10));
  producto.set('objectId', product.objectId);
  producto.set('stock', parseInt(product.stock, 10));
  objects.push(producto);
}
});

this.setState(INITIAL_STATE);

  if (!failed) {
    const producto = new Inventario();
    paquete.stock = parseInt(paquete.stock, 10) + parseInt(paquete.cantidad, 10);
    producto.set('objectId', paquete.objectId)
    producto.set('stock', parseInt(paquete.stock, 10))
    objects.push(producto);
    Parse.Object.saveAll(objects).then((response) => {
      failed = 0;
      console.log('RESPONSE', response)
      response.forEach((result) => {
        console.log('RESULT', result)
      })
      Alert.alert(
        'Listo',
        'Paquete registrado correctamente',
        [{ text: 'Ok', style: 'cancel' }]
      );
    })
} else {
  Alert.alert(
    'Error',
    'Te faltan productos en el paquete',
    [{ text: 'Ok', style: 'cancel' }]
  );
}
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
      <View>
        <ScrollView>
        {this.listaPaquete()}
        {this.buscarProducto()}
        <CardSection>
      <Button onPress={() => this.ingresarPedido(false)}>Registrar paquetes</Button>
      </CardSection>
              </ScrollView>
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

const mapStateToProps = ({ query, barCodeReader }) => {
const { barCode, barType } = barCodeReader;
const { text, Proveedor, loading, Inventario, IngresoProducto } = query;
return { text, Proveedor, loading, Inventario, barCode, barType, IngresoProducto };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, cleanBarCode })(ArmarPaquetes);
