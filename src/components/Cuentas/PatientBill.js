import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView
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
    this.state = { isLoading: false, search: '', Paciente };
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

  setStyle(estado) {
    if (estado) {
      return ({
      padding: 10,
      backgroundColor: '#F55E64'
      });
    }
    return ({
      padding: 10,
      backgroundColor: '#53E69D'
    });
  }

  onOtherBillPress() {
    this.setState({ Paciente: { names: '' } });
    this.props.cleanFunc();
  }

  onPayPress() {

  }

  lista() {
    return (
      <FlatList
        data={this.props.Patient}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item }) => (
          this.renderIt(item)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.curp}
      />
    );
  }

  listaCuenta() {
    return (
      <FlatList
        data={this.props.Bill}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item }) => (
          this.renderCuenta(item)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.objectId}
      />
    );
  }

  listaConsumo(array) {
    if (array[0] === 'Farmacia') {
      return (
        <FlatList
          data={array[1]}
          //Item Separator View
          renderItem={({ item }) => (
            this.renderConsumo(item)
          )}
          enableEmptySections
          style={{ marginTop: 10 }}
          keyExtractor={(item) => item.code}
        />
      );
    } else if (array[0] === 'Rehabilitacion' || array[0] === 'BancoSangre' ||
              array[0] === 'RayosX' || array[0] === 'Laboratorio' ||
              array[0] === 'Tomografia' || array[0] === 'Cafeteria') {
      return (
        <FlatList
          data={array[1]}
          //Item Separator View
          renderItem={({ item }) => (
            this.renderConsumo1(item)
          )}
          enableEmptySections
          style={{ marginTop: 10 }}
          keyExtractor={(item) => item.code}
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
        {this.listaCuenta()}

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

  renderCuenta(item) {
    let totalPrice = 0;
    if (item.Cuenta[0] === 'Farmacia') {
      item.Cuenta[1].forEach((aux) => {
        totalPrice += parseFloat(aux.cantidad) * parseFloat(aux.publicPrice);
      });
    } else if (item.Cuenta[0] === 'Rehabilitacion' || item.Cuenta[0] === 'BancoSangre' ||
              item.Cuenta[0] === 'RayosX' || item.Cuenta[0] === 'Laboratorio' ||
              item.Cuenta[0] === 'Tomografia' || item.Cuenta[0] === 'Cafeteria') {
      item.Cuenta[1].forEach((aux) => {
        totalPrice += aux.cantidad * aux.Precio;
      });
    }


    return (
      <View>
        <CardSection>
            <Text style={styles.emphasisTextStyle}>Cuenta: </Text>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.patientTextStyle, { textAlign: 'right' }]}
            >
              {item.objectId}
            </Text>
          </View>
        </CardSection>
        <CardSection>
          <View style={{ flex: 1 }}>
            <Text style={[styles.emphasisTextStyle, { textAlign: 'left', fontSize: 16}]}>
              Descripción
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.emphasisTextStyle, { textAlign: 'center', fontSize: 16}]}
            >
              Cantidad
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.emphasisTextStyle, { textAlign: 'right', fontSize: 16}]}
            >
              Precio
            </Text>
          </View>
        </CardSection>
        {this.listaConsumo(item.Cuenta)}
        <CardSection>
          <View style={{ flex: 1 }}>
            <Button onPress={this.onPayPress.bind(this)}>
              Pagar
            </Button>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.emphasisTextStyle}> Total</Text>
            <Text style={styles.emphasisTextStyle}> ${totalPrice.toString()}</Text>
          </View>
        </CardSection>
      </View>
    );
  }

  renderConsumo(item) {
    return (
      <View>
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
      </View>
    );
  }

  renderConsumo1(item) {
    return (
      <View>
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
      </View>
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
