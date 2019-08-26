import * as React from 'react';
import Parse from 'parse/react-native';
import { Picker } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { ComponentePaciente } from '../Listas';

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Button, CardSection } from '../common';
import { queryFunc, cleanFunc } from '../../actions';

export default class PacientesActivos extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { Tipo: 'Habitación', isLoading: true, search: '' };
    this.arrayholder = [];
  }
  static navigationOptions = {
    title: 'Pacientes activos',
  };

  loadData() {
    console.log('Carga de información')
    const Ingresos = Parse.Object.extend('Ingresos');
    const ingresos = new Parse.Query(Ingresos);
    ingresos.include('paciente');
    ingresos.include('habitacion');
    ingresos.include('medicoTitular');

    let jsonArray = [];

    ingresos.equalTo('Alta', false);
    ingresos.find().then((results) => {
        for (let i = 0; i < results.length; i++) {

          const ingreso = [];
          const obj = results[i];
          console.log(obj)

          if (obj.attributes.Tipo === 'Urgencias') { tipoMedico = 'MedicoGuardia'}

          let pacientee = obj.get('paciente');
          let medicoo = obj.get('medicoTitular');
          let habitacionn = obj.get('habitacion');


          ingreso.alta = results[i].attributes.Alta;
          ingreso.fecha = results[i].attributes.Fecha;
          ingreso.tipo = results[i].attributes.Tipo;
          ingreso.paciente = pacientee.attributes;
          ingreso.medico = medicoo.attributes;
          ingreso.habitacion = habitacionn.attributes;

          jsonArray.push(ingreso);
        }
        console.log(jsonArray)
      this.setState({ isLoading: false, pacientesActivos: jsonArray });
  });
}

async query() {
  this.setState({ isLoading: true })
  const parseObject = Parse.Object.extend('Patient');
  const query = new Parse.Query(parseObject);
  let jsonArray = [];
  query['equalTo']('ingresado', true);
  query.find().then((results) => {
      for (let i = 0; i < results.length; i++) {
         jsonArray.push(results[i].toJSON());
      }
      console.log(jsonArray)
    this.setState({ isLoading: false, pacientesActivos: jsonArray });
});
}

  setStyle(estado) {
    if (estado) { return ({
        padding: 10,
        backgroundColor: '#F55E64'
      });}
  else { return ({
    padding: 10,
    backgroundColor: '#53E69D'
  });}
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

  render() {
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
          {this.loadData()}
        </View>
      );
    }
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
      <ScrollView style={styles.viewStyle}>
      <CardSection>
          <FlatList
            data={this.state.pacientesActivos}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //Item Separator View
            renderItem={({ item }) => (
              // Single Comes here which will be repeatative for the FlatListItems
              <TouchableWithoutFeedback
              onPress={this.navigateToScreen('PatientDetail', item)}
              >
              <View>
                  <ComponentePaciente item={item.paciente}/>
              </View>
              </TouchableWithoutFeedback>
            )}
            enableEmptySections
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
          </CardSection>
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
  footerButton: {

  }
});
