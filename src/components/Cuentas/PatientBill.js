import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
//import Parse from 'parse/react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { CardSection, Button } from '../common';
import { queryFunc, cleanFunc } from '../../actions';

class PatientBill extends Component {
  static navigationOptions = {
    title: 'Cuenta de Paciente',
  };

  constructor(props) {
    super(props);
    //setting default state
    let Paciente = { names: '' };
    let Insumos = false;
    let Estudios = false;
    let Otros = false;

    this.state = { isLoading: false, search: '', Paciente, Insumos, Estudios, Otros };
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
            isLoading: false,
            Paciente: { names: '' },
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

  onOtherBillPress() {
    this.setState({ Paciente: { names: '' } });
    this.props.cleanFunc();
  }

  onPayPress() {

  }

  newLista() {
    if (this.props.Bill !== '') {
      let totalInsumos = 0;
      let totalEstudios = 0;
      let totalOtros = 0;

      let Insumos = [];
      let Estudios = [];
      let Otros = [];

      this.props.Bill.forEach((bill) => {
        if (bill.Cuenta.Type === 'Farmacia') {
          bill.Cuenta.List.forEach((desglose) => {
            totalInsumos += parseFloat(desglose.publicPrice) * parseFloat(desglose.cantidad);
            Insumos.push(desglose);
          });
        } else if (bill.Cuenta.Type === 'Tomografia' || bill.Cuenta.Type === 'RayosX' ||
        bill.Cuenta.Type === 'Laboratorio') {
          bill.Cuenta.List.forEach((desglose) => {
            totalEstudios += desglose.Precio * parseFloat(desglose.cantidad);
            Estudios.push(desglose);
          });
        } else if (bill.Cuenta.Type === 'Cafeteria' || bill.Cuenta.Type === 'Rehabilitacion' ||
        bill.Cuenta.Type === 'BancoSangre') {
          bill.Cuenta.List.forEach((desglose) => {
            totalOtros += desglose.Precio * parseFloat(desglose.cantidad);
            Otros.push(desglose);
          });
        }
      });
      return (
        <View>
          {this.show('Insumos', 'objectId', Insumos, totalInsumos, this.renderInsumos)}
          {this.show('Estudios', 'objectId', Estudios, totalEstudios, this.renderEstudios)}
          {this.show('Otros', 'objectId', Otros, totalOtros, this.renderEstudios)}
          <CardSection>
            <View style={{ flex: 1 }}>
              <Button onPress={this.onPayPress.bind(this)}>
                Pagar
              </Button>
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.emphasisTextStyle}> Total</Text>
              <Text style={styles.emphasisTextStyle}> ${totalInsumos + totalEstudios + totalOtros}</Text>
            </View>
          </CardSection>
        </View>
      );
    }
  }

  show(name, key, array, total, renderFunction) {
    if (total > 0) {
      return (
        <View>
          <CardSection>
            <TouchableWithoutFeedback
              onPress={() => this.setState(state => ({
              [name]: !state[name]
              }))}
            >
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.emphasisTextStyle}>{name}</Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={[styles.emphasisTextStyle, { textAlign: 'right' }]}
                >
                  ${total}
                </Text>
              </View>
            </View>
            </TouchableWithoutFeedback>
          </CardSection>
          {this.listaObjetos(this.state[name], array, key, renderFunction)}
        </View>
      );
    }
  }

  listaObjetos(boolean, array, key, renderFunction) {
    if (boolean) {
      return (
        <View>
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
                Precio
              </Text>
            </View>
          </CardSection>
          <CardSection>
            <FlatList
              data={array}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              //Item Separator View
              renderItem={({ item }) => (
                renderFunction(item)
              )}
              enableEmptySections
              style={{ marginTop: 10 }}
              keyExtractor={(item) => item[key]}
            />
          </CardSection>
        </View>
      );
    }
  }
  lista() {
    return (
      <FlatList
        data={this.props.Patient}
        renderItem={({ item }) => (
          this.renderIt(item)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.curp}
      />
    );
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
            {this.lista()}
          </CardSection>
        </View>
      );
    }
    return (
      <View>
        <CardSection>
          <Button onPress={this.onOtherBillPress.bind(this)}>
            Buscar cuentas de otro paciente
          </Button>
        </CardSection>
        <CardSection>
            <Text style={styles.emphasisTextStyle}>Nombre: </Text>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.patientTextStyle, { textAlign: 'right' }]}
            >
              {this.state.Paciente.names} {this.state.Paciente.lastName1} {this.state.Paciente.lastName2}
            </Text>
          </View>
        </CardSection>
        <View
          style={{
            height: 0.5,
            width: '90%',
            backgroundColor: '#080808',
          }}
        />
        {this.newLista()}
      </View>
    );
  }

  updatePaciente(item) {
    this.setState({ Paciente: item, buscarPaciente: false });
    this.props.queryFunc({
      type: 'containedIn',
      object: 'Bill',
      variable: 'Paciente',
      text: [item.objectId] });
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.props.text.clear();
  };

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

  renderInsumos(item) {
    return (
      <CardSection>
        <View style={{ flex: 1 }}>
          <Text style={[styles.textStyle, { textAlign: 'left', fontSize: 14 }]}>
            {item.name} - {item.presentation} {item.content}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'center', fontSize: 14 }]}
          >
            {item.cantidad}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'right', fontSize: 14 }]}
          >
            {item.publicPrice}
          </Text>
        </View>
      </CardSection>
    );
  }

  renderEstudios(item) {
    return (
      <CardSection>
        <View style={{ flex: 1 }}>
          <Text style={[styles.textStyle, { textAlign: 'left', fontSize: 14 }]}>
            {item.Concepto}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'center', fontSize: 14 }]}
          >
            {item.cantidad}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.textStyle, { textAlign: 'right', fontSize: 14 }]}
          >
            {item.Precio}
          </Text>
        </View>
      </CardSection>
    );
  }

  renderIt(item) {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
        );
      }
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

  render() {
      console.log(this.state);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.buscarPaciente()}
          <CardSection />
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

const mapStateToProps = ({ query }) => {
 const { text, Patient, Ocupacion, Bill } = query;
 console.log(query);
 return { text, Patient, Ocupacion, Bill };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc })(PatientBill);
