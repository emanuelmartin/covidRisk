import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { SearchBar, } from 'react-native-elements';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { Button, CardSection, Input } from '../common';
import { queryFunc, cleanFunc } from '../../actions';

function BuscarPaciente() {
  const { modalVisible = false, paciente } = props;

  this.state = {
    modalVisible
}


  function showModal() {
    this.setState({ modalVisible: true });
  }

  function closeModal(prop) {
    queryFunc({ text: '' });
    this.setState({ [prop]: false });
  }

  function updateValue(prop, value, modal) {
    this.state[prop] = value;
    switch (prop) {
      case 'pacienteSeleccionado': this.updatePaciente()
    }
    this.setState({[modal]: false})
  }

  function updatePaciente() {
    console.log(this.state.pacienteSeleccionado)
    const pointerPaciente = {
    __type: 'Pointer',
   className: 'Patient',
   objectId: this.state.pacienteSeleccionado.objectId
    }
    this.props.writeFunc('IngresosActivos', 'get', null, this.state.ids.ingreso, 'paciente', pointerPaciente, this.props.user)
    this.props.writeFunc('IngresosActivos', 'get', null, this.state.ids.ingreso, 'pacienteAnonimo', false, this.props.user)
  }

  return (
    <Modal
    visible={modalVisible}
    animationType='slide'
    transparent={false}
    >
    <View>
      <SearchBar
        round
        lightTheme
        searchIcon={{ size: 24 }}
        onChangeText={text => queryFunc({
          type: 'startsWith',
          object: 'Patient',
          variable: 'lastName1',
          text
        })}
        onClear={() => queryFunc({ text: '' })}
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
            onPress={() => updateValue('pacienteSeleccionado', item, 'asignarPaciente')}
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
      <CardSection>
        <Button onPress={() => this.navigateToScreen('PatientForm')}>
          Añadir paciente
        </Button>
        <Button onPress={() => this.closeModal('asignarPaciente')}>
          Cancelar
        </Button>
      </CardSection>
      </View>
    </Modal>
  );
}

const mapStateToProps = ({ query }) => {
 const { text, Patient, Ocupacion, Medico, Especialidad, tipoCirugia, UnidadesSangre, Farmacia, rentaEquipos, EquipoRentable, equipoMedico, extra } = query;
 console.log(query);
 return { text, Patient, Ocupacion, Medico, Especialidad, tipoCirugia, UnidadesSangre, Farmacia, rentaEquipos, EquipoRentable, equipoMedico, extra };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc })(BuscarPaciente);
