import React, { Component } from 'react';
import { Text, Image, View } from 'react-native';
import Parse from 'parse/react-native';
import { Header, Footer, Button, Input, Spinner, Form, FormSection } from './common';

class LoginForm extends Component {
  static navigationOptions = {
    title: 'Inicio de Sesión',
  };

  state = { email: '', password: '', error: '', loading: false };

  onLoginButtonPress() {
    const { email, password } = this.state;
    const username = email;

    this.setState({ error: '', loading: true });
    const user = new Parse.User();

    console.log(`Usuario : ${username}, Contraseña: ${password}`);

    user.set('username', username);
    user.set('email', email);
    user.set('password', password);

      user.logIn(username, password)
        .then(this.onLoginSuccess.bind(this))
        .catch((error) => {
        console.log(`Error: ${error.code} ${error.message}`);
          });
}

  onSignupButtonPress() {
    this.props.navigation.navigate('SignUp');
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
    this.props.navigation.navigate('Home');
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
      <Form>
        <Header headerText='Hospital Real San Lucas' />
        <View>
          <FormSection>
            <Image
              style={styles.imageStyle}
              source={require('../image/LogoVerde.png')}
            />
          </FormSection>
        </View>

        <View>
          <FormSection>
            <Input
              placeholder="usuario@gmail.com"
              label="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
            />
          </FormSection>

          <FormSection>
            <Input
              secureTextEntry
              placeholder="contraseña"
              label="Contraseña"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
            />
          </FormSection>

          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
        </View>

        <View>
          <FormSection>
            {this.renderLoginButton()}
          </FormSection>

          <FormSection>
            <Button onPress={this.onSignupButtonPress.bind(this)}>
              Registrarse
              </Button>
          </FormSection>
        </View>

        <Footer footerText='Powered by Healtech' />
      </Form>
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
  },
};

export default LoginForm;
