import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import { DateTime } from 'luxon';
import Parse from 'parse/react-native';
import {
  Text,
  Alert,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection, Button } from '../common';
import {
  queryFunc,
  queryAttach,
  cleanFunc,
  writeFunc,
  deleteFunc,
  session
} from '../../actions';
import { ComponenteHabitacion } from '../Listas/ComponenteHabitacion';

class DetalleActivo extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Detalles Paciente Activo'
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
                  tipoRecuperacion: 'Recuperación ambulatoria',
                  tipo: ''
                  };
  }


  componentDidMount() {
    const { navigation } = this.props;
    let data = navigation.getParam('item');
    console.log(data);

    this.props.queryFunc({
      type: 'get',
      object: 'IngresosActivos',
      variable: null,
      text: data.ids.ingreso,
      include: ['paciente', 'medico', 'tipoMedico', 'ubicacion', 'recuperacion']
    });

    this.props.queryFunc({
      type: 'equalTo',
      object: 'Hospitalizacion',
      variable: 'ingreso',
      text: { "__type": "Pointer", "className": "IngresosActivos", "objectId": data.ids.ingreso },
      include: ['ingreso', 'ingreso.paciente', 'ingreso.ubicacion', 'servicio', 'recuperacion']
    });
    console.log(this.props);

    this.setState({ data })
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
    this.setState({ [close]: false, [open]: true, [props]: value });
  }

  asignarHabitacion() {
    console.log(this.state);
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
              <ComponenteHabitacion item={item} tipo={'ingreso'} />
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
    const { ubicacion } = this.props.IngresosActivos;
    const { nuevaHabitacion } = this.state;
    console.log(this.props);
    if (ubicacion) {
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
        <ComponenteHabitacion item={ubicacion} tipo={'ingreso'} />
        </View>
        </CardSection>
        <CardSection>
        <CardSection>
        <View>
        <Text>{'Nueva habitación'}</Text>
        </View>
        <View>
        <ComponenteHabitacion item={nuevaHabitacion} tipo={'ingreso'} />
        </View></CardSection>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.updateHabitacion()}>
            Confirmar
          </Button>
          <Button onPress={() => this.closeModal('confirmarHabitacion')}>
            Cancelar
          </Button>
        </CardSection>
        </Modal>
      );
    }
    return (
    <Modal
    isVisible={this.state.confirmarHabitacion}
    transparent={false}
    >
  <CardSection>
    <CardSection>
    <ComponenteHabitacion item={nuevaHabitacion} tipo={'ingreso'} />
    </CardSection>
    </CardSection>
    <CardSection>
      <Button onPress={() => this.updateHabitacion()}>
        Confirmar
      </Button>
      <Button onPress={() => this.closeModal('confirmarHabitacion')}>
        Cancelar
      </Button>
    </CardSection>
    </Modal>
  );
  }

  regresarHospitalizacion() {
    const { objectId } = this.props.IngresosActivos;
    const { user } = this.props;
    return (
      <Modal
      isVisible={this.state.regresarHospitalizacion}
      transparent={false}
      >
      <CardSection>
        <CardSection>
        <Text> ¿Confirmar regreso a habitación? </Text>
        </CardSection>
        </CardSection>
        <CardSection>
          <Button onPress={() => this.props.writeFunc('IngresosActivos', 'get', null, objectId, 'set', 'estadoActual', 'Hospitalización', user)}>
            Confirmar
          </Button>
          <Button onPress={() => this.closeModal('regresarHospitalizacion')}>
            Cancelar
          </Button>
        </CardSection>
        </Modal>
  );
  }

  enviarShock() {
    const { objectId } = this.props.IngresosActivos;
    console.log(objectId);
    const { user } = this.props.user;
    return (
    <Modal
    isVisible={this.state.enviarShock}
    transparent={false}
    >
  <CardSection>
    <CardSection>
    <Text> ¿Enviar a sala de shock? </Text>
    </CardSection>
    </CardSection>
    <CardSection>
      <Button onPress={() => this.props.writeFunc('IngresosActivos', 'get', null, objectId, 'set', 'estadoActual', 'Shock', user)}>
        Confirmar
      </Button>
      <Button onPress={() => this.closeModal('enviarShock')}>
        Cancelar
      </Button>
    </CardSection>
    </Modal>
  );
  }

  asignarRecuperacion() {
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
                <ComponenteHabitacion item={item} tipo={'ingreso'} />
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
    <ComponenteHabitacion item={posicionRecuperacion} tipo={'ingreso'} />
    </CardSection>
    </CardSection>
    <CardSection>
      <Button onPress={() => this.updateRecuperacion()}>
        Confirmar
      </Button>
      <Button onPress={() => this.closeModal('confirmarRecuperacion')}>
        Cancelar
      </Button>
    </CardSection>
    </Modal>
  );
  }


  añadirConsulta() {

  }

  enviarUTI() {
    console.log(this.state);
    return (
    <Modal
    isVisible={this.state.enviarUTI}
    transparent={false}
    onShow={() => this.props.queryFunc({
      type: 'startsWith',
      object: 'Ocupacion',
      variable: 'Tipo',
      text: 'Unidad de terapia intensiva' })}
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
          onPress={() => this.changeModal('enviarUTI', 'confirmarUTI', 'posicionUTI', item)}
          disabled={item.Ocupada}
          >
          <View>
              <ComponenteHabitacion item={item} tipo={'ingreso'} />
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
      <Button onPress={() => this.closeModal('enviarUTI')}>
        Cancelar
      </Button>
    </CardSection>
    </Modal>
  );
  }

  confirmarUTI() {
    const { posicionUTI } = this.state;
    console.log(this.props);
    return (
    <Modal
    isVisible={this.state.confirmarUTI}
    transparent={false}
    >
  <CardSection>
    <CardSection>
    <ComponenteHabitacion item={posicionUTI} tipo={'ingreso'} />
    </CardSection>
    </CardSection>
    <CardSection>
      <Button onPress={() => this.updateHabitacion()}>
        Confirmar
      </Button>
      <Button onPress={() => this.closeModal('confirmarUTI')}>
        Cancelar
      </Button>
    </CardSection>
    </Modal>
  );
  }

  darDeAlta() {
    const { objectId, paciente } = this.props.IngresosActivos;
    console.log(objectId);
    console.log(paciente.objectId);
    const { user } = this.props.user;
    return (
    <Modal
    isVisible={this.state.darDeAlta}
    transparent={false}
    >
  <CardSection>
    <CardSection>
    <Text> ¿Dar de alta? </Text>
    </CardSection>
    </CardSection>
    <CardSection>
      <Button
      onPress={() => {
        let date = new Date();
        this.props.writeFunc('IngresosActivos', 'get', null, objectId, 'set', 'preAlta', true)
        this.props.writeFunc('IngresosActivos', 'get', null, objectId, 'set', 'Alta', true)
        this.props.writeFunc('IngresosActivos', 'get', null, objectId, 'set', 'fechaAlta', date)
        this.props.writeFunc('Ocupacion', 'equalTo', 'ocupadaPor', paciente.objectId, 'unset', 'ocupadaPor', null)
        this.closeModal('darDeAlta')
      }}
      >
        Confirmar
      </Button>
      <Button onPress={() => this.closeModal('darDeAlta')}>
        Cancelar
      </Button>
    </CardSection>
    </Modal>
  );
  }

  updateHabitacion() {
    const { paciente, ubicacion } = this.props.IngresosActivos;
    const { user, IngresosActivos } = this.props;
    const { nuevaHabitacion } = this.state;

    console.log(paciente, user, ubicacion, nuevaHabitacion);

    if (ubicacion) {
      this.props.deleteFunc('Ocupacion', 'get', null, ubicacion.objectId, 'set', 'ocupadaPor', this.props.user);
    }

   const pointerPaciente = {
     __type: 'Pointer',
    className: 'Patient',
    objectId: paciente.objectId
  };

   this.props.writeFunc('Ocupacion', 'get', null, nuevaHabitacion.objectId, 'set', 'ocupadaPor', pointerPaciente, user);

   const pointerHabitacion = {
     __type: 'Pointer',
    className: 'Ocupacion',
    objectId: nuevaHabitacion.objectId
  };

   const dateTime = DateTime.local().toISO();
   const array = { Tipo: 'ubicacion',
                  Ubicacion: nuevaHabitacion,
                  Momento: dateTime,
                  modificadoPor: user };

   this.props.writeFunc('IngresosActivos', 'get', null, IngresosActivos.objectId, 'set', 'ubicacion', pointerHabitacion, user);
   this.props.writeFunc('IngresosActivos', 'get', null, IngresosActivos.objectId, 'set', 'estadoActual', 'Hospitalización', user);
   this.props.writeFunc('IngresosActivos', 'get', null, IngresosActivos.objectId, 'add', 'historico', array, user.toJSON());
   this.closeModal('confirmarHabitacion');
}

botonAsignarHabitacion() {
  const { habitacion } = this.props.IngresosActivos;
  if (!habitacion) {
    return (
      <Button onPress={() => this.showModal('asignarHabitacion')}>Asignar habitación</Button>
    );
  }
}

updateRecuperacion() {
  const { paciente } = this.props.IngresosActivos;
  const { user, IngresosActivos } = this.props;
  const { posicionRecuperacion } = this.state;

 const pointerPaciente = {
   __type: 'Pointer',
  className: 'Patient',
  objectId: paciente.objectId
};

 this.props.writeFunc('Ocupacion', 'get', null, posicionRecuperacion.objectId, 'set', 'ocupadaPor', pointerPaciente, user);

 const pointerRecuperacion = {
     __type: 'Pointer',
    className: 'Ocupacion',
    objectId: posicionRecuperacion.objectId
  };

 this.props.writeFunc('IngresosActivos', 'get', null, IngresosActivos.objectId, 'set', 'recuperacion', pointerRecuperacion, user);

 this.closeModal('confirmarHabitacion');
}

  asignarPacienteAnonimo() {
    const { pacienteAnonimo } = this.props.IngresosActivos;

    if (pacienteAnonimo) {
      return (
        <Button onPress={() => this.showModal('asignarPaciente')}>Asignar paciente</Button>
      );
    }
  }

  nombrePacienteAnonimo() {
    const { paciente, pacienteAnonimo } = this.props.IngresosActivos;
    if (!pacienteAnonimo) {
      return (
      <Text> {paciente.names} {paciente.lastName1}</Text>
    );
  }
    return (
      <Text> {'Paciente anónimo'} </Text>
    );
  }

  renderDropdown() {
    let data = [{ value: 'Habitación' },
          { value: 'Recuperación' },
          { value: 'Observación urgencias' },
          { value: 'Unidad de terapia intensiva' },
          { value: 'Sala de procedimientos' },
          { value: 'Sala de cirugía' },
          { value: 'Consultorio' },
          { value: 'Sala de shock' }
        ];

    data.forEach((obj, index) => {
      //if (obj.value === tipo) {
        //data.splice(index, 1);
      //}
    });

    return (
      <Dropdown
        containerStyle={{ flex: 1 }}
        data={data}
        value={this.state.tipo}
        onChangeText={(text) => {
          this.setState({ tipo: text });
          this.props.queryAttach({
          object: 'Ocupacion',
          text: '',
          constrain: [{ type: 'equalTo', variable: 'tipo', text },
            { type: 'doesNotExist', variable: 'ocupadaPor', bool: 'and' }]
          });
        }}
        placeholder={'¿A dónde se desplazará el paciente?'}
      />
    );
  }

  renderListaOcupacion() {
    if (this.props.loading === false && this.props.Ocupacion !== 'Failed' && this.state.tipo !== '') {
      return (
        <CardSection>
            <FlatList
              data={this.props.Ocupacion}
              ItemSeparatorComponent={this.ListViewItemSeparator}
              //Item Separator View
              renderItem={({ item }) => (
                // Single Comes here which will be repeatative for the FlatListItems
                <TouchableWithoutFeedback
                onPress={() =>
                  Alert.alert(
                    'Confirmación Movimiento:',
                    '¿Desea trasladar al paciente?',
                    [
                      { text: 'Si', onPress: () => this.trasladarPaciente(item) },
                      { text: 'No', onPress: () => console.log('Cancelar'), style: 'cancel' },
                    ],
                    { cancelable: false }
                  )}
                disabled={item.Ocupada}
                >
                <View>
                    <ComponenteHabitacion item={item} tipo={'ingreso'} />
                </View>
                </TouchableWithoutFeedback>
              )}
              enableEmptySections
              style={{ marginTop: 10 }}
              keyExtractor={(item, index) => index.toString()}
            />
        </CardSection>
      );
    }
  }

  listaHospitalizacion() {
    const { Hospitalizacion } = this.props;

    if(Hospitalizacion) {
    let dataList = null;

    if (Array.isArray(Hospitalizacion)) {
      dataList = Hospitalizacion;
    } else {
      dataList = [Hospitalizacion];
    }
    return(
      <View>
    <CardSection>
      <Text style={{ fontSize: 18, fontWeight: 'bold'}}>
        Historial de hospitalización
      </Text>
    </CardSection>
    <CardSection>
        <FlatList
          data={dataList}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <TouchableWithoutFeedback
            onPress={() => this.changeModal('asignarHabitacion', 'confirmarHabitacion', 'nuevaHabitacion', item)}
            disabled={item.Ocupada}
            >
            <View>
            <Text>
                {this.fecha(item)} {item.servicio.tipo} {item.servicio.ID}
            </Text>
            </View>
            </TouchableWithoutFeedback>
          )}
          enableEmptySections
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
        </CardSection>
        </View>
    )
  }
  }

  fecha(item) {
    const time = new Date(item.createdAt)
    const fecha = time.toLocaleDateString();
    const hora = time.toLocaleTimeString();
    return(
      fecha+' '+hora
    )
  }

  trasladarPaciente(item) {
    const { ubicacion, paciente } = this.props.IngresosActivos;
    const ingreso = this.props.IngresosActivos;

    console.log('ubicacion', ubicacion);
    console.log('paciente', paciente);
    console.log('item', item);
    console.log('ingreso', this.props.IngresosActivos)

    const Hospitalizacion = Parse.Object.extend('Hospitalizacion');
    const hospitalizacion = new Hospitalizacion();

    const IngresosActivos = Parse.Object.extend('IngresosActivos');
    const ingresosActivos = new IngresosActivos();

    const Ocupacion = Parse.Object.extend('Ocupacion');
    const ocupacionActual = new Ocupacion();
    const nuevaOcupacion = new Ocupacion();

    const pointerIngreso = {
      __type: 'Pointer',
     className: 'IngresosActivos',
     objectId: ingreso.objectId
   };

   const pointerServicio = {
     __type: 'Pointer',
    className: 'Ocupacion',
    objectId: item.objectId
  };

  const pointerPaciente = {
    __type: 'Pointer',
   className: '_User',
   objectId: paciente.objectId
 };

    hospitalizacion.set('ingreso', pointerIngreso);
    hospitalizacion.set('servicio', pointerServicio);
    ingresosActivos.set('objectId', ingreso.objectId);
    ingresosActivos.set('ubicacion', pointerServicio);
    ocupacionActual.set('objectId', ubicacion.objectId);
    ocupacionActual.unset('ocupadaPor');
    nuevaOcupacion.set('objectId',item.objectId);
    nuevaOcupacion.set('ocupadaPor', pointerPaciente);

    hospitalizacion.save();
    ocupacionActual.save();
    ingresosActivos.save();
    nuevaOcupacion.save();
  }

  textoUbicacion() {
    const { ubicacion } = this.props.IngresosActivos;
    if(ubicacion) {
      return (
          <Text> {ubicacion.tipo}: {ubicacion.ID} </Text>
      )
    }
  }

  actualizar() {
    const { data } = this.state
    this.props.queryFunc({
      type: 'get',
      object: 'IngresosActivos',
      variable: null,
      text: data.ids.ingreso,
      include: ['paciente', 'medico', 'tipoMedico', 'ubicacion', 'recuperacion']
    });
  }

  render() {
    console.log(this.props);
    this.state.loading = this.props.loading;
    console.log(this.state);

    if (this.state.loading && !this.state.showingModal) {
      return (
        <ActivityIndicator />
      );
    } else if (!this.props.IngresosActivos) {
      return (
        <ActivityIndicator />
      );
    }

    const {
      estadoActual,
      paciente,
      tipoMedico,
      medico,
      ubicacion,
      recuperacion,
      objectId
    } = this.props.IngresosActivos

    return (
      <ScrollView>
        <CardSection>
          <Text> {estadoActual} </Text>
        </CardSection>
        <CardSection>
          {this.nombrePacienteAnonimo()}
        </CardSection>
        <CardSection>
          <Text> {tipoMedico}: {medico.names} {medico.lastName1} </Text>
        </CardSection>
        <CardSection>
          {this.textoUbicacion()}
        </CardSection>
        <View>
          <CardSection>
          {this.listaHospitalizacion()}
            </CardSection>
            <CardSection>
            {this.renderDropdown()}
          </CardSection>
          {this.renderListaOcupacion()}
          <CardSection>
            <Button onPress={() => Alert.alert(
              'Confirmación de alta:',
              '¿Desea dar de alta al paciente?',
              [
                { text: 'Si', onPress: () => {
                console.log(ubicacion)
                 const date = new Date();
                  this.props.writeFunc('IngresosActivos', 'get', null, objectId, 'set', 'preAlta', true)
                  this.props.writeFunc('IngresosActivos', 'get', null, objectId, 'set', 'Alta', true)
                  this.props.writeFunc('IngresosActivos', 'get', null, objectId, 'set', 'fechaAlta', date)
                  this.props.writeFunc('Ocupacion', 'get', null, ubicacion.objectId, 'unset', 'ocupadaPor', null)
                }
              },
                { text: 'No', onPress: () => console.log('Cancelar'), style: 'cancel' },
              ],
              { cancelable: false }
            )
          }
            >Dar de alta</Button>
          </CardSection>
        </View>
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

const mapStateToProps = ({ query, auth }) => {
 const { IngresosActivos, loading, Ocupacion, Hospitalizacion } = query;
 const { user } = auth;
 console.log('Hospito',Hospitalizacion)
 console.log(query)
 return { user, IngresosActivos, loading, Ocupacion, Hospitalizacion };
};

export default connect(mapStateToProps,
  { queryFunc,
    queryAttach,
    cleanFunc,
    writeFunc,
    deleteFunc,
    session })(DetalleActivo);
