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
//import Parse from 'parse/react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { CardSection, Button } from './common';
import { queryFunc, cleanFunc, addBill } from '../actions';

class OutputItemScreen extends Component {
  static navigationOptions = {
    title: 'Ventas',
  };

  constructor(props) {
    super(props);
    //setting default state
    const Paciente = { names: '' };
    const Medicamento = { name: '' };
    const Medicamentos = [];

    this.state = { searchPharmacy: true, Paciente, Medicamento, Medicamentos };
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
            searchPharmacy: true,
            Paciente: { names: '' },
            Medicamento: { name: '' },
            Medicamentos: []
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

  onAddPress() {
    this.setState({ searchPharmacy: true });
  }

  onEliminatePress() {
    this.setState({ Medicamento: { name: '' }, Medicamentos: [], searchPharmacy: true });
  }

  onNewPatientPress() {
    this.setState({ Paciente: { names: '' },
    Medicamento: { name: '' },
    Medicamentos: [],
    searchPharmacy: true
    });
  }

  onBillPress() {
    this.props.addBill({ patient: this.state.Paciente, bill: this.state.Medicamentos });
  }

  updatePaciente(item) {
    this.setState({ Paciente: item });
    this.props.queryFunc({ text: '' });
  }

  updateMedicamento(item) {
    item.cantidad = '1';
    this.setState({ Medicamento: item, searchPharmacy: false });
    this.props.queryFunc({ text: '' });
  }

  addMedicamento(item) {
    this.updateMedicamento(item);
    this.setState(state => ({
    Medicamentos: [...state.Medicamentos, state.Medicamento]
    }));
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.props.text.clear();
  };

  listaMedicamento() {
    return (
      <FlatList
        data={this.props.Farmacia}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item }) => (
          this.renderMedicamento(item)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.code}
      />
    );
  }

  listaMedicamentoAnadido() {
    return (
      <FlatList
        data={this.state.Medicamentos}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item }) => (
          this.renderMedicamentos(item)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.code}
      />
    );
  }

  listaPaciente() {
    return (
      <FlatList
        data={this.props.Patient}
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

  buscarMedicamento() {
    if (this.state.searchPharmacy === true) {
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
                object: 'Farmacia',
                variable: 'name',
                text })}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Nombre del medicamento"
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.listaMedicamento()}
          </CardSection>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CardSection>
            <Text style={styles.enphasisTextStyle}>Medicamentos:</Text>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.enphasisTextStyle, { textAlign: 'right' }]}
            >
              Cantidad:
            </Text>
          </View>
        </CardSection>
        <CardSection>
          {this.listaMedicamentoAnadido()}
        </CardSection>
        <CardSection>
          <Button onPress={this.onAddPress.bind(this)}>
            Añadir Medicamento
          </Button>
          <Button onPress={this.onEliminatePress.bind(this)}>
            Eliminar
          </Button>
        </CardSection>
          <Button onPress={this.onBillPress.bind(this)}>
            Añadir a cuenta
          </Button>
        <CardSection>
        </CardSection>
      </View>
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
            <Text style={styles.enphasisTextStyle}>Paciente: </Text>
            <View style={{ flex: 1 }}>
              <Text style={[styles.patientTextStyle, { textAlign: 'right' }]}>
                {this.state.Paciente.names} {this.state.Paciente.lastName1} {this.state.Paciente.lastName2}
              </Text>
            </View>
        </CardSection>
        <CardSection>
          {this.buscarMedicamento()}
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

  renderMedicamento(item) {
      return (
      <TouchableWithoutFeedback
      onPress={() => this.addMedicamento(item)}
      >
        <View>
          <Text style={styles.textStyle} >
            {item.laboratory} - {item.name} {item.presentation} {item.content}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderMedicamentos(item) {
      return (
        <CardSection>
          <Text style={styles.patientTextStyle}>
            {item.laboratory} - {item.name} {item.presentation} {item.content}
          </Text>
          <TextInput
            placeholder="0"
            value={item.cantidad}
            keyboardType="numeric"
            autoCorrect={false}
            style={styles.inputStyle}
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

  render() {
      console.log(this.state);

    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          {this.buscarPaciente()}
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
  enphasisTextStyle: {
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

const mapStateToProps = ({ query }) => {
 const { text, Patient, Farmacia } = query;
 console.log(query);
 return { text, Patient, Farmacia };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, addBill })(OutputItemScreen);
