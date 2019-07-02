import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk'
import Parse from 'parse/react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Nav from './components/Navigator';

const AsyncStorage = require('react-native').AsyncStorage;

Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'https://parseapi.back4app.com/';

export default class MyComponent extends Component {
  componentWillMount() {
    Parse.initialize('icFCUtvKPsK8qzQ0t1tIp8CcujLOjy21QANcst14',
     'H2VaVQ44cBvBWzu6cO4lASalkmvSdSd4GIvCJrxA');
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
