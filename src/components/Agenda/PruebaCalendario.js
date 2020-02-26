import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import { queryFunc, cleanFunc, multiWrite, cleanVariable } from '../../actions';
import { connect } from 'react-redux';

class PruebaCalendario extends Component {
  constructor(props) {
    super(props);

    LocaleConfig.locales.en = LocaleConfig.locales[''];
LocaleConfig.locales.mx = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene.',
    'Feb.',
    'Marzo',
    'Abr.',
    'Mayo',
    'Junio',
    'Julio',
    'Ago.',
    'Sept.',
    'Oct.',
    'Nov.',
    'Déc.',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
};

LocaleConfig.defaultLocale = 'mx';

    this.state = {
      items: {}
    };
  }

  static navigationOptions = {
    title: 'Programación quirúrgica',
  };

  componentDidMount() {
    this.props.queryFunc({
      type: 'equalTo',
      object: 'Programacion',
      variable: 'tipo',
      text: 'Cirugía'
    });
    this.loadItems();
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        selected={Date.now()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}
      />
    );
  }

  loadItems() {
    setTimeout(() => {
      const { Programacion } = this.props;
      Programacion.forEach((programacion) => {
        if(!this.state.items[programacion.info.fecha]) this.state.items[programacion.info.fecha] = [];
        this.state.items[programacion.info.fecha].push(programacion.info)
      })
const newItems = {};
Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
this.setState({
  items: newItems
});
}, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(
          item.name,
          `Sala: ${item.sala}\nHora: ${item.hora}\nDuración aproximada: ${item.duracion}\nTipo de cirugía: ${item.tipo}\nNombre del paciente: ${item.nombrePaciente}\nEdad del paciente: ${item.edadPaciente}\nCirujano: ${item.cirujano}\nAyudante: ${item.ayudante}\nInstrumentista: ${item.instrumentista}\nAnestesiólogo: ${item.anestesiologo}\nPediatra: ${item.pediatra}\nImagenología: ${item.imagenologia}\nPersona que programa: ${item.nombrePrograma}\nEnfermero que programa: ${item.enfermeroPrograma}\nObservaciones: ${item.observaciones}\nFecha de programación: ${item.fechaProgramacion}`
        )}
      >
        <Text>Hora: {item.hora}</Text>
        <Text>Sala: {item.sala}</Text>
        <Text>Tipo de cirugía: {item.tipo}</Text>
        <Text>Cirujano: {item.cirujano}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>Sin cirugías programadas</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

const mapStateToProps = ({ query, auth }) => {
  const { user } = auth;
 const { text, loading, Inventario, Cuenta, Programacion } = query;
 console.log(Programacion)
 return { text, loading, Inventario, Cuenta, user, Programacion };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, multiWrite, cleanVariable })(PruebaCalendario);
