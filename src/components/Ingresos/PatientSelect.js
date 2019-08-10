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
    let Medico = { names: 'Médico' };
    let Especialidad = { name: 'Especialidad' };
    let Habitacion = { ID: 'Habitación', query: false };
    this.state = { isLoading: false, search: '', Habitacion, Patient, Medico, Especialidad, pacienteAnonimo: false };
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
            <Text style={styles.textStyle} >{item.name} {item.names} {item.lastName1} {item.lastName2} </Text>
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
            onPress={() => this.setState({ pacienteAnonimo: !this.state.pacienteAnonimo, Patient: { objectId: 'Anónimo' } })}
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
        <Text>{this.state.Medico.names}</Text>
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
                  object: 'Medico',
                  variable: 'lastName1',
                  text })}
                onClear={() => this.props.queryFunc({ text: '' })}
                placeholder="Ingresa el primer apellido..."
                value={this.props.text}
              />
              </CardSection>
            <CardSection>
              {this.lista('Medico', 'seleccionarMedicoTitular')}
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
        <Text>{this.state.Medico.names}</Text>
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
                  object: 'Medico',
                  variable: 'lastName1',
                  text })}
                onClear={() => this.props.queryFunc({ text: '' })}
                placeholder="Ingresa el primer apellido..."
                value={this.props.text}
              />
              </CardSection>
            <CardSection>
              {this.lista('Medico', 'seleccionarMedicoGuardia')}
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

  seleccionarEspecialidad() {
    if (this.state.Tipo === 'Hospitalización' ||
        this.state.Tipo === 'Cirugía mayor' ||
        this.state.Tipo === 'Cirugía ambulatoria') {
    return (
    <View>
    <CardSection>
      <Text>Selecciona una especialidad</Text>
    </CardSection>
    <CardSection>
      <TouchableWithoutFeedback onPress={() => this.showModal('seleccionarEspecialidad')}>
        <Text>{this.state.Especialidad.name}</Text>
      </TouchableWithoutFeedback>
    </CardSection>
      <View style={{ paddingTop: 50 }}>
        <TouchableWithoutFeedback onPress={() => this.setState({ seleccionarEspecialidad: false })}>
        <View>
          <Modal
          isVisible={this.state.seleccionarEspecialidad}
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
                  object: 'Especialidad',
                  variable: 'name',
                  text })}
                onClear={() => this.props.queryFunc({ text: '' })}
                placeholder="Ingresa el nombre de la Especialidad..."
                value={this.props.text}
              />
              </CardSection>
            <CardSection>
              {this.lista('Especialidad', 'seleccionarEspecialidad')}
            </CardSection>
            <CardSection>
              <Button onPress={() => this.closeModal('seleccionarEspecialidad')}>
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
    this.props.text = '';
    this.setState({ [tipo]: item, [busqueda]: false, text: '' });
  }

  updateHabitacion(item) {
    this.setState({ Habitacion: item, seleccionarHabitacion: false });
  }

  ingresarPaciente() {
    console.log(this.state.Patient);
    console.log(this.state.Habitacion);
    console.log(this.state.Tipo);
    console.log(this.state.Medico);


    const Ingresos = Parse.Object.extend('Ingresos');
    const ingresos = new Ingresos();

    const Ocupacion = Parse.Object.extend('Ocupacion');
    const ocupacion = new Parse.Query(Ocupacion);

    const Paciente = Parse.Object.extend('Patient');
    const paciente = new Parse.Query(Paciente);

    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth() + 1; //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds

    const fecha = `${date}/${month}/${year}`;
    const hora = `${hours}:${min}:${sec}`;

    ingresos.set('Tipo', this.state.Tipo);
    ingresos.set('Paciente', this.state.Patient.objectId);
    ingresos.set('Fecha', fecha);
    ingresos.set('Hora', hora);

    paciente.get(this.state.Patient.objectId.toString())
    .then((ingresado) => {
      ingresado.set('ingresado', true);
      ingresado.save();
    });

    function actualizarOcupacion(habitacionID) {
      ocupacion.get(habitacionID)
      .then((ocupado) => {
        ocupado.set('Ocupada', true);
        ocupado.set('OcupadaPor', true);
        ocupado.save();
      });
    }

    switch (this.state.Tipo) {
      case 'Cirugía ambulatoria':
        ingresos.set('MedicoTitular', this.state.Medico.objectId);
        break;
      case 'Cirugía mayor':
        ingresos.set('MedicoTitular', this.state.Medico.objectId);
        ingresos.set('Habitacion', this.state.Habitacion.objectId);
        actualizarOcupacion(this.state.Habitacion.objectId.toString());
        break;
      case 'Urgencias':
        ingresos.set('MedicoGuardia', this.state.Medico.objectId);
        break;
      case 'Hospitalización':
        ingresos.set('MedicoTitular', this.state.Medico.objectId);
        ingresos.set('Habitacion', this.state.Habitacion.objectId);
        actualizarOcupacion(this.state.Habitacion.objectId.toString());
        break;
      default:
    }
    ingresos.save();
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
        {this.seleccionarEspecialidad()}
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
 const { text, Patient, Ocupacion, Medico, Especialidad } = query;
 console.log(query);
 return { text, Patient, Ocupacion, Medico, Especialidad };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc })(PatientSelect);
