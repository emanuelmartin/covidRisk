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
import { SearchBar, Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Button, CardSection } from '../common';
import { queryFunc, cleanFunc, cleanBarCode, setItemCode } from '../../actions';

class InventoryList extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '', barCodeCharged: false, barCode: '', barType: '' };
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
            Farmacia: null,
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

  render() {
    let dataList = null;
    if (Array.isArray(this.props.Farmacia)) {
      dataList = this.props.Farmacia;
    } else {
      dataList = [this.props.Farmacia];
    }
    if (this.props.barCode !== '') {
      this.props.queryFunc({
        type: 'startsWith',
        object: 'Farmacia',
        variable: 'barCode',
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
    if (this.state.barCodeCharged && this.props.Farmacia === 'Failed') {
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
        <SearchBar
          round
          lightTheme
          searchIcon={
            <Icon
              name='camera'
              type='material-community'
              onPress={this.navigateToScreen('BarCodeScanner', { updateCode: false })}
            />}
          onChangeText={text => this.props.queryFunc({
            type: 'startsWith',
            object: 'Farmacia',
            variable: 'name',
            text })}
          onClear={text => this.props.queryFunc({ text: '' })}
          placeholder="Ingresa el nombre comercial"
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
              <Text style={styles.textStyle}>{item.laboratory} - {item.name} {item.presentation} {item.content}</Text>
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
  footerButton: {

  }
});

const mapStateToProps = ({ query, barCodeReader }) => {
 const { text, Farmacia } = query;
 const { barCode, barType } = barCodeReader;
 return { text, Farmacia, barCode, barType };
};

export default connect(mapStateToProps,
  { queryFunc, cleanFunc, cleanBarCode, setItemCode })(InventoryList);
