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
import { SearchBar, Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { CardSection, Button, Input, Card } from '../common';
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
  tipoPedido: 'Compra',
  numFactura: '',
  detalleProducto: false,
  item: '',
  index: '',
  barCode: '',
  barType: '',
  pedidoID: '',
  cargarPedido: false,
  totalNeto: 0,
  totalBruto: 0,
  iva: 0
}

class IngresarPedido extends Component {

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
      onPress={() => { this.props.cleanFunc(); this.updateElement(item, index, objeto, tipo, modal); }}
      >
        <View>
        <CardSection>
          <Text> {item.nombre} </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  updateElement(item, index, objeto, tipo, modal) {
    if (objeto === 'Productos') {
      item.codigoProveedor = item.codigoProveedor;
      item.codigo = item.codigo;
      item.nombre = item.nombre;
      item.laboratorio = item.laboratorio;
      item.precioLista = parseFloat(item.precioLista);
      item.iva = parseInt(item.iva, 10);
      item.descuento = parseInt(item.descuentoProveedor, 10);
      item.porcentajeUtilidad = parseInt(item.porcentajeUtilidad, 10);
      item.costoUMC = parseFloat(item.costoUMC);
      item.cantidadUMV = parseInt(item.cantidadUMV, 10);
      item.costoUMV = parseFloat(item.costoUMV);
      item.precioPublico = parseFloat(item.precioPublico);
      item.precioNeto = parseFloat(item.precioNeto);
      item.precioSeguro = parseFloat(item.precioSeguro);
      item.stockMinimo = parseInt(item.stockMinimo, 10);
      item.ingresoUMC = 1;

      item.precioLista = item.precioLista.toFixed(2);
      item.costoUMC = item.costoUMC.toFixed(2);
      item.costoUMV = item.costoUMV.toFixed(2);
      item.precioPublico = item.precioPublico.toFixed(2);
      item.precioNeto = item.precioNeto.toFixed(2);
      item.precioSeguro = item.precioSeguro.toFixed(2);

    }
    if (tipo === 'Lista') {
      let dataList = null;

      if (Array.isArray(this.state[objeto])) {
        dataList = this.state[objeto];
      } else {
        dataList = [this.state[objeto]];
      }
      dataList.push(item);
       index = dataList.indexOf(null);
        if (index > -1) {
          dataList.splice(index, 1);
        }

        dataList = dataList.filter((thing, ind, self) =>
          ind === self.findIndex((t) => (
            t.objectId === thing.objectId
          ))
        );

      this.setState({ [objeto]: dataList, [modal]: false });
    } else {
    this.props.cleanFunc();
    this.setState({ [objeto]: item, [modal]: false });
    }
  }

  nombreProveedor() {
    return (this.state.Proveedor.nombre ? this.state.Proveedor.nombre : 'Seleccionar proveedor');
  }

  buscarProveedor() {
    return (
      <View>
      <Text style={{ fontSize: 30, fontWeight: 'bold', padding: 5, paddingBottom: 0 }}>
      Proveedor
      </Text>
      <Text style={{ padding: 5 }} onPress={() => this.setState({ buscarProveedor: true })}>
      {this.nombreProveedor()}
      </Text>
      <Modal
      visible={this.state.buscarProveedor}
      animationType='slide'
      transparent={false}
      >
      <ScrollView>
        <CardSection>
          <SearchBar
            round
            lightTheme
            searchIcon={{ size: 24 }}
            containerStyle={{ flex: 1, backgroundColor: 'white' }}
            imputStyle={{ backgroundColor: 'white', marginTop: 0, marginBottom: 0 }}
            onChangeText={text => this.props.queryFunc({
              type: 'startsWith',
              object: 'Proveedor',
              variable: 'nombre',
              text })}
            onClear={() => { this.props.cleanFunc(); }}
            placeholder="Ingresa el nombre de la empresa..."
            value={this.props.text}
          />
          </CardSection>
          <ScrollView>
          <CardSection>
          {this.listaProveedores()}
          </CardSection>
          </ScrollView>
          <CardSection>
          <Button
          onPress={() => { this.props.cleanFunc(); this.setState({ buscarProveedor: false }); }}
          >
          Cancelar
          </Button>
          </CardSection>
          </ScrollView>
          </Modal>
          </View>
    );
  }

  buscarProducto() {
      return (
        <View style={{ padding: 15 }}>
        <Button onPress={() => this.setState({ buscarProducto: true })}>
        Añadir producto
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

  listaProveedores() {
    let dataList = null;

    if (Array.isArray(this.props.Proveedor)) {
      dataList = this.props.Proveedor;
    } else {
      dataList = [this.props.Proveedor];
    }

    if (this.props.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
        );
      } else if (this.props.Proveedor === 'Failed') {
      return (
        <Text>
        Sin resultados
        </Text>
      );
    } else if (this.props.Proveedor !== '') {
    return (
      <FlatList
        data={dataList}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        keyExtractor={item => item.objectId}
        renderItem={({ item, index }) => (
          this.renderIt(item, index, 'Proveedor', null, 'buscarProveedor')
        )}
        style={{ marginTop: 10 }}
      />
    );
  }
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

  listaPedido() {
    let dataList = null;

    if (Array.isArray(this.state.Productos)) {
      dataList = this.state.Productos;
    } else {
      dataList = [this.state.Productos];
    }

    if (this.state.Productos) {
    if (this.state.Productos.length > 0) {
    return (
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
              style={[styles.emphasisTextStyle, { textAlign: 'right', fontSize: 16 }]}
            >
              Costo
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
    );
  }
  }
  }

  renderProductos(item, index) {
    const { barCode } = this.props
    const leftOpenValue = Dimensions.get('window').width;
    if (barCode !== '') {
      this.setState({
        Productos: update(this.state.Productos, { [index]: { codigo: { $set: barCode } } })
      })
      this.props.cleanBarCode();
    }

    const item2 = this.state.Productos[index];

    console.log('Producto', this.state.Productos[index])
    return (
    <SwipeView
      onSwipedRight={this.navigateToScreen('InventoryDetail',  item2 )}
      leftOpenValue={leftOpenValue}
      onSwipedLeft={() => this.onSwipedLeft(index)}
      swipeDuration={400}
      renderVisibleContent={() =>
        <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'baseline' }}>
        <Text
        style={{ flex: 1 }}>
        { item.nombre}
        </Text>
        <Input
        style={{ flex: 1, textAlign: 'center', textAlignVertical: 'center' }}
        keyboardType="numeric"
        placeholder="10"
        selectTextOnFocus
        value={this.state.Productos[index].ingresoUMC.toString()}
        onChangeText={value =>
          this.setState({
            Productos: update(this.state.Productos, { [index]: { ingresoUMC: { $set: value } } })
          })}
          onEndEditing={() => this.actualizarPedido()}
        />
        <Text>
        {this.state.Productos[index].umc} {'con'} {this.state.Productos[index].cantidadUMV} {this.state.Productos[index].umv}
        </Text>
          <Input
          selectTextOnFocus
          style={{ flex: 1 }}
          keyboardType="numeric"
          placeholder="10"
          value={this.state.Productos[index].costoUMC.toString()}
          onChangeText={value =>
            this.setState({
              Productos: update(this.state.Productos, { [index]: { costoUMC: { $set: value } } })
            })}
            onEndEditing={() => this.actualizarCosto(index)}
            />
            </View>
            </TouchableWithoutFeedback>
            </View>
        }
    />
  );
  }

  onCameraPress(modal) {
		this.props.navigation.navigate('BarCodeScanner', { updateCode: true });
    this.setState({ [modal]: false });
	}

  modal() {
    const { item, index } = this.state;
    if (this.state.Productos && this.state.detalleProducto) {
    return (
    <Modal
      style={{ flex: 1, backgroundColor: '#ffffff' }}
      isVisible={this.state.detalleProducto}
      animationType='slide'
      transparent={false}
    >
      <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView style={{ flex: 1, paddingEnd: 95 }}>
      <Input
      selectTextOnFocus
      value={this.state.Productos[index].nombre.toString()}
      onChangeText={value =>
        this.setState({
          Productos: update(this.state.Productos, { [index]: { nombre: { $set: value } } })
        })}
      />
      <View style={{ flexDirection: 'column' }}>
      <Input
      selectTextOnFocus
      label={'Precio de lista'}
        keyboardType="numeric"
        placeholder="10"
        value={this.state.Productos[index].precioLista.toString()}
        onChangeText={value =>
          this.setState({
            Productos: update(this.state.Productos, { [index]: { precioLista: { $set: value } } })
          })}
        onEndEditing={() => this.actualizarCosto(index)}
      />
      <Input
      selectTextOnFocus
      label={'Descuento'}
        keyboardType="numeric"
        placeholder="10"
        value={this.state.Productos[index].descuentoProveedor.toString()}
        onChangeText={value =>
          this.setState({
            Productos: update(this.state.Productos, { [index]: { descuentoProveedor: { $set: value } } })
          })}
        onEndEditing={() => this.actualizarCosto(index)}
      />
      </View>
      <Input
      selectTextOnFocus
      label={'Costo con descuento'}
        keyboardType="numeric"
        placeholder="10"
        value={this.state.Productos[index].costoUMC.toString()}
        onChangeText={value =>
          this.setState({
            Productos: update(this.state.Productos, { [index]: { costoUMC: { $set: value } } })
          })}
        onEndEditing={() => this.actualizarCosto(index)}
      />
      <Input
      selectTextOnFocus
      label={'Presentación de compra'}
        keyboardType="numeric"
        placeholder="10"
        value={this.state.Productos[index].umc.toString()}
        onChangeText={value =>
          this.setState({
            Productos: update(this.state.Productos, { [index]: { umc: { $set: value } } })
          })}
      />
      <View>
      <Input
      selectTextOnFocus
      label={'Prentación de venta'}
        keyboardType="numeric"
        placeholder="10"
        value={this.state.Productos[index].umv.toString()}
        onChangeText={value =>
          this.setState({
            Productos: update(this.state.Productos, { [index]: { umv: { $set: value } } })
          })}
      />
      <Input
      selectTextOnFocus
      label={'Contenido por empaque'}
        keyboardType="numeric"
        placeholder="10"
        value={this.state.Productos[index].cantidadUMV.toString()}
        onChangeText={value =>
          this.setState({
            Productos: update(this.state.Productos, { [index]: { cantidadUMV: { $set: value } } })
          })}
      />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Input
        selectTextOnFocus
          label="Código de barras"
          placeholder="0602760006362"
          value={this.state.Productos[index].codigo}
          onChangeText={value =>
            this.setState({
              Productos: update(this.state.Productos, { [index]: { codigo: { $set: value } } })
            })}
        />
        <Icon
          name='camera'
          type='material-community'
          onPress={this.navigateToScreen('BarCodeScanner', { updateCode: false }, 'detalleProducto')}
        />
        </View>
    <Input
    selectTextOnFocus
    label={'Costo por pieza'}
      keyboardType="numeric"
      editable={false}
      placeholder="10"
      value={this.state.Productos[index].costoUMV.toString()}
      onChangeText={value =>
        this.setState({
          Productos: update(this.state.Productos, { [index]: { costoUMV: { $set: value } } })
        })}
    />
    <Input
    selectTextOnFocus
    label={'Porcentaje de utilidad'}
      keyboardType="numeric"
      placeholder="10"
      value={this.state.Productos[index].porcentajeUtilidad.toString()}
      onChangeText={value =>
        this.setState({
          Productos: update(this.state.Productos, { [index]: { porcentajeUtilidad: { $set: value } } })
        })}
        onEndEditing={() => this.actualizarCosto(index)}
    />
    <Input
    selectTextOnFocus
      placeholder="10"
        keyboardType="numeric"
      label={'Precio público'}
      value={this.state.Productos[index].precioPublico.toString()}
      onChangeText={value =>
        this.setState({
          Productos: update(this.state.Productos, { [index]: { precioPublico: { $set: value } } })
        })}
    />
    <Input
    selectTextOnFocus
    label={'Precio neto'}
      keyboardType="numeric"
      editable={false}
      value={this.state.Productos[index].precioNeto.toString()}
    />
    <Input
    selectTextOnFocus
    label={'Precio aseguradora'}
      keyboardType="numeric"
      placeholder="10"
      value={this.state.Productos[index].precioSeguro.toString()}
      onChangeText={value =>
        this.setState({
          Productos: update(this.state.Productos, { [index]: { precioSeguro: { $set: value } } })
        })}
    />
    <Button onPress={() => this.setState({ detalleProducto: false })}>
    Listo
    </Button>
    </KeyboardAwareScrollView>
    </View>
    </Modal>
  );
}
  }

  onSwipedLeft(index) {
      Alert.alert(
        '¿Desea eliminar este producto? ',
        '',
        [
          { text: 'Si', onPress: () => this.onAlertAccept(index) },
          { text: 'No', style: 'cancel' },
        ],
        { cancelable: false }
      );
    }

    onAlertAccept(index) {
      let array = [];

      if (Array.isArray(this.state.Productos)) {
        array = this.state.Productos;
      } else {
        array = [this.state.Productos];
      }
    array.splice(index);
    this.setState({ Productos: array });
}


    showModal(item, index) {
      console.log('Modal')
      this.setState({ detalleProducto: true, item, index })
    }

  actualizarCosto(index) {

    this.calcularTotales();

    const { Productos } = this.state;
    console.log(Productos);
    const producto = Productos[index];

    producto.codigoProveedor = producto.codigoProveedor;
    producto.codigo = producto.codigo;
    producto.stockMinimo = parseInt(producto.stockMinimo, 10);
    producto.nombre = producto.nombre;
    producto.laboratorio = producto.laboratorio;
    if (producto.tipo === 'insumo') producto.iva = 16
    if (producto.tipo === 'medicamento') producto.iva = 0
    producto.costoUMC = parseFloat(producto.costoUMC);
    producto.cantidadUMV = parseInt(producto.cantidadUMV, 10);
    producto.costoUMV = producto.costoUMC / producto.cantidadUMV;

    if(producto.precioUMC > 0) {
      producto.porcentajeUtilidad = (producto.precioUMC/producto.costoUMC - 1) * 100;
      producto.precioPublico = producto.precioUMC / producto.cantidadUMV;
      producto.precioNeto = producto.precioPublico + (producto.precioPublico * (producto.iva / 100));
      producto.precioSeguro = producto.precioPublico * 1.35;

  } else {

    if (producto.costoUMV < 51) producto.porcentajeUtilidad = 200;
    else if (producto.costoUMV < 101) producto.porcentajeUtilidad = 100;
    else if(producto.costoUMV < 201) producto.porcentajeUtilidad = 80;
    else if (producto.costoUMV < 301) producto.porcentajeUtilidad = 60;
    else if (producto.costoUMV < 501) producto.porcentajeUtilidad = 50;
    else if (producto.costoUMV < 1001) producto.porcentajeUtilidad = 35;
    else if (producto.costoUMV < 2501) producto.porcentajeUtilidad = 25;
    else if (producto.costoUMV < 5001) producto.porcentajeUtilidad = 20;
    else if (producto.costoUMV < 10001) producto.porcentajeUtilidad = 15;
    else if (producto.costoUMV < 25001) producto.porcentajeUtilidad = 10;
    else if (producto.costoUMV < 50001)  producto.porcentajeUtilidad = 5;

    producto.porcentajeUtilidad = producto.porcentajeUtilidad;
    producto.precioPublico = producto.costoUMV + (producto.costoUMV * (producto.porcentajeUtilidad / 100));
    producto.precioNeto = producto.precioPublico + (producto.precioPublico * (producto.iva / 100));
    producto.precioSeguro = producto.precioPublico * 1.35;
  }

    producto.costoUMC = producto.costoUMC.toFixed(2);
    producto.costoUMV = producto.costoUMV.toFixed(2);
    producto.cantidadUMV = producto.cantidadUMV.toString();
    producto.iva = producto.iva.toString();
    producto.porcentajeUtilidad = producto.porcentajeUtilidad.toFixed(2);
    producto.cantidadUMV = producto.cantidadUMV.toString();
    producto.precioPublico = producto.precioPublico.toFixed(2);
    producto.precioNeto = producto.precioNeto.toFixed(2);
    producto.precioSeguro = producto.precioSeguro.toFixed(2);

    producto.costoUMV = producto.costoUMV;

    Productos[index] = producto;
    this.state.Productos = Productos;
    this.setState({ Productos });
  }

  actualizarPedido() {
    const { Productos, tipoPedido, Proveedor, numFactura } = this.state;

    const IngresoProducto = Parse.Object.extend('IngresoProducto');
    const ingresoProducto = new IngresoProducto();
    if (this.state.pedidoID !== '') ingresoProducto.set('objectId', this.state.pedidoID.toString());
    ingresoProducto.set('pendiente', true);
    ingresoProducto.set('proveedor', Proveedor.nombre);
    ingresoProducto.set('numFactura', numFactura);
    ingresoProducto.set('productos', Productos);
    ingresoProducto.set('tipoPedido', tipoPedido);

    ingresoProducto.save().then((response) => {
      this.state.pedidoID = response.id.toString();
      console.log(this.state.pedidoID);
    });
}

  ingresarPedido() {
    let success = true;

    const Inventario = Parse.Object.extend('Inventario');
    const { Productos, tipoPedido, Proveedor, totalBruto, iva, totalNeto, numFactura } = this.state;
    const objects = [];
    if (tipoPedido && numFactura && Proveedor && Productos) {
      Productos.forEach((producto) => {
      const nuevoStock = parseInt(producto.stock, 10) + (parseInt(producto.ingresoUMC, 10) * parseInt(producto.cantidadUMV, 10));
      const parseObject = new Inventario();
      parseObject.set('objectId', producto.objectId);
      parseObject.set('nombre', producto.nombre);
      parseObject.set('cantidadUMV', parseInt(producto.cantidadUMV, 10));
      parseObject.set('codigo', producto.codigo);
      parseObject.set('umc', producto.umc);
      parseObject.set('umv', producto.umv);
      parseObject.set('iva', parseInt(producto.iva, 10));
      parseObject.set('descuentoProveedor', parseInt(producto.descuentoProveedor, 10));
      parseObject.set('laboratorio', producto.laboratorio);
      parseObject.set('tipo', producto.tipo);
      parseObject.set('proveedor', producto.proveedor);
      parseObject.set('stock', parseInt(nuevoStock, 10));
      parseObject.set('stockMinimo', parseInt(producto.stockMinimo, 10));
      parseObject.set('precioLista', parseFloat(producto.precioLista));
      parseObject.set('costoUMC', parseFloat(producto.costoUMC));
      parseObject.set('costoUMV', parseFloat(producto.costoUMV));
      parseObject.set('precioSeguro', parseFloat(producto.precioSeguro));
      parseObject.set('porcentajeUtilidad', parseInt((producto.porcentajeUtilidad), 10));
      parseObject.set('precioNeto', parseFloat(producto.precioNeto));
      parseObject.set('precioPublico', parseFloat(producto.precioPublico));
      parseObject.set('codigoProveedor', producto.codigoProveedor);

      objects.push(parseObject);
      }
    );

    const pointerProveedor = {
    __type: 'Pointer',
    className: 'Proveedor',
    objectId: Proveedor.objectId.toString()
    };

  const IngresoProducto = Parse.Object.extend('IngresoProducto');
  const ingresoProducto = new IngresoProducto();
  if (this.state.pedidoID !== '') ingresoProducto.set('objectId', this.state.pedidoID.toString());
  ingresoProducto.set('pendiente', true);
  ingresoProducto.set('proveedor', Proveedor.nombre);
  ingresoProducto.set('numFactura', numFactura);
  ingresoProducto.set('productos', Productos);
  objects.push(ingresoProducto);

    Parse.Object.saveAll(objects).then((response) => {

      if (tipoPedido === 'Compra') {
        success = false;
      const Pagos = Parse.Object.extend('Pagos');
      const pagos = new Pagos();

      const pointerIngreso = {
      __type: 'Pointer',
      className: 'IngresoProducto',
      objectId: response[1].id.toString()
      };

      pagos.set('totalBruto', parseFloat(totalBruto));
      pagos.set('iva', parseFloat(iva));
      pagos.set('totalNeto', parseFloat(totalNeto));
      pagos.set('proveedor', pointerProveedor);
      pagos.set('ingresoProducto', pointerIngreso);
      pagos.set('estado', 'Pendiente');
      pagos.save().then(() => {
      success = true;
    });
    }
  });
  if (success) {
    Alert.alert(
      'Listo',
      'Ingreso registrado correctamente',
      [{ text: 'Ok', style: 'cancel' }]
    );
    this.setState(INITIAL_STATE);
  }
} else {
  Alert.alert(
    'Error',
    'Te faltan datos sobre el pedido',
    [{ text: 'Ok', style: 'cancel' }]
  );
}
}

  infoPedido() {
    return (
      <View>
              {this.infoCompra()}
      <Text style={{ padding: 5, paddingBottom: 0, fontSize: 30, fontWeight: 'bold' }}>
      Productos
      </Text>
      </View>
    );
  }

  calcularTotales() {
    if (this.state.Productos && this.state.tipoPedido === 'Compra') {
    const { Productos } = this.state;
    let { totalBruto } = this.state || 0;
    let { iva } = this.state || 0;
    let { totalNeto } = this.state || 0;

    Productos.forEach((element) => {
      totalBruto += parseFloat(element.costoUMC) * (parseFloat(element.ingresoUMC));
      iva += (parseFloat(element.costoUMC) * (parseFloat(element.iva) / 100)) * (parseFloat(element.ingresoUMC));
      totalNeto += totalBruto + iva;
      totalBruto = parseFloat(totalBruto);
      iva = parseFloat(iva);
      totalNeto = parseFloat(totalNeto);
    });
    this.state.totalBruto = totalBruto.toFixed(2);
    this.state.iva = iva.toFixed(2);
    this.state.totalNeto = totalNeto.toFixed(2);
  };
}


  infoCompra() {
    this.calcularTotales();
    if (this.state.tipoPedido === 'Compra') {
      return (
        <Card>
        <CardSection>
        <Input
          label="Número de factura"
          placeholder="F0830"
          value={this.state.numFactura}
          onChangeText={value => this.setState({ numFactura: value })}
        />
        {this.buscarIngreso()}
        </CardSection>
        <CardSection>
        <Text>
          {'Total de compra: '} {this.state.totalBruto.toString()}
        </Text>
        </CardSection>
        <CardSection>
        <Text>
          {'Total de IVA: '} {this.state.iva.toString()}
        </Text>
        </CardSection>
        <CardSection>
        <Text>
          {'Total con IVA: '} {this.state.totalNeto.toString()}
        </Text>
        </CardSection>
        </Card>
      );
    }

    if (this.state.tipoPedido === 'Consigna') {
      return (
        <CardSection>
        <Input
          label="Número de recibo"
          placeholder="R0830"
          value={this.state.numFactura}
          onChangeText={value => this.setState({ numFactura: value })}
        />
        {this.buscarIngreso()}
        </CardSection>
      );
    }
  }

  buscarIngreso() {
    if(this.props.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
        );
    } else {
      return(
        <Button onPress={() => this.queryPedido()}>
        Buscar ingreso
        </Button>
      );
    }
  }

  queryPedido() {
    this.state.cargarPedido = false;
    if (this.state.numFactura) {
    this.props.queryFunc({
      type: 'equalTo',
      object: 'IngresoProducto',
      variable: 'numFactura',
      text: this.state.numFactura.toString() })
    }
  }

  addItemCamera() {
    if (this.props.barCode !== '' && this.props.Inventario === '') {
      this.props.queryFunc({
        type: 'equalTo',
        object: 'Inventario',
        variable: 'codigo',
        text: this.props.barCode });
    }
    const item = this.props.Inventario
    const al = JSON.stringify(item)
    if (this.props.barCode !== '' && this.props.Inventario !== '') {
      Alert.alert(
        '',
        `${al}`,
        [
          { text: 'No', style: 'cancel' },
        ],
        { cancelable: false }
      );

      item.codigoProveedor = item.codigoProveedor;
      item.codigo = item.codigo;
      item.nombre = item.nombre;
      item.laboratorio = item.laboratorio;
      item.precioLista = parseFloat(item.precioLista);
      item.iva = parseInt(item.iva, 10);
      item.descuento = parseInt(item.descuentoProveedor, 10);
      item.porcentajeUtilidad = parseInt(item.porcentajeUtilidad, 10);
      item.costoUMC = parseFloat(item.costoUMC);
      item.cantidadUMV = parseInt(item.cantidadUMV, 10);
      item.costoUMV = parseFloat(item.costoUMV);
      item.precioPublico = parseFloat(item.precioPublico);
      item.precioNeto = parseFloat(item.precioNeto);
      item.precioSeguro = parseFloat(item.precioSeguro);
      item.stockMinimo = parseInt(item.stockMinimo, 10);
      item.ingresoUMC = 1;

      item.precioLista = item.precioLista.toFixed(2);
      item.costoUMC = item.costoUMC.toFixed(2);
      item.costoUMV = item.costoUMV.toFixed(2);
      item.precioPublico = item.precioPublico.toFixed(2);
      item.precioNeto = item.precioNeto.toFixed(2);
      item.precioSeguro = item.precioSeguro.toFixed(2);
      this.props.cleanBarCode();

      let dataList = null;

      if (Array.isArray(this.state.Productos)) {
        dataList = this.state.Productos;
      } else {
        dataList = [this.state.Productos];
      }
      dataList.push(item);

      this.setState({ Productos: dataList })
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
    if (this.props.IngresoProducto && !this.state.cargarPedido) {
      if (this.props.IngresoProducto !== 'Failed') {
      const { productos, objectId } = this.props.IngresoProducto;
      this.state.cargarPedido = true;
    this.setState({ Productos: productos, pedidoID: objectId });
  } else if (this.props.IngresoProducto === 'Failed') {
    this.state.cargarPedido = true;
    Alert.alert(
      '',
      'Ningún ingreso encontrado',
      [
        { text: 'Ok', style: 'cancel' },
      ]
    );
  }
  }

    return (
      <View>
        <ScrollView>
        {this.buscarProveedor()}
        {this.infoPedido()}
        {this.listaPedido()}
        {this.buscarProducto()}
        {this.modal()}
        <CardSection>
      <Button onPress={() => this.ingresarPedido(false)}>Ingresar pedido</Button>
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
console.log(query);
return { text, Proveedor, loading, Inventario, barCode, barType, IngresoProducto };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, cleanBarCode })(IngresarPedido);
