import React, { Component } from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection, Button, Spinner, DropInput } from '../common';
import {
  printHTMLReducer,
  printClean
} from '../../actions';

class ExpedienteImpresion extends Component {
  static navigationOptions = {
    title: 'Impresión de Formatos',
  };

  constructor(props) {
    super(props);
    //setting default state
    this.state = { type: '' };
  }

  componentDidMount() {
    this.props.printClean();
    this.setState({ type: '' });
  }

  componentWillUnmount() {
    this.props.printClean();
  }

  onPrint() {
    const type = this.state.type;
    let printType = '';
    if (type === '') {
      Alert.alert(
        'Error: Tipo de impresión',
        'Seleccione una opción',
        [ { text: 'Ok', style: 'cancel' }],
        { cancelable: false }
      );
    }
    else {
      if (type === '1. REGISTRO DE INGRESO Y EGRESO') { printType = 'registroIngresoEgreso'; }
      else if (type === '2. HOJA FRONTAL DE EXPEDIENTE') { printType = 'hojaFrontal'; }
      else if (type === '3. NOTA MEDICA') { printType = 'notaMedica'; }
      else if (type === '5.1 NOTA DE EVOLUCION CLINICA') { printType = 'notaEvolucionClinica'; }
      else if (type === '5.3 NOTA PRE-ANESTESICA') { printType = 'notaPreAnestesica'; }
      else if (type === '5.4 (1) NOTA PRE-QUIRURGICA') { printType = 'notaPreQuirurgica'; }
      else if (type === '5.4 (2) NOTA POST-QUIRURGICA') { printType = 'notaPostQuirurgica'; }
      else if (type === '7. INDICACIONES MEDICAS') { printType = 'indicacionesMedicas'; }
      console.log(printType);
      this.props.printHTMLReducer({}, printType, false);
    }
  }

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

  render() {

    return (
      <View style={{ flex: 1 }}>
        <CardSection>
          <DropInput
            label='Tipo de formato'
            data={[{ value: '1. REGISTRO DE INGRESO Y EGRESO' },
                   { value: '2. HOJA FRONTAL DE EXPEDIENTE' },
                   { value: '3. NOTA MEDICA' },
                   { value: '5.1 NOTA DE EVOLUCION CLINICA' },
                   { value: '5.3 NOTA PRE-ANESTESICA' },
                   { value: '5.4 (1) NOTA PRE-QUIRURGICA' },
                   { value: '5.4 (2) NOTA POST-QUIRURGICA' },
                   { value: '7. INDICACIONES MEDICAS' }]}
            value={this.state.type}
            onChangeText={(text) =>  this.setState({ type: text})}
            placeholder={'Selecciona el formato a imprimir'}
          />
        </CardSection>
        <CardSection>
          <Button onPress={this.onPrint.bind(this)}>
            Imprimir
          </Button>
        </CardSection>
        <CardSection />
      </View>
      );
    }
  }

const styles = StyleSheet.create({
  textStyle: {
    padding: 10,
  }
});

const mapStateToProps = ({ bill, query, printR }) => {
 const { print } = printR;
 return { print };
};

export default connect(mapStateToProps,
  { printHTMLReducer, printClean })(ExpedienteImpresion);
