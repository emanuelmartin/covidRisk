import React, { Component } from 'react';
import { View } from 'react-native';
import Parse from 'parse/react-native';
import { Header, Button, Spinner } from './components/common';
import SignupForm from './components/SignUpForm';
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
      case false:
        return <SignupForm />;
      default:
        return <Spinner size="large" />;
    }
  }

  render() {
    return (
      <Nav />
    );
  }
}

export default App;
