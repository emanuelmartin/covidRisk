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
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection, Button, Spinner } from '../common';
import { queryFunc, queryAttach, cleanFunc, addBill, clearBill, payment } from '../../actions';

class Cafe extends Component {
  static navigationOptions = {
    title: 'Cafetería',
  };

  constructor(props) {
    super(props);
    //setting default state
    const Paciente = { names: '' };
    const Alimento = { name: '' };
    const Alimentos = [];

    this.state = { searchItem: true, Paciente, Alimento, Alimentos, sellType: '' };
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
            Alimento: { name: '' },
            Alimentos: []
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
    this.setState({ Alimento: { name: '' }, Alimentos: [], searchItem: true });
  }

  onNewPatientPress() {
    this.props.cleanFunc();
    this.setState({ Paciente: { names: '' },
    Alimento: { name: '' },
    Alimentos: [],
    searchItem: true
    });
  }

  onBillPress() {
    this.props.addBill({
      patient: this.state.Paciente.objectId,
      bill: { Type: 'Cafeteria', List: this.state.Alimentos }
    });
  }

  onPayPress() {
    let total = 0;
    let newPrice = 0;
    this.state.Alimentos.forEach((bill) => {
      if (isNaN(parseFloat(bill.cantidad)) || bill.cantidad <= 0) {
        newPrice = 0;
      } else { newPrice = parseFloat(bill.cantidad); }
      total += parseFloat(bill.precioPublico) * newPrice;
    });
    this.props.payment('ventas', this.state.Alimentos, total);
  }

  onNewBillPress() {
    this.setState({
      searchItem: true,
      Paciente: { names: '' },
      Alimento: { name: '' },
      Alimentos: [],
      sellType: ''
    });
    this.props.clearBill();
    this.props.cleanFunc();
  }

  onAlertAccept(index) {
    const array = [...this.state.Alimentos];
    array.splice(index, 1);
    if (this.state.Alimentos.length === 1) {
      this.setState({ searchItem: true, Alimentos: array });
      this.props.cleanFunc();
    } else {
      this.setState({ Alimentos: array });
    }
  }

  onSwipedLeft(index) {
    Alert.alert(
      '¿Desea eliminar este producto? ',
      '',
      [
        { text: 'Si', onPress: () => this.onAlertAccept(index) },
        { text: 'No', onPress: () => console.log('Delete'), style: 'cancel' },
      ],
      { cancelable: false }
    );
  }

  updatePaciente(item) {
    this.setState({ Paciente: item });
    this.props.queryFunc({ text: '' });
  }

  updateAlimento(item) {
    item.cantidad = '1';
    this.setState({ Alimento: item, searchItem: false });
    this.props.queryFunc({ text: '' });
  }

  addAlimento(item) {
    this.updateAlimento(item);
    this.setState(state => ({
    Alimentos: [...state.Alimentos, state.Alimento]
    }));
  }

  updateQuantity(index, cantidad) {
    const newMeds = this.state.Alimentos;
    newMeds[index].cantidad = cantidad;
    this.setState({ Alimentos: newMeds });
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.props.text.clear();
  };

  listaAlimento() {
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
          this.renderAlimento(item)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.code}
      />
    );
  }

  listaAlimentoAnadido() {
    return (
      <FlatList
        data={this.state.Alimentos}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item, index }) => (
          this.renderAlimentos(item, index)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.code}
      />
    );
  }

  totalAnadido() {
    let total = 0;
    let newPrice = 0;
    this.state.Alimentos.forEach((bill) => {
      if (isNaN(parseFloat(bill.cantidad)) || bill.cantidad <= 0) {
        newPrice = 0;
      } else { newPrice = parseFloat(bill.cantidad); }
      total += parseFloat(bill.precioPublico) * newPrice;
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

  buscarAlimento() {
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
                  this.props.queryAttach({
                  object: 'Inventario',
                  text,
                  constrain: [{ type: 'startsWith', variable: 'nombre', text },
                    { type: 'equalTo', variable: 'tipo', text: 'cafeteria', bool: 'and' }]
                  });
                } else {
                  this.props.cleanFunc();
                }
                }}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Ingrese el producto"
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.listaAlimento()}
          </CardSection>
        </View>
      );
    }
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
          {this.listaAlimentoAnadido()}
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
          {this.buscarAlimento()}
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
          {this.buscarAlimento()}
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

  renderAlimento(item) {
      return (
      <TouchableWithoutFeedback
      onPress={() => this.addAlimento(item)}
      >
        <View>
          <Text style={styles.textStyle} >
            {item.nombre}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderAlimentos(item, index) {
    const leftOpenValue = Dimensions.get('window').width;
      return (
          <SwipeView
            disableSwipeToRight
            previewSwipeDemo={true}
            leftOpenValue={leftOpenValue}
            onSwipedLeft={() => this.onSwipedLeft(index)}
            swipeDuration={400}
            renderVisibleContent={() =>
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
          }
          />

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
    if (this.props.succesBill || this.props.succesPay) {
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
 const { text, Patient, Inventario } = query;
 const { loading, error, succesBill, succesPay } = bill;
 const load = query.loading;
 return { text, Patient, Inventario, loading, error, succesBill, succesPay, load };
};

export default connect(
  mapStateToProps,
  { queryFunc, queryAttach, cleanFunc, addBill, clearBill, payment })(Cafe);
