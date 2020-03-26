import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import Parse from 'parse/react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Nav from './components/navigator';

const AsyncStorage = require('react-native').AsyncStorage;

Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'http://192.168.10.109:1337/parse';

export default class MyComponent extends Component {
  componentWillMount() {
    Parse.initialize('app2',
     'key3');
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
