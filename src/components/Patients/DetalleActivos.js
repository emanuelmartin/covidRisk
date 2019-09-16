import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { Card, CardSection, Button } from '../common';
import { ComponenteHabitacion } from '../Listas/ComponenteHabitacion'
import Modal from 'react-native-modal';
import { queryFunc, cleanFunc, writeFunc, deleteFunc, session } from '../../actions';
import { connect } from 'react-redux';
import Parse from 'parse/react-native';


class DetalleActivo extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('item').names
    };
  };

  componentWillMount() {
    const { navigation } = this.props;
    let data = navigation.getParam('item');
    console.log(data);
    const { tipo, paciente, tipoMedico, medico, habitacion, estadoActual, ids } = data;


  this.setState({ añadirConsulta: false,
                    enviarShock: false,
                    enviarUTI: false,
                    añadirCirugia: false,
                    cambiarHabitacion: false,
                    darDeAlta: false,
                    asignarHabitacion: true,
                    asignarRecuperacion: false,
                    HabitacionPrevia: habitacion,
                    tipo, paciente, tipoMedico, medico, estadoActual, ids });
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

  async eliminarEntrada(clase, tipo, propiedadConsulta, consulta, propiedadEliminar) {
    const parseObject = Parse.Object.extend(clase);
    const query = new Parse.Query(parseObject);
    if (tipo === 'get') {
      query.get(consulta).then((query) => {
        query.unset(propiedadEliminar)
        query.save();
        console.log('Entrada eliminada')
    });
} else {
    query[tipo](propiedadConsulta, consulta.toString());
    const results = await query.find();
    console.log(results)
    query.get(results[0].id.toString()).then((query) => {
      query.unset(propiedadEliminar)
      query.save();
      console.log('Entrada eliminada')
    }); }
  }

  async agregarEntrada(clase, tipo, propiedadConsulta, consulta, propiedadAgregar, valor) {
    const parseObject = Parse.Object.extend(clase);
    const query = new Parse.Query(parseObject);
    if (tipo === 'get') {
      query.get(propiedadConsulta).then((query) => {
        query.set(propiedadAgregar)
        query.save();
        console.log('Entrada agregada')
    });
} else {
    query[tipo](propiedadConsulta, consulta.toString());
    const results = await query.find();
    console.log(results)
    query.get(results[0].id.toString()).then((query) => {
      query.set(propiedadAgregar, valor)
      query.save();
      console.log('Entrada agregada')
  });
}
}

async modificarEntrada(clase, tipo, propiedadConsulta, consulta, propiedadModificar, valor) {
  const parseObject = Parse.Object.extend(clase);
  const query = new Parse.Query(parseObject);
  if (tipo === 'get') {
    query.get(consulta).then((query) => {
      query.set(propiedadModificar, valor)
      query.save();
      console.log('Entrada modificada')
  });
} else {
  query[tipo](propiedadConsulta, consulta.toString());
  const results = await query.find();
  console.log(results)
  query.get(results[0].id.toString()).then((query) => {
    query.unset(propiedadModificar, valor)
    query.save();
    console.log('Entrada modificada')
  }); }
}

    confirmHabitacion() {
      console.log(this.state)
     this.props.deleteFunc('Ocupacion', 'startsWith', 'ID', this.state.HabitacionPrevia.ID, 'ocupadaPor')

     const pointerPaciente = {
     __type: 'Pointer',
    className: 'Patient',
    objectId: this.state.ids.paciente
     }

     this.props.writeFunc('Ocupacion', 'startsWith', 'ID', this.state.HabitacionActual.ID, 'ocupadaPor', pointerPaciente)


     const pointerHabitacion = {
     __type: 'Pointer',
    className: 'Ocupacion',
    objectId: this.state.HabitacionActual.objectId
     }

     this.props.writeFunc('IngresosActivos', 'get', null, this.state.ids.ingreso, 'habitacion', pointerHabitacion)

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

    const { tipo, paciente, tipoMedico, medico, habitacion, estadoActual } = this.state;

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
            {this.confirmarHabitacion(habitacion)}
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
              <Button onPress={this.showModal('añadirConsulta')}>Añadir consulta</Button>
              <Button onPress={this.showModal('enviarShock')}>Enviar a sala de shock</Button>
              </CardSection>
              <CardSection>
              <Button onPress={this.showModal('enviarUTI')}>Enviar a terapia intensiva</Button>
              <Button onPress={this.showModal('añadirCirugía')}>Añadir cirugía</Button>
              </CardSection>
              <CardSection>
              <Button onPress={this.showModal('asignarHabitacion')}>Asignar habitación</Button>
              <Button onPress={this.showModal('darDeAlta')}>Dar de alta</Button>
            </CardSection>
            <CardSection>
              <Button onPress={this.showModal('asignarRecuperacion')}>Asignar posición de recuperación</Button>
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
              <Text> {'Habitación'}: {habitacion.ID} </Text>
            </View>
            <CardSection>
            <CardSection>
              <Button onPress={this.showModal('añadirConsulta')}>Añadir consulta</Button>
              <Button onPress={this.showModal('enviarShock')}>Enviar a sala de shock</Button>
              </CardSection>
              <CardSection>
              <Button onPress={this.showModal('enviarUTI')}>Enviar a terapia intensiva</Button>
              <Button onPress={this.showModal('añadirCirugía')}>Añadir cirugía</Button>
              </CardSection>
              <CardSection>
              <Button onPress={this.showModal('asignarHabitacion')}>Asignar habitación</Button>
              <Button onPress={this.showModal('darDeAlta')}>Dar de alta</Button>
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
 const { text, Patient, Ocupacion, Medico, Especialidad, Consultorio } = query;
 const { user } = auth;
 console.log(query);
 console.log(auth);
 return { text, Patient, Ocupacion, Medico, Especialidad, user, Consultorio };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, writeFunc, deleteFunc, session })(DetalleActivo);
