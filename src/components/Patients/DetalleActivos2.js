import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Card, CardSection, Button } from '../common';
import { ComponenteHabitacion, ComponentePaciente } from '../Listas/ComponenteHabitacion'
import Modal from 'react-native-modal';
import { queryFunc, cleanFunc, writeFunc, deleteFunc, session } from '../../actions';
import { connect } from 'react-redux';
import Parse from 'parse/react-native';
import { SearchBar } from 'react-native-elements';
import { BuscarPaciente } from '../Modales';


class DetalleActivo extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('item').names
    };
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { navigation } = this.props;
    let data = navigation.getParam('item');
    console.log(data);

      this.props.queryFunc({
        type: 'get',
        object: 'IngresosActivos',
        variable: null,
        text: data.ids.ingreso,
        include: ['paciente', 'MedicoGuardia']
      });

      const { tipo, paciente, tipoMedico, medico, habitacion, estadoActual, ids } = data;

    this.setState({ añadirConsulta: false,
                      enviarShock: false,
                      enviarUTI: false,
                      añadirCirugia: false,
                      cambiarHabitacion: false,
                      darDeAlta: false,
                      asignarHabitacion: false,
                      asignarRecuperacion: false,
                      HabitacionPrevia: habitacion,
                      asignarPaciente: false,
                      loading: true,
                      tipo, paciente, tipoMedico, medico, estadoActual, ids });

                      this.props = { IngresosActivos: { paciente, medico, estadoActual, tipo }}
  }

  componentDidMount() {
}

  renderItem(item) {
    console.log(item);
  }

  showModal(prop) {
    console.log(this.state)
    this.setState({ [prop]: true });
  }

  closeModal(prop) {
    this.props.queryFunc({ text: '' });
    this.setState({ [prop]: false });
  }

  updateValue(prop, value, modal) {
    this.state[prop] = value;
    switch (prop) {
      case 'pacienteSeleccionado': this.updatePaciente()
    }
    this.setState({[modal]: false})
  }

  asignarPaciente() {
    console.log(this.props.Patient)
    return (
    <Modal
    isVisible={this.state.asignarPaciente}>
    <View style={{ flex: 1 }}>
    <View style={styles.viewStyle}>
      <SearchBar
        round
        lightTheme
        searchIcon={{ size: 24 }}
        onChangeText={text => this.props.queryFunc({
          type: 'startsWith',
          object: 'Patient',
          variable: 'lastName1',
          text
        })}
        onClear={() => this.props.queryFunc({ text: '' })}
        placeholder="Ingresa el primer apellido..."
        value={this.props.text}
      />
        <FlatList
          data={this.props.Patient}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <TouchableWithoutFeedback
            onPress={() => this.updateValue('pacienteSeleccionado', item, 'asignarPaciente')}
            >
            <View>
            <View>
              <Text>{item.names } {item.lastName1 } {item.lastName2} </Text>
            </View>
            <View>
              <Text>{item.birthday}</Text>
            </View>
            </View>
            </TouchableWithoutFeedback>
          )}
          enableEmptySections
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <CardSection>
        <Button onPress={() => this.navigateToScreen('PatientForm')}>
          Añadir paciente
        </Button>
        <Button onPress={() => this.closeModal('asignarPaciente')}>
          Cancelar
        </Button>
      </CardSection>
      <CardSection />
    </View>
    </Modal>
  );
  }

  updatePaciente() {
    console.log(this.state.pacienteSeleccionado)
    const pointerPaciente = {
    __type: 'Pointer',
   className: 'Patient',
   objectId: this.state.pacienteSeleccionado.objectId
    }
    this.props.writeFunc('IngresosActivos', 'get', null, this.state.ids.ingreso, 'paciente', pointerPaciente, this.props.user)
    this.props.writeFunc('IngresosActivos', 'get', null, this.state.ids.ingreso, 'pacienteAnonimo', false, this.props.user)
  }

  añadirConsulta() {

  }

  enviarShock() {

  }

  enviarUTI() {

  }

  añadirCirugia() {

  }

  cambiarHabitacion() {

  }

  darDeAlta() {

  }

  asignarHabitacion() {
    return (
    <Modal
    isVisible={this.state.asignarHabitacion}
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
      <Button onPress={() => this.closeModal('asignarHabitacion')}>
        Cancelar
      </Button>
    </CardSection>
    </Modal>
  );
  }

  updateHabitacion(item) {
    this.setState({ HabitacionActual: item, asignarHabitacion: false, text: '', confirmarHabitacion: true });
  }

    confirmHabitacion() {
      console.log(this.state)
     this.props.deleteFunc('Ocupacion', 'startsWith', 'ID', this.state.HabitacionPrevia.ID, 'ocupadaPor', this.props.user)

     const pointerPaciente = {
     __type: 'Pointer',
    className: 'Patient',
    objectId: this.state.ids.paciente
     }

     this.props.writeFunc('Ocupacion', 'startsWith', 'ID', this.state.HabitacionActual.ID, 'ocupadaPor', pointerPaciente, this.props.user)


     const pointerHabitacion = {
     __type: 'Pointer',
    className: 'Ocupacion',
    objectId: this.state.HabitacionActual.objectId
     }

     this.props.writeFunc('IngresosActivos', 'get', null, this.state.ids.ingreso, 'habitacion', pointerHabitacion, this.props.user)
     this.props.writeFunc('IngresosActivos', 'get', null, this.state.ids.ingreso, 'historico', pointerHabitacion, this.props.user)

     this.state.HabitacionPrevia = this.state.HabitacionActual;

    this.closeModal('confirmarHabitacion');
    console.log(this.state)
  }

  confirmarHabitacion(habitacion) {
    if (this.state.HabitacionPrevia) {
      return (
        <Modal
        isVisible={this.state.confirmarHabitacion}
        transparent={false}
        >
        <CardSection>
        <View>
        <Text>{'Habitación previa'}</Text>
        </View>
        <View>
        <ComponenteHabitacion item={this.state.HabitacionPrevia} tipo={'ingreso'}/>
        </View>
        </CardSection>
        <CardSection>
        <CardSection>
        <View>
        <Text>{'Nueva habitación'}</Text>
        </View>
        <View>
        <ComponenteHabitacion item={this.state.HabitacionActual} tipo={'ingreso'}/>
        </View></CardSection>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.confirmHabitacion(this.state.HabitacionActual) }>
            Confirmar
          </Button>
          <Button onPress={() => this.closeModal('confirmarHabitacion')}>
            Cancelar
          </Button>
        </CardSection>
        </Modal>
      )
    }
    return (
    <Modal
    isVisible={this.state.confirmarHabitacion}
    transparent={false}
    >
  <CardSection>
    <CardSection>
    <ComponenteHabitacion item={this.state.HabitacionActual} tipo={'ingreso'}/>
    </CardSection>
    </CardSection>
    <CardSection>
      <Button onPress={() => this.confirmHabitacion(this.state.HabitacionActual) }>
        Confirmar
      </Button>
      <Button onPress={() => this.closeModal('confirmarHabitacion')}>
        Cancelar
      </Button>
    </CardSection>
    </Modal>
  );
  }

  asignarRecuperacion() {

  }

  render() {

    console.log(this.props)
    const { tipo, paciente, tipoMedico, medico, habitacion, estadoActual } = this.props.IngresosActivos;

    switch (estadoActual) {
      case 'Urgencias': {
        return (
          <View>
          <View>
            <Text> {estadoActual} </Text>
          </View>
            <View>
              <Text> {paciente.names} </Text>
            </View>
            <View>
              <Text> {tipoMedico}: {medico.names} </Text>
            </View>
            <View>
            <CardSection>
              <Button onPress={() => this.showModal('asignarPaciente')}>Asignar paciente</Button>
              <Button onPress={() => this.showModal('asignarObservacion')}>Enviar a observación</Button>
            </CardSection>
            <CardSection>
              <Button onPress={() => this.showModal('añadirConsulta')}>Añadir consulta</Button>
              <Button onPress={() => this.showModal('enviarShock')}>Enviar a sala de shock</Button>
              </CardSection>
              <CardSection>
              <Button onPress={() => this.showModal('enviarUTI')}>Enviar a terapia intensiva</Button>
              <Button onPress={() => this.showModal('añadirCirugía')}>Añadir cirugía</Button>
              </CardSection>
              <CardSection>
              <Button onPress={() => this.showModal('asignarHabitacion')}>Asignar habitación</Button>
              <Button onPress={() => this.showModal('darDeAlta')}>Dar de alta</Button>
            </CardSection>
            </View>
            {this.asignarHabitacion()}
            {this.confirmarHabitacion()}
            {this.asignarPaciente()}
          </View>
        );
      } break;

      case 'Cirugía mayor': {
        return (
          <View>
          <View>
            <Text> {estadoActual} </Text>
          </View>
            <View>
              <Text> {paciente.names} </Text>
            </View>
            <View>
              <Text> {tipoMedico}: {medico.names} </Text>
            </View>
            <View>
              <Text> {'Habitación'}: {this.state.HabitacionPrevia.ID} </Text>
            </View>
            <View>
            <CardSection>
              <Button onPress={() => this.showModal('añadirConsulta')}>Añadir consulta</Button>
              <Button onPress={() => this.showModal('enviarShock')}>Enviar a sala de shock</Button>
              </CardSection>
              <CardSection>
              <Button onPress={() => this.showModal('enviarUTI')}>Enviar a terapia intensiva</Button>
              <Button onPress={() => this.showModal('añadirCirugía')}>Añadir cirugía</Button>
              </CardSection>
              <CardSection>
              <Button onPress={() => this.showModal('asignarHabitacion')}>Cambiar habitación</Button>
              <Button onPress={() => this.showModal('darDeAlta')}>Dar de alta</Button>
            </CardSection>
            </View>
            {this.asignarHabitacion()}
            {this.confirmarHabitacion()}
          </View>
        );
      } break;

      case 'Cirugía ambulatoria': {
        return (
          <View>
          <View>
            <Text> {estadoActual} </Text>
          </View>
            <View>
              <Text> {paciente.names} </Text>
            </View>
            <View>
              <Text> {tipoMedico}: {medico.names} </Text>
            </View>
            <View>
            <CardSection>
              <Button onPress={() => this.showModal('añadirConsulta')}>Añadir consulta</Button>
              <Button onPress={() => this.showModal('enviarShock')}>Enviar a sala de shock</Button>
              </CardSection>
              <CardSection>
              <Button onPress={() => this.showModal('enviarUTI')}>Enviar a terapia intensiva</Button>
              <Button onPress={() => this.showModal('añadirCirugía')}>Añadir cirugía</Button>
              </CardSection>
              <CardSection>
              <Button onPress={() => this.showModal('asignarHabitacion')}>Asignar habitación</Button>
              <Button onPress={() => this.showModal('darDeAlta')}>Dar de alta</Button>
            </CardSection>
            <CardSection>
              <Button onPress={() => this.showModal('asignarRecuperacion')}>Asignar posición de recuperación</Button>
            </CardSection>
            </View>
          </View>
        );
      } break;

      case 'Hospitalización': {
        return (
          <View>
          <View>
            <Text> {estadoActual} </Text>
          </View>
            <View>
              <Text> {paciente.names} </Text>
            </View>
            <View>
              <Text> {tipoMedico}: {medico.names} </Text>
            </View>
            <View>
              <Text> {'Habitación'}: {this.state.HabitacionPrevia.ID} </Text>
            </View>
            <CardSection>
            <CardSection>
              <Button onPress={() => this.showModal('añadirConsulta')}>Añadir consulta</Button>
              <Button onPress={() => this.showModal('enviarShock')}>Enviar a sala de shock</Button>
              </CardSection>
              <CardSection>
              <Button onPress={() => this.showModal('enviarUTI')}>Enviar a terapia intensiva</Button>
              <Button onPress={() => this.showModal('añadirCirugía')}>Añadir cirugía</Button>
              </CardSection>
              <CardSection>
              <Button onPress={() => this.showModal('asignarHabitacion')}>Asignar habitación</Button>
              <Button onPress={() => this.showModal('darDeAlta')}>Dar de alta</Button>
            </CardSection>
            </CardSection>
          </View>
        );
      } break;

  }
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
 const { text, Patient, Ocupacion, Medico, Especialidad, Consultorio, IngresosActivos, loading } = query;
 const { user } = auth;
 return { text, Patient, Ocupacion, Medico, Especialidad, user, Consultorio, IngresosActivos, loading };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, writeFunc, deleteFunc, session })(DetalleActivo);
