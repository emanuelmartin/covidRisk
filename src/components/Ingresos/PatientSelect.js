import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Button, CardSection } from '../common';
import { queryFunc, cleanFunc } from '../../actions';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import { PatientList } from '../Patients/PatientList'
import Parse from 'parse/react-native';

class PatientSelect extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    let Paciente={names: 'Paciente'}
    let Habitacion={ID: 'Habitación', query: false}
    this.state = { isLoading: false, search: '', Paciente, Habitacion };
    this.arrayholder = [];
}
  static navigationOptions = {
    title: 'Nuevo ingreso',
  };

    showModal(prop) {
      this.setState({ [prop]: true })
    }

    closeModal(prop) {
      this.setState({ [prop]: false })
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

  seleccionarHabitacion() {
    return (
      <View>
        <Modal
        isVisible={this.state.seleccionarHabitacion}
        transparent={false}
        onShow={() => this.props.queryFunc({
          type: 'startsWith',
          object: 'Ocupacion',
          variable: 'Tipo',
          text: 'Habitación' })}
        >
      <ScrollView style={styles.viewStyle}>
      <CardSection>
          <FlatList
            data={this.props.Ocupacion}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //Item Separator View
            renderItem={({ item }) => (
              // Single Comes here which will be repeatative for the FlatListItems
              <TouchableWithoutFeedback
              onPress={() => this.updateHabitacion(item)}
              >
              <Text style={this.setStyle(item.Ocupada)} >{item.Tipo} {item.ID}</Text>
              </TouchableWithoutFeedback>
            )}
            enableEmptySections
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
          </CardSection>
        </ScrollView>
        </Modal>
      </View>
    );
  }

  buscarPaciente() {
    return (
      <View style={{ paddingTop: 50 }}>
        <TouchableWithoutFeedback onPress={() => this.setState({ buscarPaciente: false })}>
        <View>
          <Modal
          isVisible={this.state.buscarPaciente}
          transparent={false}
          >
          <TouchableWithoutFeedback>
          <View style={{ flex: 1 }}>
            <CardSection>
              <SearchBar
                containerStyle={{ flex: 1, backgroundColor: 'white' }}
                imputStyle={{ backgroundColor: 'white', marginTop: 0, marginBottom: 0 }}
                round

                searchIcon={{ size: 24 }}
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
            <CardSection>
              <Button onPress={() => this.navigateToScreen('PatientForm')}>
                Añadir paciente
              </Button>
            </CardSection>
            </View>
          </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </View>
    );
  }

updatePaciente(item) {
  this.setState({ Paciente: item, buscarPaciente: false });
}

updateHabitacion(item) {
  this.setState({ Habitacion: item, seleccionarHabitacion: false });
}

ingresarPaciente() {
  console.log(this.state.Paciente.objectId)
  console.log(this.state.Habitacion.objectId)
  console.log(this.state.Tipo)

  const Ingresos = Parse.Object.extend('Ingresos');
  const ingresos = new Ingresos();

  ingresos.set('Paciente', this.state.Paciente.objectId)
  ingresos.set('Habitacion', this.state.Habitacion.objectId)
  ingresos.set('Tipo', this.state.Tipo)

  ingresos.save();

  const Ocupacion = Parse.Object.extend('Ocupacion');
  const ocupacion = new Parse.Query(Ocupacion);
  ocupacion.get(this.state.Habitacion.objectId.toString())
  .then((ocupado) => {
    console.log(ocupado);

    ocupado.set('Ocupada', true)

    ocupado.save();
  })
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

  render() {
      console.log(this.state);
    const data = [{
        value: 'Cirugía ambulatoria',
      }, {
        value: 'Cirugía mayor',
      }, {
        value: 'Urgencias'
      }, {
        value: 'Consulta'
      }];

    return (
      <View style={{ flex: 1 }}>
        <CardSection>
          <Dropdown
          containerStyle={{ flex: 1 }}
          data={data}
          value={this.state.Tipo}
          onChangeText={value => this.setState({ Tipo: value })}
          placeholder={'Selecciona el tipo de ingreso'}
          />
        </CardSection>

        <CardSection>
          <Text>Selecciona un paciente</Text>
        </CardSection>
        <CardSection>
          <TouchableWithoutFeedback onPress={() => this.showModal('buscarPaciente')}>
            <Text>{this.state.Paciente.names}</Text>
          </TouchableWithoutFeedback>
        </CardSection>
        {this.buscarPaciente()}

        <CardSection>
          <Text>Selecciona una habitación</Text>
        </CardSection>
        <CardSection>
          <TouchableWithoutFeedback onPress={() => this.showModal('seleccionarHabitacion')}>
            <Text>{this.state.Habitacion.ID}</Text>
          </TouchableWithoutFeedback>
        </CardSection>
        {this.seleccionarHabitacion()}

        <CardSection>
          <Button onPress={() => this.ingresarPaciente()}>Ingresar paciente</Button>
        </CardSection>

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

const mapStateToProps = ({ query }) => {
 const { text, Patient, Ocupacion } = query;
 console.log(query);
 return { text, Patient, Ocupacion };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc })(PatientSelect);
