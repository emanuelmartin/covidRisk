import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk'
import Parse from 'parse/react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Nav from './components/navigator';
import 'react-native-gesture-handler';

const AsyncStorage = require('react-native').AsyncStorage;

Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default class MyComponent extends Component {
  componentWillMount() {
    console.disableYellowBox = true;
      Parse.initialize('BdSYShHyLMSauwh6WfzaQ63roeNubaor3FSYinGE',
     'QYFb4wPkwnIQ0zrE0TZLSvVH1TqtNFfeFHhTun5J');
  }


  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Nav />
      </Provider>
    );
  }
}
