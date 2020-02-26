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
    const Ingresos = Parse.Object.extend('IngresosActivos');
    const ingresos = new Parse.Query(Ingresos);
    ingresos.limit(1000);
    ingresos.include('paciente');
    ingresos.include('ubicacion');
    ingresos.include('medico');
    ingresos.include('pacienteAnonimo');

    let jsonArray = [];

   ingresos.ascending('createdAt')
    ingresos.find().then((results) => {
        for (let i = 0; i < results.length; i++) {
          const ingreso = [];
          const ids = [];
          const obj = results[i];
          console.log(obj)
          if(!obj.attributes.Alta)
          {

          ids.ingreso = obj.id;
          ingreso.tipo = obj.attributes.Tipo;
          ingreso.estadoActual = obj.attributes.estadoActual;
          ingreso.tipoMedico = 'Médico titular'
          switch (ingreso.estadoActual) {
            case 'Urgencias': {
              ingreso.tipoMedico = 'Médico de guardia';
              const medico = obj.get('medico');
              ingreso.medico = medico.attributes;
              ids.medico = medico.id;

              const pacienteAnonimo = obj.get('pacienteAnonimo');
              if (pacienteAnonimo) {
                ingreso.paciente = { names: 'Paciente anónimo', pacienteAnonimo: true }
              } else {
              const paciente = obj.get('paciente');
              ingreso.paciente = paciente.attributes;
              ids.paciente = paciente.id;
            }
            } break;

            case 'Shock': {
              ingreso.tipoMedico = 'Médico de guardia';
              const medico = obj.get('medico');
              ingreso.medico = medico.attributes;
              ids.medico = medico.id;

              const pacienteAnonimo = obj.get('pacienteAnonimo');
              if (pacienteAnonimo) {
                ingreso.paciente = { names: 'Paciente anónimo', pacienteAnonimo: true }
              } else {
              const paciente = obj.get('paciente');
              ingreso.paciente = paciente.attributes;
              ids.paciente = paciente.id;
            }
            } break;

            case 'Cirugía mayor': {
              const medico = obj.get('medico');
              ingreso.medico = medico.attributes;
              ids.medico = medico.id;

              const paciente = obj.get('paciente');
              ingreso.paciente = paciente.attributes;
              ids.paciente = paciente.id;

              const ubicacion = obj.get('ubicacion');
              ingreso.ubicacion = ubicacion.attributes;
              ids.ubicacion = ubicacion.id;
              console.log(ingreso)
            } break;

            case 'Cirugía ambulatoria': {
              const medico = obj.get('medico');
              ingreso.medico = medico.attributes;
              ids.medico = medico.id;

              const paciente = obj.get('paciente');
              ingreso.paciente = paciente.attributes;
              ids.paciente = paciente.id;
            } break;

            case 'Hospitalización': {
              const medico = obj.get('medico');
              ingreso.medico = medico.attributes;
              ids.medico = medico.id;

              const paciente = obj.get('paciente');
              ingreso.paciente = paciente.attributes;
              ids.paciente = paciente.id;

              const ubicacion = obj.get('ubicacion');
              ingreso.ubicacion = ubicacion.attributes;
              ids.ubicacion = ubicacion.id;
            } break;
            case 'Consulta': {
              const medico = obj.get('medico');
              ingreso.medico = medico.attributes;
              ids.medico = medico.id;

              const paciente = obj.get('paciente');
              ingreso.paciente = paciente.attributes;
              ids.paciente = paciente.id;

              const ubicacion = obj.get('ubicacion');
              ingreso.ubicacion = ubicacion.attributes;
              ids.ubicacion = ubicacion.id;
            } break;
          }
          ingreso.ids = ids;
          console.log(ingreso)
          jsonArray.push(ingreso);
        }
      }
        console.log(jsonArray)
      this.setState({ isLoading: false, pacientesActivos: jsonArray });
  });
}

async query() {
  this.setState({ isLoading: true })
  const parseObject = Parse.Object.extend('IngresosActivos');
  const query = new Parse.Query(parseObject);
  let jsonArray = [];
  query.ascending('createdAt');
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
    console.log(this.state)
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
            ItemSeparatorComponent={() => { return (<View style={{ borderBottomColor: 'gray',
                borderBottomWidth: 1 }} /> ) }}
            data={this.state.pacientesActivos}
            //Item Separator View
            renderItem={({ item }) => (
              // Single Comes here which will be repeatative for the FlatListItems
              <TouchableWithoutFeedback
              onPress={this.navigateToScreen('DetalleActivos', item)}
              >
              <View>
              <CardSection>
                  <ComponentePaciente item={item} tipo={'activos'}/>
                  </CardSection>
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
