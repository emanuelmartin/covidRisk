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
import { queryFunc, cleanFunc, session, printHTMLReducer } from '../../actions';

class Reimprimir extends React.Component {
  static navigationOptions = {
    title: 'Impresión',
  };

  constructor(props) {
    super(props);
    //setting default state
    const tipoFormato = 'Consentimiento de hospitalización';
    const Patient = { names: '' }
    const Impresiones = { type: '' }
    this.state = { tipoFormato, Patient };
  }

    renderIt(item, tipo, busqueda) {
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
        return (
        <TouchableWithoutFeedback
        onPress={() => this.props.printHTMLReducer(item.info, item.type, false)}
        >
          <View>
              <Text>{item.type}</Text>
          </View>
        </TouchableWithoutFeedback>
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

    impresiones() {
      if (this.state.Patient.objectId) {
            if (!this.props.Impresiones) {
          this.props.queryFunc({
            type: 'startsWith',
            object: 'Impresiones',
            variable: 'pacienteStr',
            text: this.state.Patient.objectId.toString() }) }
            else {
            return (
            <View>
            <CardSection>
              {this.lista('Impresiones')}
            </CardSection>
            </View>
          );
          }
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
    let dataList = [];
    if (Array.isArray(this.props[objeto])) {
      dataList = this.props[objeto];
    } else {
      dataList = [this.props[objeto]];
    }
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

  updateField(item, tipo, busqueda) {
    this.setState({ [tipo]: item, [busqueda]: false, text: '' });
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
    const data = [{
        value: 'Consentimiento de hospitalización',
      }, {
        value: 'Consentimiento de procedimiento',
      }];

    return (
      <View style={{ flex: 1 }}>
        <CardSection>
          <Dropdown
          containerStyle={{ flex: 1 }}
          data={data}
          value={this.state.tipoFormato}
          onChangeText={value => { this.setState({ tipoFormato: value }); }}
          placeholder={'Selecciona el tipo de ingreso'}
          />
        </CardSection>

        {this.buscarPaciente()}
        {this.impresiones()}
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
 const { text, Patient, Impresiones } = query;
 console.log(query);
 return { text, Patient, Impresiones };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, session, printHTMLReducer })(Reimprimir);
