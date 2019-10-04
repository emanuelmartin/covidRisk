import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import Modal from 'react-native-modal';
import { NavigationActions } from 'react-navigation';
import { SearchBar, Icon, CheckBox } from 'react-native-elements';
import { connect } from 'react-redux';
import { Button, CardSection } from '../common';
import { queryFunc, queryAttach, cleanFunc, cleanBarCode, setItemCode } from '../../actions';

class InventoryList extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = {
      isLoading: true,
      search: '',
      barCodeCharged: false,
      barCode: '',
      barType: '',
      modal: false,
      checkMedicamento: true,
      checkInsumo: true,
      checkCafeteria: true
    };
    this.arrayholder = [];
  }
  static navigationOptions = {
    title: 'Inventario',
  };

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  componentDidMount() {
    this.props.queryFunc({ text: '' });
    this.props.cleanFunc();
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
          },
          function () {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentWillUnmount() {
    this.props.cleanFunc();
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
    this.props.navigation.navigate(route, item);
  }

  queryInventory = (text) => {
    if (this.props.userType === 'admin') {
      if ((this.state.checkMedicamento === true && this.state.checkInsumo === true && this.state.checkCafeteria === true)
      || (this.state.checkMedicamento === false && this.state.checkInsumo === false && this.state.checkCafeteria === false)) {
            this.props.queryFunc({
              type: 'startsWith',
              object: 'Inventario',
              variable: 'nombre',
              text });
      } else if (this.state.checkMedicamento === true &&
               this.state.checkInsumo === false &&
               this.state.checkCafeteria === false) {
       this.props.queryAttach({
         object: 'Inventario',
         text,
         constrain: [{ type: 'startsWith', variable: 'nombre', text },
           { type: 'equalTo', variable: 'tipo', text: 'medicamento', bool: 'and' }]
         });
      } else if (this.state.checkMedicamento === false &&
               this.state.checkInsumo === true &&
               this.state.checkCafeteria === false) {
       this.props.queryAttach({
         object: 'Inventario',
         text,
         constrain: [{ type: 'startsWith', variable: 'nombre', text },
           { type: 'equalTo', variable: 'tipo', text: 'insumo', bool: 'and' }]
         });
      } else if (this.state.checkMedicamento === false &&
               this.state.checkInsumo === false &&
               this.state.checkCafeteria === true) {
       this.props.queryAttach({
         object: 'Inventario',
         text,
         constrain: [{ type: 'startsWith', variable: 'nombre', text },
           { type: 'equalTo', variable: 'tipo', text: 'cafeteria', bool: 'and' }]
         });
      } else if (this.state.checkMedicamento === true &&
               this.state.checkInsumo === true &&
               this.state.checkCafeteria === false) {
       this.props.queryAttach({
         object: 'Inventario',
         text,
         constrain: [{ type: 'startsWith', variable: 'nombre', text },
           { type: 'notEqualTo', variable: 'tipo', text: 'cafeteria', bool: 'and' }]
         });
      } else if (this.state.checkMedicamento === true &&
               this.state.checkInsumo === false &&
               this.state.checkCafeteria === true) {
       this.props.queryAttach({
         object: 'Inventario',
         text,
         constrain: [{ type: 'startsWith', variable: 'nombre', text },
           { type: 'notEqualTo', variable: 'tipo', text: 'insumo', bool: 'and' }]
         });
      } else if (this.state.checkMedicamento === false &&
               this.state.checkInsumo === true &&
               this.state.checkCafeteria === true) {
       this.props.queryAttach({
         object: 'Inventario',
         text,
         constrain: [{ type: 'startsWith', variable: 'nombre', text },
           { type: 'notEqualTo', variable: 'tipo', text: 'medicamento', bool: 'and' }]
         });
      }
    } else if (this.props.userType === 'farmacia' ||
    this.props.userType === 'enfermeria') {
      if (this.state.checkMedicamento === true &&
          this.state.checkInsumo === true) {
            this.props.queryAttach({
              object: 'Inventario',
              text,
              constrain: [{ type: 'startsWith', variable: 'nombre', text },
                { type: 'notEqualTo', variable: 'tipo', text: 'cafeteria', bool: 'and' }]
              });
      } else if (this.state.checkMedicamento === true &&
                 this.state.checkInsumo === false) {
       this.props.queryAttach({
         object: 'Inventario',
         text,
         constrain: [{ type: 'startsWith', variable: 'nombre', text },
           { type: 'equalTo', variable: 'tipo', text: 'medicamento', bool: 'and' }]
         });
      } else if (this.state.checkMedicamento === false &&
                 this.state.checkInsumo === true) {
       this.props.queryAttach({
         object: 'Inventario',
         text,
         constrain: [{ type: 'startsWith', variable: 'nombre', text },
           { type: 'equalTo', variable: 'tipo', text: 'insumo', bool: 'and' }]
         });
      }
    } else {
      this.props.queryAttach({
        object: 'Inventario',
        text,
        constrain: [{ type: 'startsWith', variable: 'nombre', text },
          { type: 'equalTo', variable: 'tipo', text: 'cafeteria', bool: 'and' }]
      });
    }
  }

  ListViewItemSeparator = () => {
    //Item sparator view
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

  onAcceptPress() {
    this.props.navigation.navigate('AddItemScreen');
    this.props.setItemCode(this.state.barCode, this.state.barType);
  }

  onCancelPress() {
    this.setState({ barCodeCharged: false, barCode: '', barType: '' });
  }

  showAdvancedSearch() {
    if (this.props.userType === 'admin' || this.props.userType === 'farmacia' || this.props.userType === 'enfermeria') {
      return (
        <TouchableWithoutFeedback onPress={() => this.setState({ modal: true })} >
          <Text style={styles.advancedOptionsStyle}>Búsqueda Avanzada</Text>
        </TouchableWithoutFeedback>
      );
    }
  }

  modalContent() {
    if (this.props.userType === 'admin') {
      return (
        <View>
          <CheckBox
            title='Medicamento'
            checked={this.state.checkMedicamento}
            onPress={() => this.setState({ checkMedicamento: !this.state.checkMedicamento })}
          />
          <CheckBox
            title='Insumo'
            checked={this.state.checkInsumo}
            onPress={() => this.setState({ checkInsumo: !this.state.checkInsumo })}
          />
          <CheckBox
            title='Cafeteria'
            checked={this.state.checkCafeteria}
            onPress={() => this.setState({ checkCafeteria: !this.state.checkCafeteria })}
          />
        </View>
      );
    } else if (this.props.userType === 'farmacia' || this.props.userType === 'enfermeria') {
      return (
        <View>
          <CheckBox
            title='Medicamento'
            checked={this.state.checkMedicamento}
            onPress={() => this.setState({ checkMedicamento: !this.state.checkMedicamento })}
          />
          <CheckBox
            title='Insumo'
            checked={this.state.checkInsumo}
            onPress={() => this.setState({ checkInsumo: !this.state.checkInsumo })}
          />
        </View>
      );
    }
  }

  renderModal() {
    return (
      <View>
        <Modal
          isVisible={this.state.modal}
          animationType='slide'
          transparent={false}
          style={styles.modalStyle}
          onShow={() => {
            this.setState({
              checkMedicamento: false,
              checkInsumo: false,
              checkCafeteria: false,
           });
          }}
        >
          <CardSection>
            <Text style={styles.titleStyle}>
              Opciones de Búsqueda Avanzada
            </Text>
          </CardSection>
          <Text style={{ textAlign: 'center' }}>
            Marque el tipo de producto que desea buscar:
          </Text>
          {this.modalContent()}
          <CardSection>
            <Button
              onPress={() => {
                this.setState({ modal: false });
                if (this.state.checkMedicamento === false &&
                    this.state.checkInsumo === false &&
                    this.state.checkCafeteria === false) {
                      this.setState({
                        checkMedicamento: true,
                        checkInsumo: true,
                        checkCafeteria: true,
                      });
                  }
                  this.props.queryFunc({ text: '' });
                  this.props.cleanFunc();
                }
              }
            >
              Aceptar
            </Button>
          </CardSection>
        </Modal>
      </View>
    );
  }

  render() {
    let dataList = null;
    if (Array.isArray(this.props.Inventario)) {
      dataList = this.props.Inventario;
    } else {
      dataList = [this.props.Inventario];
    }
    if (this.props.barCode !== '') {
      this.props.queryFunc({
        type: 'equalTo',
        object: 'Inventario',
        variable: 'codigo',
        text: this.props.barCode });
      this.setState({
        barCodeCharged: true,
        barCode: this.props.barCode,
        barType: this.props.barType
      });
      this.props.cleanBarCode();
    }
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    if (this.state.barCodeCharged && this.props.Inventario === 'Failed') {
      Alert.alert(
        'Error: Producto no encontrado',
        '¿Desea agregarlo? ',
        [
          { text: 'Si', onPress: () => this.onAcceptPress() },
          { text: 'No', onPress: () => this.onCancelPress(), style: 'cancel' },
        ],
        { cancelable: false }
      );
      return (
        <View />
      );
    }

    return (
      //ListView to show with textinput used as search bar
      <View style={{ flex: 1 }}>
      <View style={styles.viewStyle}>
        {this.showAdvancedSearch()}
        {this.renderModal()}
        <SearchBar
          round
          lightTheme
          searchIcon={
            <Icon
              name='camera'
              type='material-community'
              onPress={this.navigateToScreen('BarCodeScanner', { updateCode: false })}
            />}
          onChangeText={text => this.queryInventory(text)}
          onClear={() => this.props.queryFunc({ text: '' })}
          placeholder="Ingresa el nombre del producto"
          value={this.props.text}
        />
          <FlatList
            data={dataList}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //Item Separator View
            renderItem={({ item }) => (
              // Single Comes here which will be repeatative for the FlatListItems
              <TouchableWithoutFeedback
              onPress={this.navigateToScreen('InventoryDetail', { item })}
              >
              <Text style={styles.textStyle}>{item.laboratorio} - {item.nombre} {item.presentacion} {item.contenido}</Text>
              </TouchableWithoutFeedback>
            )}
            enableEmptySections
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <CardSection>
          <Button onPress={this.navigateToScreen('AddItemScreen')}>
            Añadir Producto
          </Button>
        </CardSection>
        <CardSection />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
  },
  textStyle: {
    padding: 10,
  },
  advancedOptionsStyle: {
    fontSize: 16,
    color: '#63C0B9',
    textAlign: 'center'
  },
  modalStyle: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#63C0B9'
  }
});

const mapStateToProps = ({ query, barCodeReader, auth }) => {
 const { text, Inventario } = query;
 const { barCode, barType } = barCodeReader;
 const userType = auth.user.attributes.type;
 return { text, Inventario, barCode, barType, userType };
};

export default connect(mapStateToProps,
  { queryFunc, queryAttach, cleanFunc, cleanBarCode, setItemCode })(InventoryList);
