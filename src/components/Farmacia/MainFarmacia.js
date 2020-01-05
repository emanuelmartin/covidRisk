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
import { SearchBar, Icon, CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection, Button, Spinner } from '../common';
import {
  queryFunc,
  queryAttach,
  queryPointer,
  cleanFunc,
  restart,
  devolver,
  consumoInterno,
  salidaExtraordinaria
} from '../../actions';

class MainFarmacia extends Component {
  static navigationOptions = {
    title: 'Farmacia',
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
      moveType: '',
      salidaType: '',
      justificacion: '',
      anonimo: false,
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.props.queryFunc({ text: '' });
    this.props.cleanFunc();
    this.setState(
      {
        searchItem: true,
        Paciente: { names: '' },
        Ingreso: '',
        Producto: { name: '' },
        Productos: [],
        moveType: '',
        salidaType: '',
        justificacion: '',
        anonimo: false,
      });
  }

  componentWillUnmount() {
    this.props.cleanFunc();
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
      searchItem: true, });
  }

  onNewPatientPress() {
    this.props.cleanFunc();
    this.setState({ Paciente: { names: '' },
    Ingreso: '',
    Producto: { name: '' },
    Productos: [],
    searchItem: true,
    anonimo: false });
  }

  onFinalPress() {
    let alertMsg = '';
    if (this.state.moveType === 'Devolución') {
      alertMsg = '¿Desea devolver la lista de productos?';
    } else if (this.state.moveType === 'Consumo Interno') {
      alertMsg = '¿Desea cargar la lista de productos al área seleccionada?';
    } else if (this.state.moveType === 'Salida Extraordinaria') {
      alertMsg = '¿Desea dar de baja la lista de productos?';
    }
    Alert.alert(
      'Confirmación Pendiente:',
      alertMsg,
      [
        { text: 'Si', onPress: () => this.onAcceptPress() },
        { text: 'No', onPress: () => console.log('Cancelar'), style: 'cancel' },
      ],
      { cancelable: false }
    );
  }

  onAcceptPress() {
    if (this.state.moveType === 'Devolución') {
      if (this.state.anonimo) {
        this.props.devolver({ paciente: false, ingreso: false, productos: this.state.Productos });
      } else {
        this.props.devolver({
          paciente: this.state.Paciente,
          ingreso: this.state.Ingreso,
          productos: this.state.Productos
        });
      }
    } else if (this.state.moveType === 'Consumo Interno') {
        this.props.consumoInterno({ area: this.state.salidaType, productos: this.state.Productos });
    } else if (this.state.moveType === 'Salida Extraordinaria') {
        this.props.salidaExtraordinaria({
          area: this.state.salidaType,
          productos: this.state.Productos
        });
    }
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
    this.setState({ Paciente: item.paciente, Ingreso: item.objectId });
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
    if (Array.isArray(this.props.Inventario)) {
      dataList = this.props.Inventario;
    } else {
      dataList = [this.props.Inventario];
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
        dataList = this.props.Patient;
      } else {
        dataList = [this.props.Patient];
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

  buscarProducto() {
    if ((this.state.searchItem === true && this.state.salidaType !== '') ||
    (this.state.searchItem === true && this.state.moveType === 'Devolución')) {
      return (
        <View style={{ flex: 1 }}>
          <CardSection>
            <SearchBar
              round
              lightTheme
              containerStyle={{ flex: 1, backgroundColor: 'white' }}
              searchIcon={
                <Icon
                  name='camera'
                  type='material-community'
                  onPress={this.navigateToScreen('BarCodeScanner', { updateCode: false })}
                />}
              onChangeText={text => {
                if (text !== '') {
                  if (this.state.Productos.length === 0) {
                    this.props.queryAttach({
                    object: 'Inventario',
                    text,
                    constrain: [{ type: 'startsWith', variable: 'nombre', text },
                      { type: 'containedIn', variable: 'tipo', text: ['insumo', 'medicamento'], bool: 'and' }]
                    });
                  } else {
                    const productoBusqueda = [];
                    this.state.Productos.forEach((producto) => {
                      productoBusqueda.push(producto.nombre);
                    });
                    this.props.queryAttach({
                    object: 'Inventario',
                    text,
                    constrain: [{ type: 'startsWith', variable: 'nombre', text },
                      { type: 'containedIn', variable: 'tipo', text: ['insumo', 'medicamento'], bool: 'and' },
                      { type: 'notContainedIn', variable: 'nombre', text: productoBusqueda, bool: 'and' }]
                    });
                  }
                } else {
                  this.props.cleanFunc();
                }
                }}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Ingrese el nombre del producto o servicio"
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.listaProducto()}
          </CardSection>
        </View>
      );
    } else if ((this.state.searchItem === false && this.state.salidaType !== '') ||
    (this.state.searchItem === false && this.state.moveType === 'Devolución')) {
      return (
        <View style={{ flex: 1 }}>
          <CardSection>
              <Text style={styles.emphasisTextStyle}>Descripción:</Text>
            <View style={{ flex: 1 }}>
              <Text
                style={[styles.emphasisTextStyle, { textAlign: 'right' }]}
              >
                Cantidad:
              </Text>
            </View>
          </CardSection>
          <CardSection>
            {this.listaProductoAnadido()}
          </CardSection>
          {this.renderError()}
          {this.renderButtons()}
        </View>
      );
    }
  }

  buscarPaciente() {
    if (this.state.anonimo === false && this.state.Paciente.names === '') {
      return (
        <View>
          <CardSection>
            <CheckBox
              title='Sin paciente'
              checked={this.state.anonimo}
              onPress={() => this.setState({ anonimo: !this.state.anonimo })}
            />
          </CardSection>
          <CardSection>
            <SearchBar
              round
              lightTheme
              searchIcon={{ size: 24 }}
              containerStyle={{ flex: 1, backgroundColor: 'white' }}
              imputStyle={{ backgroundColor: 'white', marginTop: 0, marginBottom: 0 }}
              onChangeText={text => this.props.queryPointer({
                type: 'startsWith',
                object: 'Patient',
                variable: 'lastName1',
                text,
                pointer: { object: 'IngresosActivos', variable: 'paciente' } })}
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
    } else {
      return (
        <View>
          <CardSection>
            <CheckBox
              title='Sin paciente'
              checked={this.state.anonimo}
              onPress={() => this.setState({ anonimo: !this.state.anonimo })}
            />
            <Text />
          </CardSection>
          <CardSection>
            {this.buscarProducto()}
          </CardSection>
        </View>
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
    if (this.state.moveType === 'Devolución') {
      return (
        <CardSection>
          <Button onPress={this.onFinalPress.bind(this)}>
            Devolver
          </Button>
        </CardSection>
      );
    } else if (this.state.moveType === 'Consumo Interno') {
      return (
        <CardSection>
          <Button onPress={this.onFinalPress.bind(this)}>
            Generar Orden
          </Button>
        </CardSection>
      );
    } else if (this.state.moveType === 'Salida Extraordinaria') {
      return (
        <CardSection>
          <Button onPress={this.onFinalPress.bind(this)}>
            Dar Salida
          </Button>
        </CardSection>
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
            Borrar Lista
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
    if (item !== 'Failed' && item.names) {
      return (
        <TouchableWithoutFeedback
        onPress={() => this.updatePaciente(item)}
        >
          <View>
            <Text style={styles.textStyle} >{item.paciente.names} {item.paciente.lastName1} {item.paciente.lastName2} </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  renderDecide() {
    let data = [];
    if (this.state.moveType === 'Devolución') {
      return (
        <View>
          {this.buscarPaciente()}
        </View>
      );
    } else if (this.state.moveType === 'Consumo Interno') {
      data = [{
          value: 'Urgencias'
        }, {
          value: 'Laboratorio'
        }, {
          value: 'Rehabilitación'
        }, {
          value: 'Imagenología'
        }, {
          value: 'Quirófano'
        }, {
          value: 'CEyE'
        }, {
          value: 'Rehabilitación'
        }, {
          value: 'Piso'
        }, {
          value: 'Consulta'
        }, {
          value: 'Procedimientos'
        }, {
          value: 'Carro rojo'
        }, {
          value: 'Shock'
        }, {
          value: 'Terapia intensiva'
        }, {
          value: 'Neonatología'
        }];
      return (
        <View>
          <CardSection>
            <Dropdown
            containerStyle={{ flex: 1 }}
            data={data}
            value={this.state.salidaType}
            onChangeText={value => this.setState({ salidaType: value })}
            placeholder={'Área:'}
            />
          </CardSection>
          {this.buscarProducto()}
        </View>
      );
    } else if (this.state.moveType === 'Salida Extraordinaria') {
      data = [{
          value: 'Caducidad'
        }, {
          value: 'Accidente'
        }];
      return (
        <View>
          <CardSection>
            <Dropdown
            containerStyle={{ flex: 1 }}
            data={data}
            value={this.state.salidaType}
            onChangeText={value => this.setState({ salidaType: value })}
            placeholder={'Motivo:'}
            />
          </CardSection>
          {this.buscarProducto()}
        </View>
      );
    }
  }

  render() {
    console.log(this.state);
    const data = [{
        value: 'Devolución'
      }, {
        value: 'Consumo Interno'
      }, {
        value: 'Salida Extraordinaria'
      }];
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <CardSection>
            <Dropdown
            containerStyle={{ flex: 1 }}
            data={data}
            value={this.state.moveType}
            onChangeText={value => this.setState({ moveType: value, salidaType: '' })}
            placeholder={'Movimiento a realizar:'}
            />
          </CardSection>
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
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#63C0B9'
  }
});

const mapStateToProps = ({ query, bill, printR, auth }) => {
 const { text, Patient, Inventario, Caja } = query;
 const load = query.loading;
 const { user } = auth;
 console.log('USER', user)
 const { loading, error, succesBill, succesPay, ticketInfo } = bill;
 const { print } = printR;
 return {
   text,
   Patient,
   Inventario,
   Caja,
   loading,
   error,
   succesBill,
   succesPay,
   load,
   ticketInfo,
   print,
   user
 };
};

export default connect(mapStateToProps,
  { queryFunc,
    queryAttach,
    queryPointer,
    cleanFunc,
    restart,
    devolver,
    consumoInterno,
    salidaExtraordinaria
})(MainFarmacia);
