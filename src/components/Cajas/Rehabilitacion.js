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
import { NavigationActions } from 'react-navigation';
import { SearchBar, Icon } from 'react-native-elements';
import { CardSection, Button, Spinner } from '../common';
import { queryFunc, cleanFunc, addBill, clearBill, payment } from '../../actions';

class Rehabilitation extends Component {
  static navigationOptions = {
    title: 'Rehabilitación',
  };

  constructor(props) {
    super(props);
    //setting default state
    const Paciente = { names: '' };
    const Terapia = { name: '' };
    const Terapias = [];

    this.state = { searchItem: true, Paciente, Terapia, Terapias };
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
            Terapia: { name: '' },
            Terapias: []
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
    this.setState({ Terapia: { name: '' }, Terapias: [], searchItem: true });
  }

  onNewPatientPress() {
    this.props.cleanFunc();
    this.setState({ Paciente: { names: '' },
    Terapia: { name: '' },
    Terapias: [],
    searchItem: true
    });
  }

  onBillPress() {
    this.props.addBill({
      patient: this.state.Paciente.objectId,
      bill: { Type: 'Rehabilitacion', List: this.state.Terapias }
    });
  }

  onNewBillPress() {
    this.setState({
      searchItem: true,
      Paciente: { names: '' },
      Terapia: { name: '' },
      Terapias: []
    });
    this.props.clearBill();
    this.props.cleanFunc();
  }

  updatePaciente(item) {
    this.setState({ Paciente: item });
    this.props.queryFunc({ text: '' });
  }

  updateTerapia(item) {
    item.cantidad = '1';
    this.setState({ Terapia: item, searchItem: false });
    this.props.queryFunc({ text: '' });
  }

  addTerapia(item) {
    this.updateTerapia(item);
    this.setState(state => ({
    Terapias: [...state.Terapias, state.Terapia]
    }));
  }

  updateQuantity(index, cantidad) {
    const newMeds = this.state.Terapias;
    newMeds[index].cantidad = cantidad;
    this.setState({ Terapias: newMeds });
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.props.text.clear();
  };

  listaTerapia() {
    return (
      <FlatList
        data={this.props.Rehabilitacion}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item }) => (
          this.renderTerapia(item)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.code}
      />
    );
  }

  listaTerapiaAnadido() {
    return (
      <FlatList
        data={this.state.Terapias}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item, index }) => (
          this.renderTerapias(item, index)
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

  buscarTerapia() {
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
                object: 'Rehabilitacion',
                variable: 'Concepto',
                text })}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Nombre de la terapia"
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.listaTerapia()}
          </CardSection>
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <CardSection>
            <Text style={styles.emphasisTextStyle}>Terapias:</Text>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.emphasisTextStyle, { textAlign: 'right' }]}
            >
              Cantidad:
            </Text>
          </View>
        </CardSection>
        <CardSection>
          {this.listaTerapiaAnadido()}
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
          {this.buscarTerapia()}
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
            Añadir Terapia
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

  renderTerapia(item) {
      return (
      <TouchableWithoutFeedback
      onPress={() => this.addTerapia(item)}
      >
        <View>
          <Text style={styles.textStyle} >
            {item.Concepto}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderTerapias(item, index) {
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
 const { text, Patient, Rehabilitacion } = query;
 const { loading, error, succes } = bill;
 console.log(query);
 return { text, Patient, Rehabilitacion, loading, error, succes };
};

export default connect(
  mapStateToProps,
  { queryFunc, cleanFunc, addBill, clearBill })(Rehabilitation);
