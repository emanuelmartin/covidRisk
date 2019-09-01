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

class AdminQuirofano extends React.Component {
  static navigationOptions = {
    title: 'Añadir cirugía'
  };

  constructor(props) {
    super(props);
    //setting default state
    let Patient = { names: 'Selecciona un paciente' };
    let Medico = { names: 'Selecciona un médico' };
    let tipoCirugia = { name: 'Selecciona un tipo de cirugía' };
    let Insumos = { names: 'Añade los insumos correspondientes' };
    let rentaEquipos = { names: 'Añade la renta de equipos' };
    let extras = { names: 'Añade los extras' };
    let sangre = { names: 'Añade las unidades de sangre' }
    this.state = { isLoading: false, search: '', Patient, Medico, tipoCirugia, Insumos, rentaEquipos, extras, sangre, pacienteAnonimo: false };
    this.arrayholder = [];
  }

    renderIt(item, tipo, busqueda) {
      console.log(item)
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
            <Text style={styles.textStyle} >{item.name} {item.Tipo} {item.createdAt} {item.names} {item.lastName1} {item.lastName2} </Text>
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


  buscarPaciente() {
    if (!this.state.pacienteAnonimo) {
      return (
    <View>
    <CardSection>
      <Text>Paciente</Text>
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
  );
}
  }

  seleccionarMedicos() {
    return (
    <View>
    <CardSection>
      <Text>Equipo médico</Text>
    </CardSection>
    <CardSection>
        <Button onPress={() => this.showModal('seleccionarMedicos')}>Agregar médico</Button>
    </CardSection>
      <View style={{ paddingTop: 50 }}>
        <TouchableWithoutFeedback onPress={() => this.setState({ seleccionarMedicos: false })}>
        <View>
          <Modal
          isVisible={this.state.seleccionarMedicos}
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
              {this.lista('Medico', 'seleccionarMedicos')}
            </CardSection>
            <CardSection>
              <Button onPress={() => this.navigateToScreen('SignupForm')}>
                Añadir médico
              </Button>
            </CardSection>
            <CardSection>
              <Button onPress={() => this.closeModal('seleccionarMedicos')}>
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

agregarInsumos() {
  return (
  <View>
  <CardSection>
    <Text>Insumos</Text>
  </CardSection>
  <CardSection>
      <Button onPress={() => this.showModal('agregarInsumos')}>Agregar insumos</Button>
  </CardSection>
    <View style={{ paddingTop: 50 }}>
      <TouchableWithoutFeedback onPress={() => this.setState({ agregarInsumos: false })}>
      <View>
        <Modal
        isVisible={this.state.agregarInsumos}
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
                object: 'Farmacia',
                variable: 'name',
                text })}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Ingresa el nombre comercial..."
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.lista('Farmacia', 'agregarInsumos')}
          </CardSection>
          <CardSection>
            <Button onPress={() => this.closeModal('agregarInsumos')}>
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

agregarSangre() {
  return (
  <View>
  <CardSection>
    <Text>Unidades de sangre</Text>
  </CardSection>
  <CardSection>
    <TouchableWithoutFeedback onPress={() => this.showModal('agregarSangre')}>
      <Text>{this.state.sangre.names}</Text>
    </TouchableWithoutFeedback>
  </CardSection>
    <View style={{ paddingTop: 50 }}>
      <TouchableWithoutFeedback onPress={() => this.setState({ agregarSangre: false })}>
      <View>
        <Modal
        isVisible={this.state.agregarSangre}
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
                object: 'UnidadesSangre',
                variable: 'ID',
                text })}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Ingresa el folio de la unidad..."
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.lista('UnidadesSangre', 'agregarSangre')}
          </CardSection>
          <CardSection>
            <Button onPress={() => this.closeModal('agregarSangre')}>
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

rentaEquipos() {
  return (
  <View>
  <CardSection>
    <Text>Renta de equipos</Text>
  </CardSection>
  <CardSection>
    <TouchableWithoutFeedback onPress={() => this.showModal('rentaEquipos')}>
      <Text>{this.state.rentaEquipos.names}</Text>
    </TouchableWithoutFeedback>
  </CardSection>
    <View style={{ paddingTop: 50 }}>
      <TouchableWithoutFeedback onPress={() => this.setState({ rentaEquipos: false })}>
      <View>
        <Modal
        isVisible={this.state.rentaEquipos}
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
            {this.lista('Medico', 'rentaEquipos')}
          </CardSection>
          <CardSection>
            <Button onPress={() => this.closeModal('rentaEquipos')}>
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

extras() {
  return (
  <View>
  <CardSection>
    <Text>Extras</Text>
  </CardSection>
  <CardSection>
    <TouchableWithoutFeedback onPress={() => this.showModal('extras')}>
      <Text>{this.state.extras.names}</Text>
    </TouchableWithoutFeedback>
  </CardSection>
    <View style={{ paddingTop: 50 }}>
      <TouchableWithoutFeedback onPress={() => this.setState({ extras: false })}>
      <View>
        <Modal
        isVisible={this.state.extras}
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
            {this.lista('Medico', 'extras')}
          </CardSection>
          <CardSection>
            <Button onPress={() => this.closeModal('extras')}>
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

  seleccionarTipoCirugia() {
    return (
    <View>
    <CardSection>
      <Text>Tipo de cirugía</Text>
    </CardSection>
    <CardSection>
      <TouchableWithoutFeedback onPress={() => this.showModal('seleccionarTipoCirugia')}>
        <Text>{this.state.tipoCirugia.name}</Text>
      </TouchableWithoutFeedback>
    </CardSection>
      <View style={{ paddingTop: 50 }}>
        <TouchableWithoutFeedback onPress={() => this.setState({ seleccionarTipoCirugia: false })}>
        <View>
          <Modal
          isVisible={this.state.seleccionarTipoCirugia}
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
                  object: 'tipoCirugia',
                  variable: 'name',
                  text })}
                onClear={() => this.props.queryFunc({ text: '' })}
                placeholder="Ingresa el nombre de la cirugía..."
                value={this.props.text}
              />
              </CardSection>
            <CardSection>
              {this.lista('tipoCirugia', 'seleccionarTipoCirugia')}
            </CardSection>
            <CardSection>
              <Button onPress={() => this.closeModal('seleccionarTipoCirugia')}>
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

  updateField(item, tipo, busqueda) {
    this.props.text = '';
    this.setState({ [tipo]: item, [busqueda]: false, text: '' });
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

    return (
      <ScrollView style={{ flex: 1 }}>

        {this.buscarPaciente()}
        {this.seleccionarTipoCirugia()}
        {this.seleccionarMedicos()}
        {this.agregarInsumos()}
        {this.agregarSangre()}
        {this.rentaEquipos()}
        {this.extras()}

        <CardSection>
          <Button onPress={() => this.ingresarPaciente()}>Agregar cirugía</Button>
        </CardSection>
      </ScrollView>
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
 const { text, Patient, Ocupacion, Medico, Especialidad, tipoCirugia, UnidadesSangre } = query;
 console.log(query);
 return { text, Patient, Ocupacion, Medico, Especialidad, tipoCirugia, UnidadesSangre };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc })(AdminQuirofano);
