import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { SearchBar, Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection, Button, Spinner } from '../common';
import { queryFunc, multiQuery, cleanFunc, addBill, clearBill } from '../../actions';

class CajaPrincipal extends Component {
  static navigationOptions = {
    title: 'Caja Principal',
  };

  constructor(props) {
    super(props);
    //setting default state
    const Paciente = { names: '' };
    const Producto = { name: '' };
    const Productos = [];

    this.state = { searchItem: true, Paciente, Producto, Productos, sellType: '' };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.props.queryFunc({ text: '' });
    this.props.cleanFunc();
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            searchItem: true,
            Paciente: { names: '' },
            Producto: { name: '' },
            Productos: []
          },
          function () {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
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
    this.setState({ Producto: { name: '' }, Productos: [], searchItem: true });
  }

  onNewPatientPress() {
    this.props.cleanFunc();
    this.setState({ Paciente: { names: '' },
    Producto: { name: '' },
    Productos: [],
    searchItem: true
    });
  }

  onBillPress() {
    this.props.addBill({
      patient: this.state.Paciente.objectId,
      bill: { Type: 'Varios', List: this.state.Productos }
    });
  }

  /* Check bill.Precio and bill.cantidad for differents types of data */
  onPayPress() {
    let total = 0;
    this.state.Productos.forEach((bill) => {
      if (bill.class === 'Farmacia') {
        if (this.state.sellType === 'Venta al público') {
          total += parseFloat(bill.precioPublico) * parseFloat(bill.cantidad);
        } else if (this.state.sellType === 'Cuenta Paciente') {
          total += parseFloat(bill.precioPaciente) * parseFloat(bill.cantidad);
        }
      } else if (bill.class === 'Cafeteria' ||
              bill.class === 'Laboratory' ||
              bill.class === 'Tomografia' ||
              bill.class === 'RayosX' ||
              bill.class === 'Rehabilitacion') {
          total += parseFloat(bill.precio) * parseFloat(bill.cantidad);
        }
      });
    this.props.payment('cajaPrincipalIngresos', this.state.Productos, total);
  }

  onNewBillPress() {
    this.setState({
      searchItem: true,
      Paciente: { names: '' },
      Producto: { name: '' },
      Productos: []
    });
    this.props.clearBill();
    this.props.cleanFunc();
  }

  updatePaciente(item) {
    this.setState({ Paciente: item });
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
    if (Array.isArray(this.props.multiQry)) {
      dataList = this.props.multiQry;
    } else {
      dataList = [this.props.multiQry];
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
        keyExtractor={(item) => item.codigo}
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
        keyExtractor={(item) => item.codigo}
      />
    );
  }

  totalAnadido() {
    let total = 0;
    let newPrice = 0;
    this.state.Productos.forEach((bill) => {
      if (isNaN(parseFloat(bill.cantidad))) {
        newPrice = 0;
      } else { newPrice = parseFloat(bill.cantidad); }
      if (bill.class === 'Inventario') {
        if (this.state.sellType === 'Venta al público') {
          total += parseFloat(bill.precioPublico) * newPrice;
        } else if (this.state.sellType === 'Cuenta Paciente') {
          total += parseFloat(bill.precioPaciente) * newPrice;
        }
      } else if (bill.class === 'Servicios') {
          total += parseFloat(bill.precio) * newPrice;
      }
    });
    return (
      <CardSection>
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text style={styles.emphasisTextStyle}> Total</Text>
          <Text style={styles.emphasisTextStyle}> ${total}</Text>
        </View>
      </CardSection>
    );
  }

  listaPaciente() {
    if (this.props.load) {
      return <Spinner size="large" />;
    }
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

  buscarProducto() {
    const queryArray =
    [{ type: 'startsWith', object: 'Inventario', variable: 'nombre' },
     { type: 'startsWith', object: 'Servicios', variable: 'nombre' }
   ];
    if (this.state.searchItem === true) {
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
              onChangeText={text => this.props.multiQuery(queryArray, text)}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Concepto"
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.listaProducto()}
          </CardSection>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CardSection>
            <Text style={styles.emphasisTextStyle}>Productos:</Text>
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
        {this.totalAnadido()}
        {this.renderError()}
        {this.renderButtons()}
      </View>
    );
  }

  buscarPaciente() {
    if (this.state.Paciente.names === '' && this.state.sellType === 'Cuenta Paciente') {
      return (
        <View style={{ flex: 1 }}>
          <CardSection>
            <SearchBar
              round
              lightTheme
              searchIcon={{ size: 24 }}
              containerStyle={{ flex: 1, backgroundColor: 'white' }}
              imputStyle={{ backgroundColor: 'white', marginTop: 0, marginBottom: 0 }}
              onChangeText={text => this.props.queryFunc({
                type: 'startsWith',
                object: 'Patient',
                variable: 'lastName1',
                text })}
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
    } else if (this.state.sellType === 'Venta al público') {
      return (
        <CardSection>
          {this.buscarProducto()}
        </CardSection>
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
        <CardSection>
          {this.buscarProducto()}
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
    if (item.class === 'Inventario') {
      if (item.tipo === 'medicamento') {
        return (
          <TouchableWithoutFeedback
          onPress={() => this.addProducto(item)}
          >
            <View>
              <Text style={styles.textStyle} >
                {item.laboratorio} - {item.nombre} {item.presentacion} {item.contenido}
              </Text>
            </View>
        </TouchableWithoutFeedback>
        );
      }
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
    } else if (item.class === 'Servicios') {
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
  }

  renderProductos(item, index) {
    return (
      <CardSection>
        <Text style={styles.patientTextStyle}>
          {item.nombre}
        </Text>
        <TextInput
          placeholder="1"
          value={item.cantidad}
          keyboardType="numeric"
          autoCorrect={false}
          style={styles.inputStyle}
          onChangeText={cantidad => this.updateQuantity(index, cantidad)}
        />
      </CardSection>
    );
  }

  renderPaciente(item) {
      return (
      <TouchableWithoutFeedback
      onPress={() => this.updatePaciente(item)}
      >
        <View>
          <Text style={styles.textStyle} >{item.names} {item.lastName1} {item.lastName2} </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderDecide() {
    if (this.props.succes || this.props.successPay) {
      return (
        <CardSection>
          <Button onPress={this.onNewBillPress.bind(this)}>
            Nueva cuenta
          </Button>
        </CardSection>
      );
    } else if (this.state.sellType === 'Cuenta Paciente' ||
               this.state.sellType === 'Venta al público') {
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
          <CardSection>
            <Dropdown
            containerStyle={{ flex: 1 }}
            data={data}
            value={this.state.sellType}
            onChangeText={value => this.setState({ sellType: value })}
            placeholder={'Selecciona el tipo de venta'}
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
  }
});

const mapStateToProps = ({ query, bill }) => {
 const { text, Patient, multiQry } = query;
 const { loading, error, succes } = bill;
 const load = query.loading;
 return { text, Patient, multiQry, loading, error, succes, load };
};

export default connect(
  mapStateToProps,
  { queryFunc, multiQuery, cleanFunc, addBill, clearBill })(CajaPrincipal);
