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
import { queryFunc, cleanFunc, queryAttach } from '../../actions';
import { ComponentePaciente } from '../Listas';


class PatientList extends React.Component {
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
    this.props.queryFunc({ text: '' });
    this.props.cleanFunc();
    this.setState(
      {
        isLoading: false,
        Patient: null,
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
    if (this.state.isLoading) {
      //Loading View while data is loading
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }
    let dataList = null;
    if (this.props.User !== 'Failed' &&
    this.props.User !== '' &&
    this.props.User !== undefined) {
      if (Array.isArray(this.props.User)) {
        dataList = this.props.User;
      } else {
        dataList = [this.props.User];
      }
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
              this.props.queryAttach({
                object: 'User',
                text,
                constrain: [{ type: 'startsWith', variable: 'lastName1', text },
                  { type: 'equalTo', variable: 'userType', text: 'paciente', bool: 'and' }]
              });
            } else {
              this.props.cleanFunc();
            }
          }}
          onClear={() => this.props.queryFunc({ text: '' })}
          placeholder="Ingresa el primer apellido..."
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
                <ComponentePaciente item={item} />
              </View>
              </TouchableWithoutFeedback>
            )}
            enableEmptySections
            style={{ marginTop: 10 }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <CardSection>
          <Button onPress={this.navigateToScreen('SignUp')}>
            Añadir paciente
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
 const { text, User } = query;
 return { text, User };
};

export default connect(mapStateToProps, { queryFunc, cleanFunc, queryAttach })(PatientList);
