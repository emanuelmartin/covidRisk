import * as React from 'react';
import Parse from 'parse/react-native';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { Button } from '../common';


export default class PatientList extends React.Component {
  constructor(props) {
    super(props);
    //setting default state
    this.state = { isLoading: true, search: '' };
    this.arrayholder = [];
  }
  static navigationOptions = {
    title: 'Pacientes',
  };

  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: null,
          },
          function() {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }
  search = text => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  async SearchFilterFunction(text) {
    const Patient = Parse.Object.extend('Patient');
    const query = new Parse.Query(Patient);
    console.log(text);
    query.startsWith('lastName1', text);
    query.find().then((results) => {
      var jsonArray = [];

        for(var i = 0; i < results.length; i++) {
           jsonArray.push(results[i].toJSON());
        }
      console.log(jsonArray);
      this.setState({
        dataSource: jsonArray,
        search: text
      })
    });
    //passing the inserted text in textinput
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
  render() {
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
          searchIcon={{ size: 24 }}
          onChangeText={text => this.SearchFilterFunction(text)}
          onClear={text => this.SearchFilterFunction('')}
          placeholder="Buscar..."
          value={this.state.search}
          />
          <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          //Item Separator View
          renderItem={({ item }) => (
            // Single Comes here which will be repeatative for the FlatListItems
            <Text style={styles.textStyle}>{item.names} {item.lastName1} {item.lastName2}</Text>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
        </View>
        <View>
        <Button onPress={this.navigateToScreen('PatientForm')}>
          Añadir paciente
        </Button>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor:'white',
  },
  textStyle: {
    padding: 10,
  },
  footerButton: {

  }
});
