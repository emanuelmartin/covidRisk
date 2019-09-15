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
import { ComponentePaciente, ComponenteMedico, ComponenteHabitacion, ComponenteEspecialidad, ComponenteConsultorio } from '../Listas';
import { queryFunc, cleanFunc, session } from '../../actions';

class PatientSelect extends React.Component {
  static navigationOptions = {
    title: 'Nuevo ingreso',
  };

  constructor(props) {
    super(props);
    //setting default state
    let Patient = { names: '' };
    let Medico = { names: '' };
    let Especialidad = { name: '' };
    let Consultorio = { ID: '' };
    let Habitacion = { ID: '', query: false };
    this.state = { isLoading: false, search: '', Habitacion, Patient, Medico, Especialidad, Consultorio, pacienteAnonimo: false };
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
        if (tipo === 'Patient') {
        return (
        <TouchableWithoutFeedback
        onPress={() => this.updateField(item, tipo, busqueda)}
        >
          <View>
              <ComponentePaciente item={item}/>
          </View>
        </TouchableWithoutFeedback>
      ); }

      if (tipo === 'Medico') {
      return (
      <TouchableWithoutFeedback
      onPress={() => this.updateField(item, tipo, busqueda)}
      >
        <View>
            <ComponenteMedico item={item}/>
        </View>
      </TouchableWithoutFeedback>
    ); }

    if (tipo === 'Especialidad') {
    return (
    <TouchableWithoutFeedback
    onPress={() => this.updateField(item, tipo, busqueda)}
    >
      <View>
          <ComponenteEspecialidad item={item}/>
      </View>
    </TouchableWithoutFeedback>
  ); }

  if (tipo === 'Habitacion') {
  return (
  <TouchableWithoutFeedback
  onPress={() => this.updateField(item, tipo, busqueda)}
  >
    <View>
        <ComponenteHabitacion item={item}/>
    </View>
      </TouchableWithoutFeedback>
  );
}

  if (tipo === 'Consultorio') {
    return (
    <TouchableWithoutFeedback
    onPress={() => this.updateField(item, tipo, busqueda)}
    >
      <View>
          <ComponenteConsultorio item={item}/>
      </View>
  </TouchableWithoutFeedback>
);
}
    }


  showModal(prop) {
    this.setState({ [prop]: true });
  }

  closeModal(prop) {
    this.props.queryFunc({ text: '' });
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
        <Text>Habitación</Text>
      </CardSection>
      <CardSection>
        <TouchableWithoutFeedback onPress={() => this.showModal('seleccionarHabitacion')}>
        <View >
          <ComponenteHabitacion item={this.state.Habitacion} tipo={'ingreso'} / >
        </View>
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
              disabled={item.Ocupada}
              >
              <View>
                  <ComponenteHabitacion item={item} tipo={'ingreso'}/>
              </View>
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

  seleccionarConsultorio() {
    if (this.state.Tipo === 'Consultorio') {
    return (
      <View>
      <CardSection>
        <Text>Consultorio</Text>
      </CardSection>
      <CardSection>
        <TouchableWithoutFeedback onPress={() => this.showModal('seleccionarConsultorio')}>
        <View >
          <ComponenteConsultorio item={this.state.Consultorio} / >
        </View>
        </TouchableWithoutFeedback>
      </CardSection>

      <View>
        <Modal
        isVisible={this.state.seleccionarConsultorio}
        transparent={false}
        onShow={() => this.props.queryFunc({
          type: 'startsWith',
          object: 'Ocupacion',
          variable: 'Tipo',
          text: 'Consultorio' })}
        >
      <ScrollView style={styles.viewStyle}>
      <CardSection>
          {this.lista('Ocupacion', 'seleccionarConsultorio')}
          </CardSection>
        </ScrollView>
        <CardSection>
          <Button onPress={() => this.closeModal('seleccionarConsultorio')}>
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
            onPress={() => this.setState({ pacienteAnonimo: !this.state.pacienteAnonimo, Patient: { objectId: 'Anónimo', names: 'Anónimo' } })}
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
      <Text>Paciente</Text>
    </CardSection>
    <CardSection>
      <TouchableWithoutFeedback onPress={() => this.showModal('buscarPaciente')}>
      <View>
        <ComponentePaciente item={this.state.Patient}/>
        </View>
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
        this.state.Tipo === 'Cirugía ambulatoria' ||
        this.state.Tipo === 'Consulta') {
    return (
    <View>
    <CardSection>
      <Text>Médico titular</Text>
    </CardSection>
    <CardSection>
      <TouchableWithoutFeedback onPress={() => this.showModal('seleccionarMedicoTitular')}>
        <View>
          <ComponenteMedico item={this.state.Medico} />
        </View>
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
      <Text>Médico de guardia</Text>
    </CardSection>
    <CardSection>
      <TouchableWithoutFeedback onPress={() => this.showModal('seleccionarMedicoGuardia')}>
      <View>
        <ComponenteMedico item={this.state.Medico} />
      </View>
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
      <Text>Especialidad</Text>
    </CardSection>
    <CardSection>
      <TouchableWithoutFeedback onPress={() => this.showModal('seleccionarEspecialidad')}>
      <View>
        <ComponenteEspecialidad item={this.state.Especialidad} />
      </View>
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
    this.setState({ Habitacion: item, seleccionarHabitacion: false, text: '' });
  }

  ingresarPaciente() {
    const IngresosActivos = Parse.Object.extend('IngresosActivos');
    const ingresos = new IngresosActivos();

    const Ocupacion = Parse.Object.extend('Ocupacion');
    const ocupacion = new Parse.Query(Ocupacion);

    const Paciente = Parse.Object.extend('Patient');
    const paciente = new Parse.Query(Paciente);
    const pacienteAnonimo = this.state.pacienteAnonimo;

    const pacientePointer = {
    __type: 'Pointer',
   className: 'Patient',
   objectId: this.state.Patient.objectId
    }

    const medicoPointer = {
    __type: 'Pointer',
   className: 'Medico',
   objectId: this.state.Medico.objectId
    }

  const ocupacionPointer = {
  __type: 'Pointer',
  className: 'Ocupacion',
  objectId: this.state.Habitacion.objectId
  }

  const usuarioPointer = {
  __type: 'Pointer',
  className: '_User',
  objectId: this.props.user.id
  }

    ingresos.set('Tipo', this.state.Tipo);
    ingresos.set('estadoActual', this.state.Tipo);
    ingresos.set('paciente', pacientePointer);
    ingresos.set('ingresadoPor', usuarioPointer)
    ingresos.set('pacienteAnonimo', pacienteAnonimo)

    paciente.get(this.state.Patient.objectId.toString())
    .then((ingresado) => {
      ingresado.set('ingresado', true);
      ingresado.save()
    });


    function actualizarOcupacion(habitacionID) {
      ocupacion.get(habitacionID)
      .then((ocupado) => {
        ocupado.set('Ocupada', true);
        ocupado.set('OcupadaPor', pacientePointer);
        ocupado.save();
      });
    }

    switch (this.state.Tipo) {
      case 'Cirugía ambulatoria':
        ingresos.set('medicoTitular', medicoPointer);
        ingresos.set('Alta', false);
        break;
      case 'Cirugía mayor':
        ingresos.set('medicoTitular', medicoPointer);
        ingresos.set('habitacion', ocupacionPointer);
        ingresos.set('Alta', false);
        actualizarOcupacion(this.state.Habitacion.objectId.toString());
        break;
      case 'Urgencias':
      ingresos.set('Alta', false);
        ingresos.set('medicoGuardia', medicoPointer);
        break;
      case 'Hospitalización':
      ingresos.set('Alta', false);
        ingresos.set('medicoTitular', medicoPointer);
        ingresos.set('habitacion', ocupacionPointer);
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

const mapStateToProps = ({ query, auth }) => {
 const { text, Patient, Ocupacion, Medico, Especialidad, Consultorio } = query;
 const { user } = auth;
 console.log(query);
 console.log(auth);
 return { text, Patient, Ocupacion, Medico, Especialidad, user, Consultorio };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, session })(PatientSelect);
