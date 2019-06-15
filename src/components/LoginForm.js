import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import Parse from 'parse/react-native';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onLoginButtonPress() {
    const { email, password } = this.state;
    const username = email;

    this.setState({ error: '', loading: true });
    const user = new Parse.User();

  console.log("Usuario : " + username + ", Contraseña: " + password);

    user.set("username", username);
    user.set("email", email);
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

  onSignupButtonPress() {
    // Navegar hacia pantalla de registro de usuario
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

  renderLoginButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onLoginButtonPress.bind(this)}>
        Iniciar sesión
      </Button>
    );
  }

  render() {
    return (
      <Card>
      <CardSection>
      <Image
        style={styles.imageStyle}
        source={require('./LogoVerde.png')}
      />
      </CardSection>

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
          {this.renderLoginButton()}
        </CardSection>

        <CardSection>
          <Button onPress={this.onSignupButtonPress.bind(this)}>
            Registrarse
            </Button>
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
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
};

export default LoginForm;
