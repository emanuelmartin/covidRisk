import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk'
import Parse from 'parse/react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import Nav from './components/navigator';
import 'react-native-gesture-handler';
<<<<<<< HEAD
import {Notifications} from 'react-native-notifications';
=======
import { Notifications } from 'react-native-notifications';
import codePush from "react-native-code-push";
>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea

const AsyncStorage = require('react-native').AsyncStorage;


Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'https://parseapi.back4app.com/';

class App extends Component {

  componentWillMount() {
    console.disableYellowBox = true;
      Parse.initialize('BdSYShHyLMSauwh6WfzaQ63roeNubaor3FSYinGE',
     'QYFb4wPkwnIQ0zrE0TZLSvVH1TqtNFfeFHhTun5J');
     Notifications.registerRemoteNotifications();

     Notifications.events().registerNotificationReceivedForeground((notification: Notification, completion) => {
       console.log(`Notification received in foreground: ${notification.title} : ${notification.body}`);
       completion({alert: false, sound: false, badge: false});
     });

     Notifications.events().registerNotificationOpened((notification: Notification, completion) => {
       console.log(`Notification opened: ${notification.payload}`);
       completion();
     });

     Notifications.postLocalNotification({
<<<<<<< HEAD
=======

>>>>>>> 6aa61c925e56282341ae3b180de7d8d7550ba5ea
  body: 'Has recibido un pedido de enfermería',
  title: 'Pedido nuevo',
  sound: 'chime.aiff',
  category: 'SOME_CATEGORY',
  link: 'localNotificationLink',
  fireDate: new Date()
}, 1);
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
    const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, updateDialog: updateDialogOptions, installMode: codePush.InstallMode.IMMEDIATE };

App = codePush(codePushOptions)(App);

export default App;
