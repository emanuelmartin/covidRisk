import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, loginUser, session } from '../actions';
import Parse from 'parse/react-native';

class LoginForm extends Component {
  componentWillMount() {
    Parse.User.currentAsync().then((user) => {
        console.log(user);
        this.props.session(user);
        });
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

onSignupButtonPress() {
  this.props.navigation.navigate('SignUp');
}

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />
    }

    return(
      <Button onPress={this.onLoginButtonPress.bind(this)}>
        Iniciar sesión
      </Button>
    );
  }

  renderError() {
    if (this.props.error) {
      console.log(this.props.error)
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  render() {
    if (this.props.loggedIn) {
    this.props.navigation.navigate('Home');
  }
    return (
      <Card>
        <Image
        source={(require('./img/LogoVerde.png'))}
        style={{width: 400, height: 400}}
        />
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Contraseña"
            placeholder="contraseña"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
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
  }
};

const mapStateToProps = ({ auth }) => {
 const { email, password, error, loading, loggedIn } = auth;
 return { email, password, error, loading, loggedIn };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, session
})(LoginForm);
