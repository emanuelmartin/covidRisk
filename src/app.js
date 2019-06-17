import React, { Component } from 'react';
//import { View } from 'react-native';
import Parse from 'parse/react-native';
import { Button, Spinner } from './components/common';
import Nav from './components/navigator';

const AsyncStorage = require('react-native').AsyncStorage;

Parse.setAsyncStorage(AsyncStorage);
Parse.serverURL = 'https://parseapi.back4app.com/';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    Parse.initialize('icFCUtvKPsK8qzQ0t1tIp8CcujLOjy21QANcst14',
     'H2VaVQ44cBvBWzu6cO4lASalkmvSdSd4GIvCJrxA');

Parse.User.currentAsync().then((user) => {
      if (user) {
        this.setState({ loggedIn: true });
        //let sessionToken = user.getSessionToken();
        const sessionToken = user.getSessionToken();
        console.log(sessionToken);
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return <Spinner size="large" />;
      case false:
        return <Nav />;
      default:
        return (
          <Button
            onPress={() => {
              Parse.User.logOut();
              this.setState({ loggedIn: false });
            }
         }>
            Cerrar sesión
          </Button>
        );

    }
  }

  render() {
    return (
      this.renderContent()
    );
  }
}

export default App;
