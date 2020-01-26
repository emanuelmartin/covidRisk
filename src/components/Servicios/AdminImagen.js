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
  Cuenta: { names: ''},
  Herramienta: { name: ''},
  Productos: new Array(),
  dataList: null,
  buscarCuenta: false,
  buscarHerramienta: false };

class AdminImagen extends Component {

  static navigationOptions = {
    title: 'Surtir pedido',
  };

  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentWillUnmount() {
    this.props.cleanFunc();
  }

  componentDidMount() {
    this.props.queryFunc({
      type: 'equalTo',
      object: 'Cuenta',
      variable: 'pendienteImagen',
      text: true,
    include: ['autor', 'ingresoPaciente.paciente', 'ingresoPaciente.ubicacion'] })
  }

  renderIt(item, index, objeto, tipo, modal) {
      const fech = new Date(item.createdAt)
      const fecha = fech.toLocaleDateString('dd/MM/yyyy')
      const hora = fech.toLocaleTimeString()
      return (
      <TouchableWithoutFeedback
      onPress={() => { this.props.cleanFunc(); this.updateElement(item, index, objeto, tipo, modal); }}
      >
      <View>
      <Card>
      <CardSection>
          <Text>Paciente: {item.ingresoPaciente.paciente.names} {item.ingresoPaciente.paciente.lastName1} {item.ingresoPaciente.paciente.lastName2}</Text>
          </CardSection>
          <CardSection>
          <Text>Médico solicitante: {item.medicoSolicitante}</Text>
          </CardSection>
          <CardSection>
          <Text>Fecha de solicitud: {fecha} {hora}</Text>
          </CardSection>
      </Card>
      </View>
      </TouchableWithoutFeedback>
    );
  }

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
    console.log('ITEM', item)
    this.setState({ [objeto]: item, [modal]: false, paciente: item.ingresoPaciente.paciente, ubicacion: item.ingresoPaciente.ubicacion  });
    }
  }

  nombreCuenta() {
    if (this.state.Cuenta.objectId) {
      const { Cuenta, paciente, ubicacion } = this.state;
      console.log('cuenta',this.state.Cuenta.paciente)
      const fech = new Date(Cuenta.createdAt)
      const fecha = fech.toLocaleDateString('dd/MM/yyyy')
      const hora = fech.toLocaleTimeString()
      return(
        <Card style={{ flex: 1}}>
        <CardSection>
        <Text>
        Paciente: {paciente.names} {paciente.lastName1} {paciente.lastName2}
        </Text>
        </CardSection>
        <CardSection>
        <Text>
        Ubicación: {ubicacion.tipo} {ubicacion.ID}
        </Text>
        </CardSection>
        <CardSection>
        <Text>
        Fecha de solicitud: {fecha} {hora}
        </Text>
        </CardSection>
        </Card>
       )
    } else {
      return(
        <Card>
        <CardSection>
        <Text style={{ fontSize: 30,
      fontWeight: 'bold' }}>
        Pedido
        </Text>
        </CardSection>
        <CardSection>
        <Text>
     Seleccionar pedido
     </Text>
     </CardSection>
     </Card>
   );
  }
}

  buscarCuenta() {
    return (
      <View style={{ paddingLeft: 10, paddingTop: 30, paddingBottom: 0}}>
      <TouchableWithoutFeedback onPress={() => { this.setState({ buscarCuenta: true }); }}>
      <View>
      {this.nombreCuenta()}
      </View>
      </TouchableWithoutFeedback>
      <Modal
      visible={this.state.buscarCuenta}
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
          <Button onPress={() => { this.props.cleanFunc(); this.setState({ buscarCuenta: false }); }}>
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

    if (Array.isArray(this.props.Cuenta)) {
      dataList = this.props.Cuenta;
    } else {
      dataList = [this.props.Cuenta];
    }

    if (this.props.loading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
        );
      } else if (this.props.Cuenta === 'Failed') {
      return (
        <Text>
        Sin resultados
        </Text>
      );
    } else if (this.props.Cuenta !== '') {
    return (
      <View>
      <Card>
      <FlatList
        data={dataList}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item, index }) => (
          this.renderIt(item, index, 'Cuenta', null, 'buscarCuenta')
        )}
        style={{ marginTop: 10 }}
        keyExtractor={item=>item.objectId}
        />
        </Card>
        </View>
    );
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

    if (this.state.Cuenta.objectId) {
            this.state.Productos = this.state.Cuenta.cuenta.imagen;

          dataList = this.state.Productos;
      return (
      <View style={{ paddingLeft: 10, paddingTop: 30, paddingBottom: 0}}>
      <Text style={{ fontSize: 30,
      fontWeight: 'bold' }}>
      Productos
      </Text>
      <ScrollView>
      <FlatList
        data={dataList}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item, index }) => {
          if(item.nombre) {
          return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
            <View>
            <Card>
              <CardSection>
                <View style={{flex: 3}}>
                  <Text style={{fontSize: 15}}>
                    {item.nombre}
                  </Text>
                  <Text style={{fontSize: 13}}>
                    {item.laboratorio}
                  </Text>
                  <Text style={{fontSize: 15}}>
                    {item.cantidad}
                  </Text>
                </View>
                <View style={{flex: 1}}>
                  <CheckBox
                    size={38}
                    checked={this.state.Productos[index].integrado}
                    onPress={() => {
                      const Productos = {...this.state.Productos};
                      Productos[index].integrado = !this.state.Productos[index].integrado;
                      this.setState({ Productos });
                    }}
                  />
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
    if (this.state.Productos && this.state.Cuenta) {
      const { Cuenta } = this.state;
      const Pedido = Parse.Object.extend('Cuenta');
      const pedido = new Pedido();
      let pendienteImagen = false;
      this.state.Productos.forEach((producto) => {
        if (!producto.integrado) pendienteImagen = true;
      })

      console.log('Cuenta', Cuenta.estado)
      pedido.set('objectId', Cuenta.objectId);
      pedido.set('pendienteImagen', pendienteImagen);

      const Productos = this.state.Productos;

      let failed = 0;
    Productos.forEach((producto) => {
        if (!producto.integrado) {
        failed += 1;
      }
})

    if (!failed) {
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
}

  navigateToScreen = (route, item) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      item
    });
    this.props.navigation.navigate(route, { item });
  }

  render() {
    console.log(this.state.Productos)
    return (
      <View>
      {this.buscarCuenta()}
      {this.listaProductos()}
        <View>
          </View>
      </View>
    );
  }
}

const mapStateToProps = ({ query, auth }) => {
  const { user } = auth;
 const { text, loading, Inventario, Cuenta } = query;
 return { text, loading, Inventario, Cuenta, user };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, multiWrite, cleanVariable })(AdminImagen);
