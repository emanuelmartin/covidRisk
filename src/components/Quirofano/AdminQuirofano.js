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
import { queryFunc, cleanFunc, queryAttach, queryPointer } from '../../actions';
import { ComponentePaciente } from '../Listas';
import update from 'react-addons-update';
import DatePicker from 'react-native-datepicker'

class AdminQuirofano extends React.Component {
  static navigationOptions = {
    title: 'Añadir cirugía'
  };

  constructor(props) {
    super(props);
    //setting default state
    let horaInicio = '';
    let horaFin = '';
    let Patient = { names: '' };
    let Medico = { names: 'Selecciona un médico' };
    let equipoMedico = []
    let unidadesSangre = [];
    let tipoCirugia = { name: 'Selecciona un tipo de cirugía' };
    let Insumos = [];
    let rentaEquipos = [];
    let extra = [ {name: 'sad'} ];
    let listaExtra = [];
    let sangre = { names: 'Añade las unidades de sangre' }
    this.state = { search: '', Patient, Medico, tipoCirugia, Insumos, rentaEquipos, extra, sangre, pacienteAnonimo: false, seleccionarMedicos: false, seleccionarEquipos: false, extras: false, equipoMedico, unidadesSangre, listaExtra };
    this.arrayholder = [];
  }

    renderIt(item, tipo, busqueda) {
      return (
        <TouchableWithoutFeedback
        onPress={() => this.updateField(item, tipo, busqueda)}
        >
          <View>
            <Text style={styles.textStyle} >{item.name} {item.Tipo} {item.nombre} {item.names} {item.lastName1} {item.lastName2} {item.costo} </Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }

  renderPaciente(item, tipo, busqueda) {
    const { paciente } = item;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.updateField(item, tipo, busqueda)}
      >
        <View>
          <Text style={styles.textStyle} >{paciente.names} {item.lastName1} {item.lastName2}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderMedico(item, tipo, busqueda) {
    const { medico } = item;
    return (
      <TouchableWithoutFeedback
        onPress={() => this.updateField(item, tipo, busqueda)}
      >
        <View>
          <Text style={styles.textStyle} >{medico.names} {medico.lastName1} {medico.lastName2}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderInventario(item, tipo, busqueda) {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.updateField(item, tipo, busqueda)}
      >
        <View>
          <Text style={styles.textStyle} >{item.laboratorio} - {item.nombre}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  renderEquipo(item, tipo, busqueda) {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.updateField(item, tipo, busqueda)}
      >
        <View>
          <Text style={styles.textStyle} >{item.nombre}</Text>
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
    this.props.cleanFunc();
    this.setState({ [prop]: true });
  }

  closeModal(prop) {
    this.setState({ [prop]: false });
  }

  lista(objeto, busqueda) {
    let dataList = null;
    let renderMethod = null;
    if (this.props[objeto] !== 'Failed' &&
    this.props[objeto] !== '' &&
    this.props[objeto] !== undefined) {
      if (Array.isArray(this.props[objeto])) {
        dataList = this.props[objeto];
      } else {
        dataList = [this.props[objeto]];
      }
      if (objeto === 'User' && busqueda === 'buscarPaciente') {
        return (
          <FlatList
            data={[].concat(dataList).sort((a, b) => a.names > b.names)}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //Item Separator View
            renderItem={({ item }) => (
            this.renderPaciente(item, objeto, busqueda)
            )}
            enableEmptySections
            style={{ marginTop: 10 }}
            keyExtractor={(item) => item.objectId}
          />
        );
      } else if (objeto === 'User' && busqueda === 'seleccionarMedicos') {
        return (
          <FlatList
            data={[].concat(dataList).sort((a, b) => a.names > b.names)}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //Item Separator View
            renderItem={({ item }) => (
            this.renderMedico(item, objeto, busqueda)
            )}
            enableEmptySections
            style={{ marginTop: 10 }}
            keyExtractor={(item) => item.objectId}
          />
        );
      } else if (objeto === 'Inventario') {
        return (
          <FlatList
            data={[].concat(dataList).sort((a, b) => a.nombre > b.nombre)}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //Item Separator View
            renderItem={({ item }) => (
            this.renderInventario(item, objeto, busqueda)
            )}
            enableEmptySections
            style={{ marginTop: 10 }}
            keyExtractor={(item) => item.objectId}
          />
        );
      } else if (objeto === 'rentaEquipos') {
        return (
          <FlatList
            data={[].concat(dataList).sort((a, b) => a.nombre > b.nombre)}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //Item Separator View
            renderItem={({ item }) => (
            this.renderEquipo(item, objeto, busqueda)
            )}
            enableEmptySections
            style={{ marginTop: 10 }}
            keyExtractor={(item) => item.objectId}
          />
        );
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
            keyExtractor={(item) => item.objectId}
          />
        );
      }
    }
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
              <Text style={styles.textStyle} > {item.nombre} {item.names} {item.lastName1} {item.lastName2} </Text>
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

  buscarQuirofano() {
    const data = [{
        value: 'Quirófano 1',
      }, {
          value: 'Quirófano 2',
        }, {
            value: 'Quirófano 3',
          }, {
        value: 'Sala de procedimientos'
      }];
      return (
    <View>
    <CardSection>
    <Dropdown
    containerStyle={{ flex: 1 }}
    data={data}
    value={this.state.quirofano}
    onChangeText={value => {
      this.props.queryFunc({
        type: 'equalTo',
        object: 'Ocupacion',
        variable: 'nombre',
        text: value });
    }}
    placeholder={'Selecciona el quirófano'}
    />
    </CardSection>
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
          <ComponentePaciente item={this.state.Patient} />
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
                onChangeText={text => this.props.queryPointer({
                  type: 'startsWith',
                  object: 'User',
                  variable: 'lastName1',
                  text,
                  pointer: { object: 'IngresosActivos', variable: 'paciente' }
                })}
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
                onChangeText={text => this.props.queryAttach({
                  object: 'User',
                  text,
                  constrain: [{ type: 'startsWith', variable: 'lastName1', text },
                    { type: 'equalTo', variable: 'userType', text: 'medico', bool: 'and' }]
                  })}
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
                object: 'Inventario',
                variable: 'nombre',
                text })}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Ingresa el nombre comercial..."
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.lista('Inventario', 'agregarInsumos')}
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
                object: 'rentaEquipos',
                variable: 'nombre',
                text })}
              onClear={() => this.props.queryFunc({ text: '' })}
              placeholder="Ingresa el nombre..."
              value={this.props.text}
            />
            </CardSection>
          <CardSection>
            {this.lista('rentaEquipos', 'seleccionarEquipos')}
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
      console.log(this.state.equipoMedico);
    }

    if (tipo === 'Farmacia') {
      item.cargo = ''
      this.state.Insumos.push(item);
      console.log(this.state.Insumos);
    }

    if (tipo === 'UnidadesSangre') {
      this.state.unidadesSangre.push(item);
      console.log(this.state.unidadesSangre);
    }

    if (tipo === 'rentaEquipos') {
      this.state.rentaEquipos.push(item);
      console.log(this.state.rentaEquipos);
    }

    if (tipo === 'extra') {
      this.state.listaExtra.push(item);
      console.log(this.state.listaExtra);
    }

    this.setState({ [tipo]: item, [busqueda]: false, text: '' });
  }


  agregarCirugia() {
    const Cirugia = Parse.Object.extend('Cirugia');
    const cirugia = new Cirugia();

    const { rentaEquipos, horaInicio, horaFin, equipoMedico, unidadesSangre, extras, tipoCirugia, Patient } = this.state;
    const { Ocupacion } = this.props;
    console.log('Ocupacion',Ocupacion)

    const pointerIngreso = {
      __type: 'Pointer',
      className: 'IngresosActivos',
      objectId: Patient.objectId
    };
    const pointerQuirofano = {
      __type: 'Pointer',
      className: 'Ocupacion',
      objectId: Ocupacion.objectId
    };
    const pointerTipo = {
      __type: 'Pointer',
      className: 'tipoCirugia',
      objectId: tipoCirugia.objectId
    };

    cirugia.set('ingresoPaciente', pointerIngreso);
    cirugia.set('quirofano', pointerQuirofano);
    cirugia.set('rentaEquipos', rentaEquipos);
    cirugia.set('inicio', horaInicio);
    cirugia.set('fin', horaFin);
    cirugia.set('tipo', pointerTipo);
    cirugia.set('equipoMedico', equipoMedico);
    cirugia.set('unidadesSangre', unidadesSangre);
    cirugia.set('extras', extras);

    cirugia.save();
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

  tiempo() {
    return (
    <View>
    <CardSection>
    <DatePicker
       style={{ width: 200 }}
       date={this.state.horaInicio}
       mode="datetime"
       placeholder="Fecha de inicio"
       format="DD-MM-YYYY HH:ss"
       confirmBtnText="Confirmar"
       cancelBtnText="Cancelar"
       customStyles={{
         dateIcon: {
           position: 'absolute',
           left: 0,
           top: 4,
           marginLeft: 0
         },
         dateInput: {
           marginLeft: 36
         }
         // ... You can check the source to find the other keys.
       }}
       onDateChange={(date) => { this.setState({ horaInicio: date }); }}
    />

     <DatePicker
       style={{ width: 200 }}
       date={this.state.horaFin}
       mode="datetime"
       placeholder="Fecha de fin"
       format="DD-MM-YYYY HH:mm"
       confirmBtnText="Confirmar"
       cancelBtnText="Cancelar"
       customStyles={{
         dateIcon: {
           position: 'absolute',
           left: 0,
           top: 4,
           marginLeft: 0
         },
         dateInput: {
           marginLeft: 36
         }
         // ... You can check the source to find the other keys.
       }}
       onDateChange={(date) => { this.setState({ horaFin: date }); }}
     />

     </CardSection>
     </View>
   );
  }

  render() {
      console.log(this.state);

    return (
      <ScrollView style={{ flex: 1 }}>

        {this.tiempo()}
        {this.buscarQuirofano()}
        {this.buscarPaciente()}
        {this.seleccionarTipoCirugia()}
        {this.seleccionarMedicos()}
        {this.agregarSangre()}
        {this.rentaEquipos()}
        {this.extras()}

        <CardSection>
          <Button onPress={() => this.agregarCirugia()}>Agregar cirugía</Button>
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
  }
});

const mapStateToProps = ({ query }) => {
 const {
   loading,
   text,
   User,
   Ocupacion,
   Especialidad,
   tipoCirugia,
   UnidadesSangre,
   Inventario,
   rentaEquipos,
   EquipoRentable,
   equipoMedico,
   extra
 } = query;
 console.log('USer', User)
const Medico = User;
const Patient = User;
 return {
   loading,
   text,
   User,
   Ocupacion,
   Medico,
   Especialidad,
   tipoCirugia,
   UnidadesSangre,
   Inventario,
   rentaEquipos,
   EquipoRentable,
   equipoMedico,
   extra,
   Patient
 };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, queryAttach, queryPointer })(AdminQuirofano);
