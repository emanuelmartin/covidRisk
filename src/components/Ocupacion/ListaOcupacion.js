import * as React from 'react';
import Parse from 'parse/react-native';
import { Picker } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Button, CardSection } from '../common';
import { queryFunc, cleanFunc } from '../../actions';

export default class ListaOcupacion extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { Tipo: 'Habitación', isLoading: true, search: '' };
    this.arrayholder = [];
  }
  static navigationOptions = {
    title: 'Ocupación',
  };

  componentDidMount() {
    console.log(this.state.Tipo);
    const parseObject = Parse.Object.extend('Ocupacion');
    const query = new Parse.Query(parseObject);
    let jsonArray = [];
    query['startsWith']('Tipo', this.state.Tipo);
    query.find().then((results) => {
        for (let i = 0; i < results.length; i++) {
           jsonArray.push(results[i].toJSON());
        }
        console.log(jsonArray)
      this.setState({ isLoading: false, Ocupacion: jsonArray });
  });
}

async query(value) {
  this.setState({ Tipo: value, isLoading: true })
  const parseObject = Parse.Object.extend('Ocupacion');
  const query = new Parse.Query(parseObject);
  let jsonArray = [];
  query['startsWith']('Tipo', this.state.Tipo);
  query.find().then((results) => {
      for (let i = 0; i < results.length; i++) {
         jsonArray.push(results[i].toJSON());
      }
      console.log(jsonArray)
    this.setState({ isLoading: false, dataSource: jsonArray });
});
}

  setStyle(estado) {
    if (estado) { return ({
        padding: 10,
        backgroundColor: '#F55E64'
      });}
  else { return ({
    padding: 10,
    backgroundColor: '#53E69D'
  });}
}

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
      let data = [{
          value: 'Habitación',
        }, {
          value: 'Quirófano',
        }, {
          value: 'Sala de shock'
        }, {
          value: 'Recuperación quirúrgica'
        }, {
          value: 'Sala de procedimientos'
        }, {
          value: 'Recuperación procedimientos'
        }, {
          value: 'Recuperación ambulatoria'
        }, {
          value: 'Neonatos'
        }, {
          value: 'Observación urgencias'
        }];
    this.query.bind(this);
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
        <CardSection>
        <Dropdown
        containerStyle={{ flex: 1 }}
        data={data}
        value={this.state.Tipo}
        onChangeText={value => this.setState({ Tipo: value, isLoading: true })}
      />
        </CardSection>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
      <CardSection>
        <Dropdown
        containerStyle={{ flex: 1 }}
        data={data}
        value={this.state.Tipo}
        onChangeText={value => this.query(value)}
      />
      </CardSection>
      <ScrollView style={styles.viewStyle}>
      <CardSection>
          <FlatList
            data={this.state.Ocupacion}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            //Item Separator View
            renderItem={({ item }) => (
              // Single Comes here which will be repeatative for the FlatListItems
              <TouchableWithoutFeedback
              onPress={this.navigateToScreen('PatientDetail', item)}
              >
              <Text style={this.setStyle(item.Ocupada)} >{item.Tipo} {item.ID}</Text>
              </TouchableWithoutFeedback>
            )}
            enableEmptySections
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
          </CardSection>
        </ScrollView>
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
    padding: 10,
  },
  footerButton: {

  }
});