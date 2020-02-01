import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import SwipeView from 'react-native-swipeview';
import { NavigationActions } from 'react-navigation';
import { SearchBar, Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { CardSection, Button, Spinner, Input } from '../common';
import {
  queryFunc,
  queryAttach,
  queryPointer,
  writeFunc,
  cleanFunc,
  addBill,
  clearBill,
  payment,
  corte,
  printHTMLReducer,
  printClean
} from '../../actions';

class AjustePrecios extends Component {
  static navigationOptions = {
    title: 'Ajuste Precios',
  };

  constructor(props) {
    super(props);
    // setting default state
    this.state = {
      type: ''
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.props.queryFunc({ text: '' });
    this.props.cleanFunc();
    this.props.printClean();
    this.setState(
      {
        type: ''
      });
  }

  componentWillUnmount() {
    this.props.cleanFunc();
    this.props.printClean();
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

  renderServicios(item) {
    const precioPublicoIva = (item.precioPublico * (1 + item.iva/100)).toFixed(2)
      const precioSeguroIva = (item.precioSeguro * (1 + item.iva/100)).toFixed(2)
      return (
      <TouchableWithoutFeedback
      onPress={this.navigateToScreen('DetallePrecio', { item })}
      >
        <View>
          <Text style={styles.emphasisTextStyle} >
            {item.nombre}
          </Text>
          <Text style={styles.textStyle} >
            Precio Público: ${precioPublicoIva}
          </Text>
          <Text style={styles.textStyle} >
            Precio Seguro: ${item.precioSeguro}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const data = [{
      value: 'imagen',
    }, {
      value: 'laboratorio'
    },
            { value: 'administrativo' }];

    if (this.props.Servicios!=='Failed' &&
        this.props.Servicios!=='' &&
        this.props.Servicios!==undefined) {
        return (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <CardSection>
                <Dropdown
                containerStyle={{ flex: 1 }}
                data={data}
                value={this.state.sellType}
                onChangeText={value => {
                  this.setState({ type: value });
                  this.props.queryFunc({
                    type: 'equalTo',
                    object: 'Servicios',
                    variable: 'tipo',
                    text: this.state.type,
                    limit: 300
                  });
                }}
                placeholder={'Selecciona el tipo de producto/servicios'}
                />
              </CardSection>
              <CardSection>
                <FlatList
                  data={this.props.Servicios}
                  ItemSeparatorComponent={this.ListViewItemSeparator}
                  //Item Separator View
                  renderItem={({ item }) => (
                    this.renderServicios(item)
                  )}
                  enableEmptySections
                  style={{ marginTop: 10 }}
                  keyExtractor={(item) => item.objectId}
                />
              </CardSection>
            </ScrollView>
            <CardSection>
              <Button onPress={this.navigateToScreen('NewService')}>
                Añadir Servicio
              </Button>
            </CardSection>
            <CardSection />
          </View>
          );
      }
      else {
        return (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <CardSection>
                <Dropdown
                containerStyle={{ flex: 1 }}
                data={data}
                value={this.state.type}
                onChangeText={value => {
                  this.setState({ type: value });
                  this.props.queryFunc({
                    type: 'equalTo',
                    object: 'Servicios',
                    variable: 'tipo',
                    text: this.state.type,
                    limit: 200
                  });
                }}
                placeholder={'Selecciona el tipo de producto/servicios'}
                />
              </CardSection>
            </ScrollView>
            <CardSection>
              <Button onPress={this.navigateToScreen('NewService')}>
                Añadir Servicio
              </Button>
            </CardSection>
            <CardSection />
          </View>
          );
      }
    }
  }

const styles = StyleSheet.create({
  textStyle: {
    padding: 10,
  },
  patientTextStyle: {
    fontSize: 18,
  },
  emphasisTextStyle: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold'
  }
});

const mapStateToProps = ({ query, bill, printR }) => {
 const { text, User, Servicios, Caja } = query;
 const load = query.loading;
 const { loading, error, succesBill, succesPay, ticketInfo } = bill;
 const { print } = printR;
 return {
   text,
   User,
   Servicios,
   Caja,
   loading,
   error,
   succesBill,
   succesPay,
   load,
   ticketInfo,
   print
 };
};

export default connect(mapStateToProps,
  { queryFunc,
    queryAttach,
    queryPointer,
    writeFunc,
    cleanFunc,
    addBill,
    clearBill,
    payment,
    corte,
    printHTMLReducer,
    printClean
})(AjustePrecios);
