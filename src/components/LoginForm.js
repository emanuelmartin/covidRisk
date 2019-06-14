import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import Parse from 'parse/react-native';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;
    const username = email;

    this.setState({ error: '', loading: true });
    const user = new Parse.User();

  console.log("Usuario : " + username + ", Contraseña: " + password);

    user.set("username", username);
    user.set("password", password);
    user.set("password", password);

      user.logIn(username, password)
        .then(this.onLoginSuccess.bind(this))
        .catch((error) => {
        console.log('Error: ' + error.code + ' ' + error.message);
        user.signUp()
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this))
          });
}

  onLoginFail() {
    this.setState({ error: 'Error al iniciar sesión', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Iniciar sesión
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="usuario@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="contraseña"
            label="Contraseña"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
