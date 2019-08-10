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
import Parse from 'parse/react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from 'react-native-modal';
import { Button, CardSection } from '../common';
import { queryFunc, cleanFunc } from '../../actions';

class PatientSelect extends React.Component {
  static navigationOptions = {
    title: 'Nuevo ingreso',
  };

  constructor(props) {
    super(props);
    //setting default state
    let Patient = { names: 'Paciente' };
    let User = { names: 'Médico' };
    let Habitacion = { ID: 'Habitación', query: false };
    this.state = { isLoading: false, search: '', Habitacion, Patient, User, pacienteAnonimo: false };
    this.arrayholder = [];
  }

    renderIt(item, tipo, busqueda) {
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
        onPress={() => this.updateField(item, tipo, busqueda)}
        >
          <View>
            <Text style={styles.textStyle} >{item.names} {item.lastName1} {item.lastName2} </Text>
          </View>
        </TouchableWithoutFeedback>
      );
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

  showModal(prop) {
    this.setState({ [prop]: true });
  }

  closeModal(prop) {
    this.setState({ [prop]: false });
  }

  lista(objeto, busqueda) {
    return (
      <FlatList
        data={this.props[objeto]}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item }) => (
          this.renderIt(item, objeto, busqueda)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.curp}
      />
    );
  }

  seleccionarHabitacion() {
    if (this.state.Tipo === 'Hospitalización' ||
        this.state.Tipo === 'Cirugía mayor') {
    return (
      <View>
      <CardSection>
        <Text>Selecciona una habitación</Text>
      </CardSection>
      <CardSection>
        <TouchableWithoutFeedback onPress={() => this.showModal('seleccionarHabitacion')}>
          <Text>{this.state.Habitacion.ID}</Text>
        </TouchableWithoutFeedback>
      </CardSection>

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
        <CardSection>
          <Button onPress={() => this.closeModal('seleccionarHabitacion')}>
            Cancelar
          </Button>
        </CardSection>
        </Modal>
      </View>
      </View>
    );}
  }

pacienteAnonimo() {
  if (this.state.Tipo === 'Urgencias') {
    return (
      <View>
        <CardSection>
          <CheckBox
            title='Paciente anónimo'
            checked={this.state.pacienteAnonimo}
            onPress={() => this.setState({ pacienteAnonimo: !this.state.pacienteAnonimo })}
            />
        </CardSection>
      </View>
    );
  }
}

  buscarPaciente() {
    if (!this.state.pacienteAnonimo) {
      return (
    <View>
    <CardSection>
      <Text>Selecciona un paciente</Text>
    </CardSection>
    <CardSection>
      <TouchableWithoutFeedback onPress={() => this.showModal('buscarPaciente')}>
        <Text>{this.state.Patient.names}</Text>
      </TouchableWithoutFeedback>
    </CardSection>
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
              {this.lista('Patient', 'buscarPaciente')}
            </CardSection>
            <CardSection>
              <Button onPress={() => this.navigateToScreen('PatientForm')}>
                Añadir paciente
              </Button>
            </CardSection>
            <CardSection>
              <Button onPress={() => this.closeModal('buscarPaciente')}>
                Cancelar
              </Button>
            </CardSection>
            </View>
          </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </View>
    </View>
  ); }
  }

  seleccionarMedicoTitular() {
    if (this.state.Tipo === 'Hospitalización' ||
        this.state.Tipo === 'Cirugía mayor' ||
        this.state.Tipo === 'Cirugía ambulatoria') {
    return (
    <View>
    <CardSection>
      <Text>Selecciona un médico titular</Text>
    </CardSection>
    <CardSection>
      <TouchableWithoutFeedback onPress={() => this.showModal('seleccionarMedicoTitular')}>
        <Text>{this.state.User.names}</Text>
      </TouchableWithoutFeedback>
    </CardSection>
      <View style={{ paddingTop: 50 }}>
        <TouchableWithoutFeedback onPress={() => this.setState({ seleccionarMedicoTitular: false })}>
        <View>
          <Modal
          isVisible={this.state.seleccionarMedicoTitular}
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
                  object: 'User',
                  variable: 'lastName1',
                  text })}
                onClear={() => this.props.queryFunc({ text: '' })}
                placeholder="Ingresa el primer apellido..."
                value={this.props.text}
              />
              </CardSection>
            <CardSection>
              {this.lista('User', 'seleccionarMedicoTitular')}
            </CardSection>
            <CardSection>
              <Button onPress={() => this.navigateToScreen('SignupForm')}>
                Añadir médico
              </Button>
            </CardSection>
            <CardSection>
              <Button onPress={() => this.closeModal('seleccionarMedicoTitular')}>
                Cancelar
              </Button>
            </CardSection>
            </View>
          </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </View>
    </View>
  );
}
  }

  seleccionarMedicoGuardia() {
    if (this.state.Tipo === 'Urgencias') {
    return (
    <View>
    <CardSection>
      <Text>Selecciona un médico de guardia</Text>
    </CardSection>
    <CardSection>
      <TouchableWithoutFeedback onPress={() => this.showModal('seleccionarMedicoGuardia')}>
        <Text>{this.state.User.names}</Text>
      </TouchableWithoutFeedback>
    </CardSection>
      <View style={{ paddingTop: 50 }}>
        <TouchableWithoutFeedback onPress={() => this.setState({ seleccionarMedicoGuardia: false })}>
        <View>
          <Modal
          isVisible={this.state.seleccionarMedicoGuardia}
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
                  object: 'User',
                  variable: 'lastName1',
                  text })}
                onClear={() => this.props.queryFunc({ text: '' })}
                placeholder="Ingresa el primer apellido..."
                value={this.props.text}
              />
              </CardSection>
            <CardSection>
              {this.lista('User', 'seleccionarMedicoGuardia')}
            </CardSection>
            <CardSection>
              <Button onPress={() => this.navigateToScreen('SignupForm')}>
                Añadir médico
              </Button>
            </CardSection>
            <CardSection>
              <Button onPress={() => this.closeModal('seleccionarMedicoGuardia')}>
                Cancelar
              </Button>
            </CardSection>
            </View>
          </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </View>
    </View>
  );
}
  }
  updateField(item, tipo, busqueda) {
    this.setState({ [tipo]: item, [busqueda]: false });
  }

  updateHabitacion(item) {
    this.setState({ Habitacion: item, seleccionarHabitacion: false });
  }

  ingresarPaciente() {
    console.log(this.state.Paciente.objectId);
    console.log(this.state.Habitacion.objectId);
    console.log(this.state.Tipo);

    const Ingresos = Parse.Object.extend('Ingresos');
    const ingresos = new Ingresos();

    ingresos.set('Paciente', this.state.Paciente.objectId);
    ingresos.set('Habitacion', this.state.Habitacion.objectId);
    ingresos.set('Tipo', this.state.Tipo);

    ingresos.save();

    const Ocupacion = Parse.Object.extend('Ocupacion');
    const ocupacion = new Parse.Query(Ocupacion);
    ocupacion.get(this.state.Habitacion.objectId.toString())
    .then((ocupado) => {
      console.log(ocupado);

      ocupado.set('Ocupada', true);
      ocupado.save();
    });
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
        value: 'Hospitalización'
      }];

    return (
      <View style={{ flex: 1 }}>
        <CardSection>
          <Dropdown
          containerStyle={{ flex: 1 }}
          data={data}
          value={this.state.Tipo}
          onChangeText={value => this.setState({ Tipo: value, pacienteAnonimo: false })}
          placeholder={'Selecciona el tipo de ingreso'}
          />
        </CardSection>

        {this.pacienteAnonimo()}
        {this.buscarPaciente()}
        {this.seleccionarMedicoTitular()}
        {this.seleccionarHabitacion()}
        {this.seleccionarMedicoGuardia()}

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
 const { text, Patient, Ocupacion, User } = query;
 console.log(query);
 return { text, Patient, Ocupacion, User };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc })(PatientSelect);
