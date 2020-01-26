import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
  Alert
} from 'react-native';
import Parse from 'parse/react-native';
import { SearchBar, CheckBox } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from 'react-native-modal';
import { Button, CardSection } from '../common';
import { ComponentePaciente, ComponenteMedico, ComponenteHabitacion, ComponenteEspecialidad, ComponenteConsultorio } from '../Listas';
import { queryFunc, queryAttach, cleanFunc, multiWrite, session, printHTMLReducer } from '../../actions';

const INITIAL_STATE = { isLoading: false, search: '', Habitacion: { ID: '', query: false }, Patient: { names: '' }, Medico: { names: '' }, Especialidad: { name: '' }, Consultorio: { ID: '' }, pacienteAnonimo: false, print1: false, print2: false };

class PatientSelect extends React.Component {
  static navigationOptions = {
    title: 'Nuevo ingreso',
  };

  constructor(props) {
    super(props);
    //setting default state
    this.arrayholder = [];
    this.state = INITIAL_STATE;
  }

    renderIt(item, tipo, busqueda) {
      console.log('item',item)
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
      );
}
      else if (tipo === 'Medico') {
        console.log('ItemMedico', item)
      return (
      <TouchableWithoutFeedback
      onPress={() => this.updateField(item, tipo, busqueda)}
      >
        <View>
            <ComponenteMedico item={item} />
        </View>
      </TouchableWithoutFeedback>
    ); }

    else if (tipo === 'Especialidad') {
    return (
    <TouchableWithoutFeedback
    onPress={() => this.updateField(item, tipo, busqueda)}
    >
      <View>
          <ComponenteEspecialidad item={item}/>
      </View>
    </TouchableWithoutFeedback>
  ); }

  else if (tipo === 'Habitacion') {
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

  else if (tipo === 'Consultorio') {
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

else if (tipo === 'Catalogos') {
  console.log('item', item)
  return (
  <TouchableWithoutFeedback
  onPress={() => this.updateField(item, tipo, busqueda)}
  >
    <View>
        <CardSection>
        <Text>
        {item.nombre}
        </Text>
        </CardSection>
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
    let dataList = null;
    if (Array.isArray(this.props[objeto])) {
      dataList = this.props[objeto];
    } else {
      dataList = [this.props[objeto]];
      console.log('Cat', this.props[objeto])
      console.log('DAT', dataList)
      for(var i=dataList.length-1;i>=0;i--)
{
    if(dataList[i]=="")
       dataList.splice(i,1);
}
console.log('Cat', this.props[objeto])
console.log('DAT', dataList)
    } if (objeto === 'Catalogos') {
      <FlatList
        data={dataList}
        ItemSeparatorComponent={this.ListViewItemSeparator}
        //Item Separator View
        renderItem={({ item }) => {
          console.log('item',item)
          this.renderIt(item, objeto, busqueda)
        }}
        style={{ marginTop: 10 }}
        keyExtractor={(item) => item.objectId}
      />
    } else {
    return (
      <FlatList
        data={dataList}
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
  }

  seleccionarHabitacion() {
    if (this.state.tipo === 'Hospitalización' ||
        this.state.tipo === 'Cirugía mayor') {
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
          variable: 'tipo',
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
              disabled={item.ocupadaPor}
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
    if (this.state.tipo === 'Consultorio') {
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
          variable: 'tipo',
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
  if (this.state.tipo === 'Urgencias') {
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

buscarDiagnostico() {
  if (this.state.tipo === 'Hospitalización' ||
      this.state.tipo === 'Cirugía mayor' ||
      this.state.tipo === 'Cirugía ambulatoria') {
    return (
  <View>
  <CardSection>
    <Text>Diagnóstico probable</Text>
  </CardSection>
  <CardSection>
    <TouchableWithoutFeedback onPress={() => this.showModal('buscarDiagnostico')}>
    <View>
    <CardSection>
    <Text>
    Selecciona
    </Text>
    </CardSection>
      </View>
    </TouchableWithoutFeedback>
  </CardSection>
    <View style={{ paddingTop: 50 }}>
      <TouchableWithoutFeedback onPress={() => this.setState({ buscarDiagnostico: false })}>
      <View>
        <Modal
        isVisible={this.state.buscarDiagnostico}
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
              onChangeText={text => {
                this.props.queryAttach({
                object: 'Catalogos',
                text,
                constrain: [{ type: 'matches', variable: 'nombre', text, regex: 'i' },
                  { type: 'equalTo', variable: 'tipo', text: 'Cie 10', bool: 'and' }]
                });
              }}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Ingresa el diagnóstico..."
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.lista('Catalogos', 'buscarDiagnostico')}
          </CardSection>
          <CardSection>
            <Button onPress={() => this.closeModal('buscarDiagnostico')}>
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
                onChangeText={text => {
                  this.props.queryAttach({
                  object: 'User',
                  text,
                  constrain: [{ type: 'matches', variable: 'lastName1', text, regex: 'i' },
                    { type: 'equalTo', variable: 'type', text: 'paciente', bool: 'and' }]
                  });
                }}
                onClear={() => this.props.queryFunc({ text: '' })}
                placeholder="Ingresa el primer apellido..."
                value={this.props.text}
              />
              </CardSection>
            <CardSection>
              {this.lista('Patient', 'buscarPaciente')}
            </CardSection>
            <CardSection>
              <Button onPress={() => {this.closeModal('buscarPaciente');
                                      this.props.navigation.navigate('SignUp')} }>
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
    if (this.state.tipo === 'Hospitalización' ||
        this.state.tipo === 'Cirugía mayor' ||
        this.state.tipo === 'Cirugía ambulatoria' ||
        this.state.tipo === 'Consulta') {
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
                onChangeText={text => {
                  this.props.queryAttach({
                  object: 'User',
                  text,
                  constrain: [{ type: 'startsWith', variable: 'lastName1', text },
                    { type: 'equalTo', variable: 'type', text: 'medico', bool: 'and' }]
                  });
                  }
                }
                onClear={() => this.props.queryFunc({ text: '' })}
                placeholder="Ingresa el primer apellido..."
                value={this.props.text}
              />
              </CardSection>
            <CardSection>
              {this.lista('Medico', 'seleccionarMedicoTitular')}
            </CardSection>
            <CardSection>
              <Button onPress={() => {this.closeModal('seleccionarMedicoTitular');
                                      this.props.navigation.navigate('SignUp')} }>
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
    if (this.state.tipo === 'Urgencias') {
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
                onChangeText={text =>   this.props.queryAttach({
                  object: 'User',
                  text,
                  constrain: [{ type: 'startsWith', variable: 'lastName1', text },
                    { type: 'equalTo', variable: 'type', text: 'medico', bool: 'and' }]
                  })
                }
                onClear={() => this.props.queryFunc({ text: '' })}
                placeholder="Ingresa el primer apellido..."
                value={this.props.text}
              />
              </CardSection>
            <CardSection>
              {this.lista('Medico', 'seleccionarMedicoGuardia')}
            </CardSection>
            <CardSection>
              <Button onPress={() => {this.closeModal('seleccionarMedicoGuardia');
                                      this.props.navigation.navigate('SignUp')} }>
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
    if (this.state.tipo === 'Hospitalización' ||
        this.state.tipo === 'Cirugía mayor' ||
        this.state.tipo === 'Cirugía ambulatoria') {
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

    const Paciente = Parse.Object.extend('User');
    const paciente = new Parse.Query(Paciente);
    const pacienteAnonimo = this.state.pacienteAnonimo;

    const pacientePointer = {
      __type: 'Pointer',
      className: '_User',
      objectId: this.state.Patient.objectId
    };

  const medicoPointer = {
    __type: 'Pointer',
    className: '_User',
    objectId: this.state.Medico.objectId
  };

  const ocupacionPointer = {
  __type: 'Pointer',
  className: 'Ocupacion',
  objectId: this.state.Habitacion.objectId
  };
    const date = new Date();
    ingresos.set('tipo', this.state.tipo);
    ingresos.set('estadoActual', this.state.tipo);
    ingresos.set('paciente', pacientePointer);
    ingresos.set('pacienteAnonimo', pacienteAnonimo);
    ingresos.set('admision', date);

    const ingresoInfo = { tipo: this.state.tipo,
       estadoActual: this.state.tipo,
        paciente: this.state.Patient,
        medico: this.state.Medico,
        habitacion: this.state.Habitacion,
        fecha: { dia: '9', mes: 'septiembre', ano: '2019' } }

    this.setState({ ingresoInfo });

    paciente.get(this.state.Patient.objectId.toString())
    .then((ingresado) => {
      ingresado.set('ingresado', true);
      ingresado.save();
    });


    function actualizarOcupacion(habitacionID) {
      ocupacion.get(habitacionID)
      .then((ocupado) => {
        ocupado.set('ocupadaPor', pacientePointer);
        ocupado.save();
      });
    }

    switch (this.state.tipo) {
      case 'Cirugía ambulatoria':
        ingresos.set('medico', medicoPointer);
        ingresos.set('tipoMedico', 'Médico titular');
        ingresos.set('Alta', false);
        break;
      case 'Cirugía mayor':
        ingresos.set('medico', medicoPointer);
        ingresos.set('tipoMedico', 'Médico titular');
        ingresos.set('ubicacion', ocupacionPointer);
        ingresos.set('Alta', false);
        actualizarOcupacion(this.state.Habitacion.objectId.toString());
        break;
      case 'Urgencias':
      ingresos.set('Alta', false);
        ingresos.set('medico', medicoPointer);
        ingresos.set('tipoMedico', 'Médico de guardia');
        break;
      case 'Hospitalización':
      ingresos.set('Alta', false);
      let date = new Date();
        ingresos.set('medico', medicoPointer);
        ingresos.set('tipoMedico', 'Médico titular');
        ingresos.set('ubicacion', ocupacionPointer);
        ingresos.set('admision', date)
        actualizarOcupacion(this.state.Habitacion.objectId.toString());
        break;
      default:
    }


    ingresos.save().then((ingreso) => {
      const Hospitalizacion = Parse.Object.extend('Hospitalizacion');
        const hospitalizacion = new Hospitalizacion();

        console.log('ingreso', ingreso)

        const ingresoPointer = {
        __type: 'Pointer',
        className: 'IngresosActivos',
        objectId: ingreso.id
        };

        let date = new Date();

        hospitalizacion.set('servicio', ocupacionPointer)
        hospitalizacion.set('ingreso', ingresoPointer)
        hospitalizacion.set('fechaIngreso', date)
        hospitalizacion.save().then(() => {
      Alert.alert(
        'Listo',
        'Paciente ingresado correctamente',
        [
          { text: 'OK', onPress: () => this.imprimirFormatos() },
        ],
      );
      this.setState(INITIAL_STATE);
        })
        .catch((error) => {
          Alert.alert(
            'Error',
            `Error al ingresar al paciente, ${error.message}`,
            [
              { text: 'OK' },
            ],
          );
        });
      });
}

async imprimirFormatos() {
  if (this.state.tipo === 'Hospitalización') {
    this.props.printHTMLReducer(this.state.ingresoInfo, 'Consentimiento de hospitalización', true);
    const info = [{ accion: 'set', variable: 'info', valor: this.state.ingresoInfo },
                  { accion: 'set', variable: 'type', valor: 'Consentimiento de hospitalización' },
                  { accion: 'set', variable: 'pacienteStr', valor: this.state.Patient.objectId },
                  { accion: 'set', variable: 'paciente', valor: this.state.Patient.objectId, tipo: 'pointer', pointerTo: 'Patient' }];
    this.props.multiWrite('Impresiones', info);
  }
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
          value={this.state.tipo}
          onChangeText={value => this.setState({ tipo: value, pacienteAnonimo: false })}
          placeholder={'Selecciona el tipo de ingreso'}
          />
        </CardSection>

        {this.pacienteAnonimo()}
        {this.buscarPaciente()}
        {this.seleccionarMedicoTitular()}
        {this.buscarDiagnostico()}
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
    padding: 10
  }
});

const mapStateToProps = ({ query }) => {
 const { text, Ocupacion, Especialidad, Consultorio, Catalogos, User } = query;
 console.log(query);
 const Patient = User;
 const Medico = User;
 console.log('Catalogos', Catalogos);
 return { text, Patient, Ocupacion, Catalogos, Medico, Especialidad, Consultorio };
};

export default connect(mapStateToProps, { queryFunc, queryAttach, cleanFunc, multiWrite, session, printHTMLReducer })(PatientSelect);
