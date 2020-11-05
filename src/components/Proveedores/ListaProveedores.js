import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Button, CardSection } from '../common';
import { queryFunc, cleanFunc } from '../../actions';
import { ComponentePaciente } from '../Listas';


class ListaProveedores extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }
  static navigationOptions = {
    title: 'Proveedores',
  };

  componentDidMount() {
    this.props.queryFunc({ text: '' });
    this.props.cleanFunc();
    this.setState(
      {
        isLoading: false,
        Proveedor: null,
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
    let dataList = null;
    if (Array.isArray(this.props.Proveedor)) {
      dataList = [].concat(this.props.Proveedor).sort((a, b) => a.nombre > b.nombre);
    } else {
      dataList = [].concat([this.props.Proveedor]).sort((a, b) => a.nombre > b.nombre);
    }

    console.log(dataList)
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      //ListView to show with textinput used as search bar
      <View style={{ flex: 1 }}>
      <View style={styles.viewStyle}>
        <SearchBar
          round
          lightTheme
          searchIcon={{ size: 24 }}
          onChangeText={text => {
            if (text !== '') {
              this.props.queryFunc({
                type: 'startsWith',
                object: 'Proveedor',
                variable: 'nombre',
                text
              });
            } else {
              this.props.cleanFunc();
            }
          }}
          onClear={() => this.props.queryFunc({ text: '' })}
          placeholder="Ingresa el nombre de la empresa..."
          value={this.props.text}
        />
          <FlatList
            data={dataList}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //Item Separator View
            renderItem={({ item }) => (
              // Single Comes here which will be repeatative for the FlatListItems
              <TouchableWithoutFeedback
              onPress={this.navigateToScreen('PatientDetail', item)}
              >
              <View>
                <Text> {item.nombre} </Text>
              </View>
              </TouchableWithoutFeedback>
            )}
            enableEmptySections
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <CardSection>
          <Button onPress={this.navigateToScreen('AgregarProveedor')}>
            Añadir proveedor
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
  footerButton: {

  }
});

const mapStateToProps = ({ query }) => {
 const { text, Proveedor } = query;
 return { text, Proveedor };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc })(ListaProveedores);
