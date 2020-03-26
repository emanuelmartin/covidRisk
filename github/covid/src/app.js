import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk'
import Parse from 'parse/react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Nav from './components/navigator';
import 'react-native-gesture-handler';
import { Notifications } from 'react-native-notifications';
//import codePush from "react-native-code-push";

const AsyncStorage = require('react-native').AsyncStorage;


Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'https://parseapi.back4app.com/';

class App extends Component {

  componentWillMount() {
    console.disableYellowBox = true;
      Parse.initialize('US6Z8wCHUWHj23MTwRiHzecUhzRUPDCMqVKTWxbA',
     '4kSMGxSabFsPrjKgQgJapYMpy84zKKPjrumTn8Ha');
/*
     Notifications.postLocalNotification({

  body: 'Has recibido un pedido de enfermería',
  title: 'Pedido nuevo',
  sound: 'chime.aiff',
  category: 'SOME_CATEGORY',
  link: 'localNotificationLink',
  fireDate: new Date()
}, 1);*/
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

const updateDialogOptions = {
        title: "Tienes una actualización",
        optionalUpdateMessage: "Tienes una actualización disponible, ¿quieres instalarla?",
        optionalIgnoreButtonLabel: "No",
        optionalInstallButtonLabel: "Sí",
        mandatoryUpdateMessage: "Se instalará una nueva actualización",
    };
//const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, updateDialog: updateDialogOptions, installMode: codePush.InstallMode.IMMEDIATE };

//App = codePush(codePushOptions)(App);

export default App;
