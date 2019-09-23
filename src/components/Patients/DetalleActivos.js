import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Card, CardSection, Button } from '../common';
import { queryFunc, cleanFunc, writeFunc, deleteFunc, session } from '../../actions';
import { connect } from 'react-redux';
import { ComponenteHabitacion, ComponentePaciente } from '../Listas/ComponenteHabitacion'
import Modal from 'react-native-modal';

class DetalleActivo extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('item').names
    };
  };

  constructor(props) {
    super(props);
    this.state = { loading: true,
                    añadirConsulta: false,
                    enviarShock: false,
                    enviarUTI: false,
                    añadirCirugia: false,
                    cambiarHabitacion: false,
                    darDeAlta: false,
                    asignarHabitacion: false,
                    asignarRecuperacion: false,
                    asignarPaciente: false,
                    tipoRecuperacion: 'Recuperación ambulatoria'
                  };
  }


  componentDidMount() {
    const { navigation } = this.props;
    let data = navigation.getParam('item');

    this.props.queryFunc({
      type: 'get',
      object: 'IngresosActivos',
      variable: null,
      text: data.ids.ingreso,
      include: ['paciente', 'medico', 'tipoMedico', 'habitacion', 'recuperacion']
    });

    console.log(this.props)
  }

  renderItem(item) {
    console.log(item);
  }

  showModal(prop) {
    this.setState({ [prop]: true, showingModal: true });
  }

  closeModal(prop) {
    this.props.cleanFunc();
    this.setState({ [prop]: false, showingModal: false });
  }

  changeModal(close, open, props, value) {
    this.setState({ [close]: false, [open]: true, [props]: value })
  }

  asignarHabitacion() {
    console.log(this.state)
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
          onPress={() => this.changeModal('asignarHabitacion', 'confirmarHabitacion', 'nuevaHabitacion', item)}
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

  confirmarHabitacion() {
    const { habitacion } = this.props;
    const { nuevaHabitacion } = this.state;

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
        <ComponenteHabitacion item={habitacion} tipo={'ingreso'}/>
        </View>
        </CardSection>
        <CardSection>
        <CardSection>
        <View>
        <Text>{'Nueva habitación'}</Text>
        </View>
        <View>
        <ComponenteHabitacion item={nuevaHabitacion} tipo={'ingreso'}/>
        </View></CardSection>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.confirmHabitacion(nuevaHabitacion) }>
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
    <ComponenteHabitacion item={nuevaHabitacion} tipo={'ingreso'}/>
    </CardSection>
    </CardSection>
    <CardSection>
      <Button onPress={() => this.updateHabitacion() }>
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
    let data = [{
        value: 'Habitación',
      }, {
        value: 'Quirófano',
      }, {
        value: 'Sala de shock'
      }, {
        value: 'Recuperación quirúrgica'
      }, {
        value: 'Sala de procedimientos'
      }, {
        value: 'Recuperación procedimientos'
      }, {
        value: 'Recuperación ambulatoria'
      }, {
        value: 'Neonatos'
      }, {
        value: 'Observación urgencias'
      }];
    return (
      <Modal
      isVisible={this.state.asignarRecuperacion}
      transparent={false}
      onShow={() => this.props.queryFunc({
        type: 'startsWith',
        object: 'Ocupacion',
        variable: 'Tipo',
        text: 'Recuperación ambulatoria' })}
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
            onPress={() => this.changeModal('asignarRecuperacion', 'confirmarRecuperacion', 'posicionRecuperacion', item)}
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
        <Button onPress={() => this.closeModal('asignarRecuperacion')}>
          Cancelar
        </Button>
      </CardSection>
      </Modal>
  );
}

  confirmarRecuperacion() {
    const { posicionRecuperacion } = this.state;
    return (
    <Modal
    isVisible={this.state.confirmarRecuperacion}
    transparent={false}
    >
  <CardSection>
    <CardSection>
    <ComponenteHabitacion item={posicionRecuperacion} tipo={'ingreso'}/>
    </CardSection>
    </CardSection>
    <CardSection>
      <Button onPress={() => this.updateRecuperacion() }>
        Confirmar
      </Button>
      <Button onPress={() => this.closeModal('confirmarRecuperacion')}>
        Cancelar
      </Button>
    </CardSection>
    </Modal>
  );
  }

  updateHabitacion() {
    const { paciente, habitacion } = this.props.IngresosActivos;
    const { user, IngresosActivos } = this.props;
    const { nuevaHabitacion } = this.state;

    console.log(paciente, user, habitacion, nuevaHabitacion)

    if( habitacion) {
   this.props.deleteFunc('Ocupacion', 'get', null, habitacion.objectId, 'ocupadaPor', this.props.user)
 }

   const pointerPaciente = {
   __type: 'Pointer',
  className: 'Patient',
  objectId: paciente.objectId
   }

   this.props.writeFunc('Ocupacion', 'get', null, nuevaHabitacion.objectId, 'ocupadaPor', pointerPaciente, user)


   const pointerHabitacion = {
   __type: 'Pointer',
  className: 'Ocupacion',
  objectId: nuevaHabitacion.objectId
   }

   this.props.writeFunc('IngresosActivos', 'get', null, IngresosActivos.objectId, 'habitacion', pointerHabitacion, user)
   this.props.writeFunc('IngresosActivos', 'get', null, IngresosActivos.objectId, 'estadoActual', 'Hospitalización', user)

  this.closeModal('confirmarHabitacion');
}

updateRecuperacion() {
  const { paciente } = this.props.IngresosActivos;
  const { user, IngresosActivos } = this.props;
  const { posicionRecuperacion } = this.state;

 const pointerPaciente = {
 __type: 'Pointer',
className: 'Patient',
objectId: paciente.objectId
 }

 this.props.writeFunc('Ocupacion', 'get', null, posicionRecuperacion.objectId, 'ocupadaPor', pointerPaciente, user)


 const pointerRecuperacion = {
 __type: 'Pointer',
className: 'Ocupacion',
objectId: posicionRecuperacion.objectId
 }

 this.props.writeFunc('IngresosActivos', 'get', null, IngresosActivos.objectId, 'recuperacion', pointerRecuperacion, user)

this.closeModal('confirmarHabitacion');
}

  render() {
    console.log(this.props)
    this.state.loading = this.props.loading;
    console.log(this.state)

     if (this.state.loading && !this.state.showingModal) {
      return (
        <ActivityIndicator />
      );
    } else {
    const { estadoActual, paciente, tipoMedico, medico, habitacion, recuperacion } = this.props.IngresosActivos
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
            <View>
            {this.asignarHabitacion()}
            {this.confirmarHabitacion()}
            </View>
            </View>
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
              <Text> {'Habitación'}: {habitacion.ID} </Text>
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
              <Text> Posición de recuperación: {recuperacion.ID} </Text>
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
            {this.asignarRecuperacion()}
            {this.confirmarRecuperacion()}
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
 const { IngresosActivos, loading, Ocupacion } = query;
 const { user } = auth;
 console.log(query)
 return { user, IngresosActivos, loading, Ocupacion };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, writeFunc, deleteFunc, session })(DetalleActivo);
