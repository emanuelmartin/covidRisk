import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import SwipeView from 'react-native-swipeview';
import { NavigationActions } from 'react-navigation';
import { SearchBar, Icon } from 'react-native-elements';
import { CardSection, Button, Spinner } from '../common';
import {
  queryFunc,
  queryAttach,
<<<<<<< HEAD
  queryPointer,
=======
  queryIngreso,
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
  multiQuery,
  writeFunc,
  cleanFunc,
  addBill,
  clearBill,
  payment,
  corte,
  printHTMLReducer,
  printClean
} from '../../actions';

class AgregarHonorarios extends Component {
  static navigationOptions = {
    title: 'Agregar honorarios',
  };

  constructor(props) {
    super(props);
    //setting default state
    const Paciente = { names: '' };
    const Producto = { name: '' };
    const Productos = [];
    const Ingreso = '';

    this.state = {
      searchItem: true,
      Paciente,
      Ingreso,
      Producto,
      Productos,
      sellType: 'Cuenta Paciente',
      modal: false,
      modalCorte: false,
      recibido: 0,
      corte: '',
      subtotal: 0,
      iva: 0
    };
    this.arrayholder = [];
  }

  componentDidMount() {
<<<<<<< HEAD
    this.props.queryFunc({ text: '' });
=======
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
    this.props.cleanFunc();
    this.props.printClean();
    this.setState(
      {
        searchItem: true,
        Paciente: { names: '' },
        Ingreso: '',
        Producto: { name: '' },
        Productos: [],
        sellType: '',
        modal: false,
        modalCorte: false,
        recibido: 0,
        corte: '',
        subtotal: 0,
        iva: 0
      });
<<<<<<< HEAD
=======
      this.props.queryIngreso({
        object: 'User',
        type: 'exists',
        variable: 'lastName1',
        text: '',
      });
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
  }

  componentWillUnmount() {
    this.props.cleanFunc();
    this.props.printClean();
  }

  onAddPress() {
    this.props.cleanFunc();
    this.setState({ searchItem: true });
  }

  onEliminatePress() {
    this.props.cleanFunc();
    this.setState({
      Producto: { name: '' },
      Productos: [],
      searchItem: true,
      recibido: 0,
      subtotal: 0,
      iva: 0 });
  }

  onNewPatientPress() {
    this.props.cleanFunc();
    this.setState({ Paciente: { names: '' },
    Ingreso: '',
    Producto: { name: '' },
    Productos: [],
    searchItem: true,
    recibido: 0,
    subtotal: 0,
    iva: 0
    });
  }

  onBillPress() {
    const administrativos = [];

    this.state.Productos.forEach((producto) => {
      administrativos.push(producto);
    })

    this.props.addBill({
<<<<<<< HEAD
      patient: this.state.Paciente.objectId,
      ingreso: this.state.Ingreso,
      bill: { Type: 'admision', administrativos },
      autor: this.props.user
=======
      autor: this.props.user,
      patient: this.state.Paciente.objectId,
      ingreso: this.state.Ingreso,
      bill: { Type: 'admision', laboratorio: [], imagen: [], farmacia: [], rehabilitacion: [], administrativos },
      pendienteLaboratorio: false,
      pendienteImagen: false,
      pendienteFarmacia: false,
      pendienteRehabilitacion: false
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
  });
}

  onNewBillPress() {
    this.setState({
      searchItem: true,
      Paciente: { names: '' },
      Ingreso: '',
      Producto: { name: '' },
      Productos: [],
      sellType: ''
    });
    this.props.clearBill();
    this.props.cleanFunc();
    this.props.printClean();
  }

  onAlertAccept(index) {
    const array = [...this.state.Productos];
    array.splice(index, 1);
    if (this.state.Productos.length === 1) {
      this.setState({ searchItem: true, Productos: array });
      this.props.cleanFunc();
    } else {
      this.setState({ Productos: array });
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

  updatePaciente(item) {
<<<<<<< HEAD
    this.setState({ Paciente: item.paciente, Ingreso: item.objectId });
=======
    this.setState({ Paciente: item, Ingreso: item.ingresotId });
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
    this.props.queryFunc({ text: '' });
  }

  updateProducto(item) {
    item.cantidad = '1';
    this.setState({ Producto: item, searchItem: false });
    this.props.queryFunc({ text: '' });
  }

  addProducto(item) {
    this.updateProducto(item);
    this.setState(state => ({
    Productos: [...state.Productos, state.Producto]
    }));
  }

  updateQuantity(index, cantidad) {
    const newMeds = this.state.Productos;
    newMeds[index].cantidad = cantidad;
    this.setState({ Productos: newMeds });
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.props.text.clear();
  };

  listaProducto() {
    if (this.props.load) {
      return <Spinner size="large" />;
    }
    let dataList = null;
    if (Array.isArray(this.props.Servicios)) {
<<<<<<< HEAD
      dataList = this.props.Servicios;
    } else {
      dataList = [this.props.Servicios];
=======
      dataList = [].concat(this.props.Servicios).sort((a, b) => a.nombre > b.nombre);
    } else {
      dataList = [].concat([this.props.Servicios]).sort((a, b) => a.nombre > b.nombre);
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
    }
    return (
      <FlatList
        data={dataList}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item }) => (
          this.renderProducto(item)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.code}
      />
    );
  }

  listaProductoAnadido() {
    return (
      <FlatList
        data={this.state.Productos}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item, index }) => (
          this.renderProductos(item, index)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.code}
      />
    );
  }


  listaPaciente() {
    if (this.props.load) {
      return <Spinner size="large" />;
    } else if (this.props.Patient !== '') {
      let dataList = null;
      if (Array.isArray(this.props.Patient)) {
<<<<<<< HEAD
        dataList = this.props.Patient;
      } else {
        dataList = [this.props.Patient];
=======
        dataList = [].concat(this.props.Patient).sort((a, b) => a.names > b.names);
      } else {
        dataList = [].concat([this.props.Patient]).sort((a, b) => a.names > b.names);
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
      }
      return (
        <FlatList
          data={dataList}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            this.renderPaciente(item)
          )}
          enableEmptySections
          style={{ marginTop: 10 }}
          keyExtractor={(item) => item.curp}
        />
      );
    }
  }


  buscarPaciente() {
    if (this.state.Paciente.names === '') {
      return (
        <View style={{ flex: 1 }}>
          <CardSection>
            <SearchBar
              round
              lightTheme
              searchIcon={{ size: 24 }}
              containerStyle={{ flex: 1, backgroundColor: 'white' }}
              imputStyle={{ backgroundColor: 'white', marginTop: 0, marginBottom: 0 }}
<<<<<<< HEAD
              onChangeText={text => this.props.queryPointer({
=======
              onChangeText={text => this.props.queryIngreso({
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
                type: 'matches',
                object: 'User',
                variable: 'lastName1',
                regex: 'i',
<<<<<<< HEAD
                text,
                pointer: { object: 'IngresosActivos', variable: 'paciente' } })}
=======
                text })
              }
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Ingresa el primer apellido..."
              value={this.props.text}
            />
          </CardSection>
          <CardSection>
            {this.listaPaciente()}
          </CardSection>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CardSection>
          <Button onPress={this.onNewPatientPress.bind(this)}>
            Buscar otro paciente
          </Button>
        </CardSection>
        <CardSection>
            <Text style={styles.emphasisTextStyle}>Paciente: </Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.patientTextStyle, { textAlign: 'right' }]}>
                {this.state.Paciente.names} {this.state.Paciente.lastName1} {this.state.Paciente.lastName2}
              </Text>
            </View>
        </CardSection>
      </View>
    );
  }

  navigateToScreen = (route, item) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
      item
    });
    this.props.navigation.navigate(route, { item });
  }

  ListViewItemSeparator = () => {
    //Item separator view
    return (
      <View
        style={{
          height: 0.3,
          width: '90%',
          backgroundColor: '#080808',
        }}
      />
    );
  };

  renderError() {
    if (this.props.error !== '') {
      return (
        <Text>{this.props.error}</Text>
      );
    }
  }

  renderFinalButton() {
    if (this.state.sellType === 'Venta al público') {
      return (
        <CardSection>
          <Button onPress={this.onPayPress.bind(this)}>
            Cobrar
          </Button>
        </CardSection>
      );
    }
    return (
      <CardSection>
        <Button onPress={this.onBillPress.bind(this)}>
          Añadir a cuenta
        </Button>
      </CardSection>
    );
  }

  renderCorteCaja() {
    if (this.state.sellType === '') {
      return (
        <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'column' }} >
          <CardSection>
            <Button
              onPress={() => {
                this.props.queryFunc({
                  type: 'equalTo',
                  object: 'Caja',
                  variable: 'nombre',
                  text: 'principal'
                });
                this.setState({ modalCorte: true });
              }}
            >
              Corte Caja
            </Button>
          </CardSection>
          <CardSection />
        </View>
      );
    }
  }

  renderButtons() {
    if (this.props.loading === true) {
      return <Spinner size="large" />;
    }
    return (
      <View>
        <CardSection>
          <Button onPress={this.onAddPress.bind(this)}>
            Añadir Producto
          </Button>
          <Button onPress={this.onEliminatePress.bind(this)}>
            Borrar cuenta
          </Button>
        </CardSection>
        {this.renderFinalButton()}
      </View>
    );
  }

  renderProducto(item) {
      return (
      <TouchableWithoutFeedback
      onPress={() => this.addProducto(item)}
      >
        <View>
          <Text style={styles.textStyle} >
            {item.nombre}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderProductos(item, index) {
    let texto = null;
    if (item.tipo === 'paquete') {
      texto = (
        <Text style={styles.patientTextStyle}>
          Paquete - {item.nombre}
        </Text>
      );
    } else {
      texto = (
        <Text style={styles.patientTextStyle}>
          {item.nombre}
        </Text>
      );
    }
    const leftOpenValue = Dimensions.get('window').width;
      return (
          <SwipeView
            disableSwipeToRight
            leftOpenValue={leftOpenValue}
            onSwipedLeft={() => this.onSwipedLeft(index)}
            swipeDuration={400}
            renderVisibleContent={() =>
              <CardSection>
                {texto}
                <TextInput
                  placeholder="1"
                  value={item.cantidad}
                  keyboardType="numeric"
                  autoCorrect={false}
                  style={styles.inputStyle}
                  onChangeText={cantidad => this.updateQuantity(index, cantidad)}
                />
            </CardSection>
          }
          />

    );
  }

  renderPaciente(item) {
    if (item !== 'Failed') {
      return (
        <TouchableWithoutFeedback
        onPress={() => this.updatePaciente(item)}
        >
          <View>
<<<<<<< HEAD
            <Text style={styles.textStyle} >{item.paciente.names} {item.paciente.lastName1} {item.paciente.lastName2} </Text>
=======
            <Text style={styles.textStyle} >{item.names} {item.lastName1} {item.lastName2} </Text>
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  renderDecide() {
    if (this.props.succesBill || this.props.succesPay) {
      return (
          <CardSection>
            <Button onPress={this.onNewBillPress.bind(this)}>
              Nueva solicitud
            </Button>
          </CardSection>
        );
    } else {
      return (
        <View>
          {this.buscarPaciente()}
        </View>
      );
    }
  }

  render() {
    console.log(this.state);
    const data = [{
        value: 'Venta al público',
      }, {
        value: 'Cuenta Paciente'
      }];
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.renderDecide()}
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
  },
  inputStyle: {
    color: '#000',
    fontSize: 18,
    flex: 2,
    textAlign: 'right'
  },
  modalStyle: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#63C0B9'
  }
});

const mapStateToProps = ({ query, bill, printR, auth }) => {
 const { text, User, multiQry, Caja, Inventario, Servicios } = query;
 const Patient = User;
 const load = query.loading;
 const { user } = auth;
 console.log('USER', user)
 const { loading, error, succesBill, succesPay, ticketInfo } = bill;
 const { print } = printR;
 return {
   text,
   Patient,
   multiQry,
   Caja,
   loading,
   error,
   succesBill,
   succesPay,
   load,
   ticketInfo,
   print,
   user,
   Inventario,
   Servicios
 };
};

export default connect(mapStateToProps,
  { queryFunc,
    queryAttach,
<<<<<<< HEAD
    queryPointer,
=======
    queryIngreso,
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
    multiQuery,
    writeFunc,
    cleanFunc,
    addBill,
    clearBill,
    payment,
    corte,
    printHTMLReducer,
    printClean
})(AgregarHonorarios);
