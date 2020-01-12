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
import Modal from 'react-native-modal';
import SwipeView from 'react-native-swipeview';
import { NavigationActions } from 'react-navigation';
import { SearchBar, Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection, Button, Spinner, Input } from '../common';
import {
  queryFunc,
  queryAttach,
  queryPointer,
  writeFunc,
  cleanFunc,
  addBill,
  clearBill,
  payment,
  corte,
  printHTMLReducer,
  printClean
} from '../../actions';

class Rehabilitacion extends Component {
  static navigationOptions = {
    title: 'Rehabilitacion',
  };

  constructor(props) {
    super(props);
    //setting default state
    this.state = {
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
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.props.queryFunc({ text: '' });
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
    let subtotal = 0;
    let impuestos = 0;
    let cant = 0;

    this.state.Productos.forEach((producto) => {
      if (isNaN(parseFloat(producto.cantidad)) || producto.cantidad <= 0) {
        cant = 0;
      } else { cant = parseFloat(producto.cantidad); }
      if(this.state.sellType === 'Venta al público'){
          subtotal += producto.precioPublico * cant;
          impuestos += cant * producto.precioPublico * (producto.iva/100);
      } else {
        subtotal += producto.precioSeguro * cant;
        impuestos += cant * producto.precioSeguro * (producto.iva/100);
      }
    });

    const total = subtotal + impuestos;

    this.props.addBill({
      patient: this.state.Paciente.objectId,
      ingreso: this.state.Ingreso,
      bill: { Type: 'rehabilitacion', rehabilitacion: this.state.Productos },
      total
    });
  }

  onPayPress() {
    let subtotal = 0;
    let impuestos = 0;
    let cant = 0;

    this.state.Productos.forEach((producto) => {
      if (isNaN(parseFloat(producto.cantidad)) || producto.cantidad <= 0) {
        cant = 0;
      } else { cant = parseFloat(producto.cantidad); }
      if(this.state.sellType === 'Venta al público'){
          subtotal += producto.precioPublico * cant;
          impuestos += cant * producto.precioPublico * (producto.iva/100);
      } else {
        subtotal += producto.precioSeguro * cant;
        impuestos += cant * producto.precioSeguro * (producto.iva/100);
      }
    });
    this.setState({
      modal: true,
      subtotal,
      iva: impuestos,
      recibido: (subtotal + impuestos).toString()
    });
  }

  onPayConfirm() {
    const total = { subtotal: this.state.subtotal, iva: this.state.iva };
    if (parseFloat(this.state.recibido) < (total.subtotal + total.iva).toFixed(2)) {
      Alert.alert(
        'Error',
        'La cantidad recibida debe ser al menos $' + (total.subtotal + total.iva).toFixed(2),
        [{ text: 'Ok', style: 'cancel' }],
        { cancelable: false }
      );
    } else {
      this.setState({ modal: false });
      this.props.payment(
        { pago: total,
          tipoPago: 'efectivo',
          tipoVenta: 'ventaPublico',
          lista: { Type: 'rehabilitacion', farmacia: [], imagen: [], laboratorio: [], rehabilitacion: this.state.Productos, otros: [] },
          recibido: parseFloat(this.state.recibido),
        }
      );
    }
  }

  onCorteConfirm(retiro) {
    const parseRetiro = parseFloat(retiro);
    if (parseRetiro > 0 && parseRetiro <= this.props.Caja.efectivo) {
      this.setState({ modalCorte: false });
      this.props.corte('rehabilitacion', parseRetiro);
    } else {
      let error = '';
      if (parseRetiro <= 0) {
        error = 'La cantidad retirada debe ser mayor a $0.00';
      } else if (parseRetiro > this.props.Caja.efectivo) {
        error = 'No tiene suficiente dinero en la caja para realizar la operación';
      } else {
        error = 'Por favor ingrese la cantidad que desea retirar';
      }
      Alert.alert(
        'Error',
        error,
        [{ text: 'Ok', style: 'cancel' }],
        { cancelable: false }
      );
    }
  }

  onPrintTicket() {
    this.props.printHTMLReducer(this.props.ticketInfo, 'ticketVenta', false);
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

  clear = () => {
    this.props.text.clear();
  };

  listaProducto() {
    if (this.props.load) {
      return <Spinner size="large" />;
    }
    let dataList = null;
    if (Array.isArray(this.props.Servicios)) {
      dataList = this.props.Servicios;
    } else {
      dataList = [this.props.Servicios];
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

  totalAnadido() {
    let subtotal = 0;
    let cant = 0;
    let impuestos = 0;

    this.state.Productos.forEach((producto) => {
      if (isNaN(parseFloat(producto.cantidad)) || producto.cantidad <= 0) {
        cant = 0;
      } else { cant = parseFloat(producto.cantidad); }
      if(this.state.sellType === 'Venta al público'){
          subtotal += producto.precioPublico * cant;
          impuestos += cant * producto.precioPublico * (producto.iva/100);
      } else {
        subtotal += producto.precioSeguro * cant;
        impuestos += cant * producto.precioSeguro * (producto.iva/100);
      }
    });
    const total = subtotal + impuestos;

    return (
      <CardSection>
        <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
          <Text style={styles.emphasisTextStyle}> Total</Text>
          <Text style={styles.emphasisTextStyle}> ${total.toFixed(2)}</Text>
        </View>
      </CardSection>
    );
  }

  listaPaciente() {
    if (this.props.load) {
      return <Spinner size="large" />;
    } else if (this.props.User !== '') {
      let dataList = null;
      if (Array.isArray(this.props.User)) {
        dataList = this.props.User;
      } else {
        dataList = [this.props.User];
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
              onChangeText={text => {
                if (text !== '') {
                  if (this.state.Productos.length === 0) {
                    this.props.queryAttach({
                    object: 'Servicios',
                    text,
                    constrain: [{ type: 'startsWith', variable: 'nombre', text },
                      { type: 'containedIn', variable: 'tipo', text: ['rehabilitacion'], bool: 'and' }]
                    });
                  } else {
                    const productoBusqueda = [];
                    this.state.Productos.forEach((producto) => {
                      productoBusqueda.push(producto.nombre);
                    });
                    this.props.queryAttach({
                    object: 'Servicios',
                    text,
                    constrain: [{ type: 'startsWith', variable: 'nombre', text },
                      { type: 'containedIn', variable: 'tipo', text: ['rehabilitacion'], bool: 'and' },
                      { type: 'notContainedIn', variable: 'nombre', text: productoBusqueda, bool: 'and' }]
                    });
                  }
                } else {
                  this.props.cleanFunc();
                }
                }}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Ingrese el nombre del estudio"
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
        {this.renderModal()}
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
              onChangeText={text => this.props.queryPointer({
                type: 'matches',
                object: 'User',
                variable: 'lastName1',
                text,
                regex: 'i',
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

  renderModal() {
    let cambio = parseInt(this.state.recibido, 10) - (this.state.subtotal + this.state.iva);
    if (cambio < 0 || this.state.recibido === '') { cambio = 0; }
    return (
      <View>
        <Modal
          isVisible={this.state.modal}
          animationType='slide'
          transparent={false}
          style={styles.modalStyle}
        >
          <CardSection>
            <Text style={styles.titleStyle}>
              Pago en efectivo
            </Text>
          </CardSection>
          <CardSection>
            <Text>Total: ${(this.state.subtotal + this.state.iva).toFixed(2)}</Text>
          </CardSection>
          <CardSection>
            <Input
							label="Recibo"
							placeholder="0"
							onChangeText={(text) => this.setState({ recibido: text })}
							value={this.state.recibido}
							keyboardType="numeric"
            />
          </CardSection>
          <CardSection>
            <Text>Cambio: ${cambio.toFixed(2)}</Text>
          </CardSection>
          <CardSection>
            <Button onPress={() => { this.onPayConfirm(); }}>
              Confirmar Pago
            </Button>
            <Button onPress={() => { this.setState({ modal: false }); }}>
              Cancelar
            </Button>
          </CardSection>
        </Modal>
      </View>
    );
  }

  renderModalCorte() {
    let rM = null;
    let efectivoCorte = 0;
    let corte = 0;
    if (this.state.corte !== '') {
      corte = parseFloat(this.state.corte);
    }
    if (this.props.Caja !== '') {
      efectivoCorte = this.props.Caja.efectivo;
    }
    if (this.props.load) {
      rM = <Spinner size="large" />;
    } else {
      rM =
      (<View>
        <CardSection>
          <Text style={styles.titleStyle}>
            Corte de Caja
          </Text>
        </CardSection>
        <CardSection>
          <Text>Dinero Disponible: ${efectivoCorte.toFixed(2)}</Text>
        </CardSection>
        <CardSection>
          <Input
            label="¿Cuánto desea retirar de la caja?"
            placeholder={String(efectivoCorte.toFixed(2))}
            onChangeText={(text) => this.setState({ corte: text })}
            value={this.state.corte}
            keyboardType="numeric"
          />
        </CardSection>
        <CardSection>
          <Text>
            Después de la operación usted se quedará con: ${(efectivoCorte - corte).toFixed(2)}
          </Text>
        </CardSection>
        <CardSection>
          <Button onPress={() => { this.onCorteConfirm(parseInt(this.state.corte, 10)); }}>
            Confirmar
          </Button>
          <Button onPress={() => { this.setState({ modalCorte: false }); }}>
            Cancelar
          </Button>
        </CardSection>
      </View>);
    }
    return (
      <View>
        <Modal
          isVisible={this.state.modalCorte}
          animationType='slide'
          transparent={false}
          style={styles.modalStyle}
        >
          {rM}
        </Modal>
      </View>
    );
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
                  text: 'rehabilitacion'
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
    let texto = (
      <Text style={styles.patientTextStyle}>
        {item.nombre}
      </Text>
    );
    
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
            <Text style={styles.textStyle} >{item.paciente.names} {item.paciente.lastName1} {item.paciente.lastName2} </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  }

  renderDecide() {
    if (this.props.succesBill || this.props.succesPay) {
      if (this.props.print === false && this.state.sellType === 'Venta al público') {
        return (
          <View>
            <CardSection>
              <Button onPress={this.onPrintTicket.bind(this)}>
                Imprimir Ticket
              </Button>
            </CardSection>
            <CardSection>
              <Button onPress={this.onNewBillPress.bind(this)}>
                Nueva cuenta
              </Button>
            </CardSection>
          </View>
        );
      }
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
            onChangeText={value => {
              if (value === 'Venta al público') {
                  this.setState({ sellType: value, Paciente: { names: '' } });
              } else { this.setState({ sellType: value }); }
            }}
            placeholder={'Selecciona el tipo de venta'}
            />
          </CardSection>
          {this.renderDecide()}
        </ScrollView>
        {this.renderCorteCaja()}
        {this.renderModalCorte()}
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

const mapStateToProps = ({ query, bill, printR }) => {
 const { text, User, Servicios, Caja } = query;
 const load = query.loading;
 const { loading, error, succesBill, succesPay, ticketInfo } = bill;
 const { print } = printR;
 return {
   text,
   User,
   Servicios,
   Caja,
   loading,
   error,
   succesBill,
   succesPay,
   load,
   ticketInfo,
   print
 };
};

export default connect(mapStateToProps,
  { queryFunc,
    queryAttach,
    queryPointer,
    writeFunc,
    cleanFunc,
    addBill,
    clearBill,
    payment,
    corte,
    printHTMLReducer,
    printClean
})(Rehabilitacion);
