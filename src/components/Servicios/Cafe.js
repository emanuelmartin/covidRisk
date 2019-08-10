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
import { CardSection, Button, Spinner } from '../common';
import { queryFunc, cleanFunc, addBill, clearBill } from '../../actions';

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

    this.state = { searchItem: true, Paciente, Alimento, Alimentos };
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
      bill: ['Cafeteria', this.state.Alimentos]
    });
  }

  onNewBillPress() {
    this.setState({
      searchItem: true,
      Paciente: { names: '' },
      Alimento: { name: '' },
      Alimentos: []
    });
    this.props.clearBill();
    this.props.cleanFunc();
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
    return (
      <FlatList
        data={this.props.Cafeteria}
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

  buscarAlimento() {
    if (this.state.searchItem === true) {
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
                object: 'Cafeteria',
                variable: 'Concepto',
                text })}
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
        {this.renderError()}
        {this.renderButtons()}
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
        <CardSection>
          <Button onPress={this.onBillPress.bind(this)}>
            Añadir a cuenta
          </Button>
        </CardSection>
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
            {item.Concepto}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderAlimentos(item, index) {
      return (
        <CardSection>
          <Text style={styles.patientTextStyle}>
            {item.Concepto}
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
    if (this.props.succes) {
      return (
        <CardSection>
          <Button onPress={this.onNewBillPress.bind(this)}>
            Nueva cuenta
          </Button>
        </CardSection>
      );
    }
    return (
      <View>
        {this.buscarPaciente()}
      </View>
    );
  }

  render() {
      console.log(this.state);

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
  }
});

const mapStateToProps = ({ query, bill }) => {
 const { text, Patient, Cafeteria } = query;
 const { loading, error, succes } = bill;
 console.log(query);
 return { text, Patient, Cafeteria, loading, error, succes };
};

export default connect(
  mapStateToProps,
  { queryFunc, cleanFunc, addBill, clearBill })(Cafe);
