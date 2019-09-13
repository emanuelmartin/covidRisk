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
import { Button, CardSection, Input } from '../common';
import { queryFunc, cleanFunc } from '../../actions';
import { ComponentePaciente } from '../Listas';
import update from 'react-addons-update';

class AdminQuirofano extends React.Component {
  static navigationOptions = {
    title: 'Añadir cirugía'
  };

  constructor(props) {
    super(props);
    //setting default state
    let horaInicio = '';
    let horaFin = '';
    let Patient = { names: 'Selecciona un paciente' };
    let Medico = { names: 'Selecciona un médico' };
    let equipoMedico = []
    let unidadesSangre = [];
    let tipoCirugia = { name: 'Selecciona un tipo de cirugía' };
    let Insumos = [];
    let rentaEquipos = [];
    let extra = [ {name: 'sad'} ];
    let listaExtra = [];
    let sangre = { names: 'Añade las unidades de sangre' }
    this.state = { isLoading: false, search: '', Patient, Medico, tipoCirugia, Insumos, rentaEquipos, extra, sangre, pacienteAnonimo: false, seleccionarMedicos: false, seleccionarEquipos: false, extras: false, equipoMedico, unidadesSangre, listaExtra };
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
            <Text style={styles.textStyle} >{item.name} {item.Tipo} {item.names} {item.lastName1} {item.lastName2} {item.lastName2} {item.costo} </Text>
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
      />
    );
  }

  lista2(objeto, busqueda) {
    return (
      <FlatList
        data={this.state[objeto]}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item }) => (
          this.renderIt2(item, objeto, busqueda)
        )}
        enableEmptySections
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.curp}
      />
    );
  }

  renderIt2(item, tipo, busqueda) {
    console.log(item)
    switch (tipo) {
      case 'equipoMedico': {
        return (
          <View>
            <View>
              <Text style={styles.textStyle} > {item.names} {item.lastName1} {item.lastName2} </Text>
            </View>
            <View>
              <Input
                label="Cargo"
                placeholder="Circulante"
                value={this.state.equipoMedico[item.key].cargo}
                onChangeText={value =>
                  this.setState({
                    equipoMedico: update(this.state.equipoMedico, {[item.key]: {cargo: {$set: value}}})
                  })}
              />
            </View>
            <View>
              <Input
                label="Honorarios"
                placeholder="$ 5,000.00"
                value={this.state.equipoMedico[item.key].honorarios}
                onChangeText={value =>
                  this.setState({
                    equipoMedico: update(this.state.equipoMedico, {[item.key]: {honorarios: {$set: value}}})
                  })}
              />
            </View>
          </View>
        );}
      case 'Insumos': {
        return (
          <View>
            <Text style={styles.textStyle} >{item.name} </Text>
          </View>
        );
      }
    }
      return (
        <View>
          <Text style={styles.textStyle} >{item.name} {item.Tipo} {item.names} {item.lastName1} {item.lastName2} {item.lastName2} {item.costo} </Text>
        </View>
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
      <View>
          <ComponentePaciente item={this.state.Patient} tipo={'activos'}/>
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
      {this.lista2('equipoMedico')}
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
    {this.lista2('Insumos')}
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
  {this.lista2('unidadesSangre')}
  </CardSection>
  <CardSection>
    <Button onPress={() => this.showModal('agregarSangre')}>
    Agregar unidades de sangre
    </Button>
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
  {this.lista2('rentaEquipos')}
  </CardSection>
  <CardSection>
    <Button onPress={() => this.showModal('seleccionarEquipos')}>
      Añadir equipos
    </Button>
  </CardSection>
    <View style={{ paddingTop: 50 }}>
      <TouchableWithoutFeedback onPress={() => this.setState({ seleccionarEquipos: false })}>
      <View>
        <Modal
        isVisible={this.state.seleccionarEquipos}
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
                object: 'EquipoRentable',
                variable: 'name',
                text })}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Ingresa el primer apellido..."
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.lista('EquipoRentable', 'seleccionarEquipos')}
          </CardSection>
          <CardSection>
            <Button onPress={() => this.closeModal('seleccionarEquipos')}>
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
  {this.lista2('listaExtra')}
  </CardSection>
  <CardSection>
    <Button onPress={() => this.showModal('extras')}>
      Agregar extras
    </Button>
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
          <Input
            label="Concepto"
            placeholder="Prótesis"
            value={this.state.extraConcepto}
            onChangeText={value => this.setState({ extraConcepto: value })}
          />
          </CardSection>
          <CardSection>
          <Input
            label="Costo"
            placeholder="$500"
            value={this.state.extraCosto}
            onChangeText={value => this.setState({ extraCosto: value })}
          />
          </CardSection>
          <CardSection>
            <Button onPress={() => this.añadirExtra()}>
              Aceptar
            </Button>
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

añadirExtra() {
  const item = { name: this.state.extraConcepto, costo: this.state.extraCosto }
  this.updateField(item, 'extra');
  this.closeModal('extras')
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

    if (tipo === 'Medico') {
      item.cargo = '';
      item.honorarios = '';
      item.key = this.state.equipoMedico.length;
      this.state.equipoMedico.push(item);
      console.log(this.state.equipoMedico)
    }

    if (tipo === 'Farmacia') {
      item.cargo = ''
      this.state.Insumos.push(item);
      console.log(this.state.Insumos)
    }

    if (tipo === 'UnidadesSangre') {
      this.state.unidadesSangre.push(item);
      console.log(this.state.unidadesSangre)
    }

    if (tipo === 'EquipoRentable') {
      this.state.rentaEquipos.push(item);
      console.log(this.state.rentaEquipos)
    }

    if (tipo === 'extra') {
      this.state.listaExtra.push(item);
      console.log(this.state.listaExtra)
    }

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
 const { text, Patient, Ocupacion, Medico, Especialidad, tipoCirugia, UnidadesSangre, Farmacia, rentaEquipos, EquipoRentable, equipoMedico, extra } = query;
 console.log(query);
 return { text, Patient, Ocupacion, Medico, Especialidad, tipoCirugia, UnidadesSangre, Farmacia, rentaEquipos, EquipoRentable, equipoMedico, extra };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc })(AdminQuirofano);
