import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
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
    let Habitacion = '';
    this.state = { isLoading: false, search: '', Paciente, Habitacion };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.props.cleanFunc('Patient');
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            Patient: null,
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

  onButtonPress = () => this.setState({ Paciente: { names: '' } })

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
          <Button onPress={this.onButtonPress}>
            Buscar otro paciente
          </Button>
        </CardSection>
        <CardSection>
            <Text style={styles.patientTextStyle}>Nombre:</Text>
            <Text style={styles.patientTextStyle}> {this.state.Paciente.names}</Text>
        </CardSection>
        <CardSection>
            <Text style={styles.patientTextStyle}>Habitación:</Text>
            <Text style={styles.patientTextStyle}> 101</Text>
        </CardSection>
      </View>
    );
  }

  updatePaciente(item) {
    this.setState({ Paciente: item, buscarPaciente: false });
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

  render() {
      console.log(this.state);

    return (
      <View style={{ flex: 1 }}>
        {this.buscarPaciente()}
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
  }
});

const mapStateToProps = ({ query }) => {
 const { text, Patient, Ocupacion } = query;
 console.log(query);
 return { text, Patient, Ocupacion };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc })(PatientBill);
