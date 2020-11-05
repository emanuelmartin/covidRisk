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
import { SearchBar, Icon, CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Card, CardSection, Button, Input } from '../common';
import { queryFunc, cleanFunc, multiWrite, cleanVariable } from '../../actions';
import update from 'react-addons-update';
import { Dropdown } from 'react-native-material-dropdown';

const INITIAL_STATE = {
  searchItem: true,
  IngresoProducto: { names: ''},
  Herramienta: { name: ''},
  Productos: new Array(),
  dataList: null,
  buscarIngresoProducto: true,
  buscarHerramienta: false };

class SurtirPedido extends Component {

  static navigationOptions = {
    title: 'Pagos pendientes',
  };

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentWillUnmount() {
    this.props.cleanFunc();
  }

  componentWillMount() {
    this.props.queryFunc({
      type: 'equalTo',
      object: 'IngresoProducto',
      variable: 'pendiente',
      text: true,
      include: ['autor', 'proveedor']
    });
  }

  renderIt(item, index, objeto, tipo, modal) {
      const fech = new Date(item.createdAt);
      const fecha = fech.toLocaleDateString('dd/MM/yyyy');
      const hora = fech.toLocaleTimeString();
<<<<<<< HEAD

=======
      if(item) {
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
      return (
      <TouchableWithoutFeedback
      onPress={() => { this.props.cleanFunc(); this.updateElement(item, index, objeto, tipo, modal); }}
      >
      <View>
      <Card>
      <CardSection>
          <Text>Proveedor: {item.proveedor.nombre}</Text>
          </CardSection>
          <CardSection>
              <Text>Número de factura: {item.numFactura}</Text>
              </CardSection>
          <CardSection>
          <Text>Fecha de ingreso: {fecha} {hora}</Text>
          </CardSection>
          <CardSection>
          <Text>Ingresado por: {item.autor.names} {item.autor.lastName1} {item.autor.lastName2}</Text>
          </CardSection>
      </Card>
      </View>
      </TouchableWithoutFeedback>
    );
  }
<<<<<<< HEAD
=======
}
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea

  updateElement(item, index, objeto, tipo, modal) {
    if (tipo === 'Lista') {
      let dataList = null;

      if (Array.isArray(this.state[objeto])) {
        dataList = this.state[objeto];
      } else {
        dataList = [this.state[objeto]];
      }
      dataList.push(item);
      const index = dataList.indexOf(null);
        if (index > -1) {
          dataList.splice(index, 1);
        }



      this.setState({ [objeto]: dataList, [modal]: false });
    } else {
    this.props.cleanFunc();
    this.setState({ [objeto]: item, [modal]: false, proveedor: item.proveedor, ubicacion: item.ubicacion, autor: item.autor  });
    }
  }

  nombreIngresoProducto() {
    if (this.state.IngresoProducto.objectId) {
      const { IngresoProducto, proveedor, ubicacion, autor } = this.state;
      const fech = new Date(IngresoProducto.createdAt);
      const fecha = fech.toLocaleDateString('dd/MM/yyyy');
      const hora = fech.toLocaleTimeString();
      return(
        <Card style={{ flex: 1}}>
        <CardSection>
        <Text>
        Proveedor: {proveedor.nombre}
        </Text>
        </CardSection>
        <CardSection>
            <Text>Número de factura: {IngresoProducto.numFactura}</Text>
            </CardSection>
        <CardSection>
        <Text>
        Fecha de ingreso: {fecha} {hora}
        </Text>
        </CardSection>
        <CardSection>
        <Text>
        Ingresado por: {autor.names} {autor.lastName1} {autor.lastName2}
        </Text>
        </CardSection>
        </Card>
       )
    } else {
      return(
        <Card>
        <CardSection>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
     Seleccionar pedido
     </Text>
     </CardSection>
     </Card>
   );
  }
}

  buscarIngresoProducto() {
    return (
      <View style={{ paddingLeft: 10, paddingTop: 30, paddingBottom: 0}}>
      <TouchableWithoutFeedback onPress={() => { this.setState({ buscarIngresoProducto: true }); }}>
      <View>
      {this.nombreIngresoProducto()}
      </View>
      </TouchableWithoutFeedback>
      <Modal
      visible={this.state.buscarIngresoProducto}
      animationType='slide'
      transparent={false}
      >
      <View style={{ flex: 1 }}>
      <CardSection>
      <Text style={{ fontSize: 30,
    fontWeight: 'bold' }}>
    Buscar pedido
    </Text>
    </CardSection>
          <ScrollView>
          <CardSection>
          {this.listaPedidos()}
          </CardSection>
          </ScrollView>
          <CardSection>
          <Button onPress={() => { this.props.cleanFunc(); this.setState({ buscarIngresoProducto: false }); }}>
          Cancelar
          </Button>
          </CardSection>
          </View>
          </Modal>
          </View>
    );
  }


  listaPedidos() {
    let dataList = null;
    if(this.props.IngresoProducto) {
    if (Array.isArray(this.props.IngresoProducto)) {
      dataList = this.props.IngresoProducto;
    } else {
      dataList = [this.props.IngresoProducto];
    }
console.log('List', dataList)
    if (this.props.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
        );
      } else if (this.props.IngresoProducto === 'Failed') {
      return (
        <Text>
        Sin resultados
        </Text>
      );
    } else if (this.props.IngresoProducto !== '') {
    return (
      <View>
      <Card>
      <FlatList
        data={dataList}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item, index }) => (
          this.renderIt(item, index, 'IngresoProducto', null, 'buscarIngresoProducto')
        )}
        style={{ marginTop: 10 }}
        keyExtractor={item=>item.objectId}
        />
        </Card>
        </View>
    );
  }
}
  }


  listaProductos() {
    if(this.props.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    let { dataList } = this.state;
    const { IngresoProducto } = this.state;

    if (this.state.IngresoProducto.objectId) {
            this.state.Productos = this.state.IngresoProducto.productos;

          dataList = this.state.Productos;
      return (
      <View style={{ paddingLeft: 10, paddingTop: 30, paddingBottom: 0}}>
      <Text style={{ fontSize: 30,
      fontWeight: 'bold' }}>
      Productos
      </Text>
      <Card>
      <CardSection>
<<<<<<< HEAD
      <Text> Total sin IVA: {IngresoProducto.subtotal}</Text>
=======
      <Text> Total sin IVA: {IngresoProducto.totalBruto}</Text>
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
      </CardSection>
      <CardSection>
      <Text> IVA: {IngresoProducto.iva}</Text>
      </CardSection>
      <CardSection>
<<<<<<< HEAD
      <Text> Total con IVA: {IngresoProducto.total}</Text>
=======
      <Text> Total con IVA: {IngresoProducto.totalNeto}</Text>
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
      </CardSection>
      </Card>
      <ScrollView>
      <FlatList
        data={dataList}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item, index }) => {
          if(item.nombre) {
          return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View>
            <Card>
              <CardSection>
                <View style={{flex: 3}}>
                  <Text style={{fontSize: 18}}>
                    {item.nombre}
                  </Text>
                  <Text style={{fontSize: 14}}>
                    {item.laboratorio}
                  </Text>
                  </View>
                  <View style={{flex: 1, flexDirection: 'column'}}>
                    <CardSection>
                  <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                    {item.ingresoUMC}
                  </Text>
                    </CardSection>
                    <CardSection>
                  <Text style={{fontSize: 16}}>
                    {item.costoUMC}
                  </Text>
                    </CardSection>
                    <CardSection>
                  <Text style={{fontSize: 16}}>
                    {item.costoUMC*item.ingresoUMC}
                  </Text>
                    </CardSection>
                </View>
              </CardSection>
            </Card>
          </View>
          </View>
        ); }}
      }
        style={{ marginTop: 10 }}
        keyExtractor={item=>item.objectId}
      />
      </ScrollView>
      <View>
      <CardSection>
        <Button onPress={() => this.confirmar()}>Confirmar</Button>
        </CardSection>
        </View>
        </View>
    );
  }
  }

  confirmar() {
    if (this.state.Productos && this.state.IngresoProducto) {
      const { IngresoProducto } = this.state;
      const Pedido = Parse.Object.extend('IngresoProducto');
      const pedido = new Pedido();
      let pendiente = false;

      pedido.set('objectId', IngresoProducto.objectId);
      pedido.set('pendiente', false);

    pedido.save().then(() => {
      Alert.alert(
        'Listo',
        'Pedido surtido correctamente',
        [{ text: 'Ok', style: 'cancel' }],
        { cancelable: false }
      );
      this.setState(INITIAL_STATE)
    })
  } else {
    Alert.alert(
      'Error',
      'Te faltan algunos productos',
      [{ text: 'Ok', style: 'cancel' }],
      { cancelable: false }
    );
}
}

  navigateToScreen = (route, item) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      item
    });
    this.props.navigation.navigate(route, { item });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      {this.buscarIngresoProducto()}
      <ScrollView>
      {this.listaProductos()}
      </ScrollView>
        <View>
          </View>
      </View>
    );
  }
}

const mapStateToProps = ({ query, auth }) => {
  const { user } = auth;
 const { text, loading, Inventario, IngresoProducto } = query;
 console.log('IngresoProducto', IngresoProducto)
 return { text, loading, Inventario, IngresoProducto, user };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, multiWrite, cleanVariable })(SurtirPedido);
