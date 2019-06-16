import React, { Component } from 'react';
import { Text } from 'react-native';
import Parse from 'parse/react-native';
import DatePicker from 'react-native-datepicker';
import { RadioButton } from 'react-native-paper';
import { Header, Button, Card, CardSection, Input, Spinner } from './common';

class SignUpForm extends Component {
  state = { email: '', password: '', error: '', loading: false, checked: '' };

  onSignupButtonPress() {
    const { email, password, name, lastName, sex, birthday, degree } = this.state;
    const username = email;

    this.setState({ error: '', loading: true });
    const user = new Parse.User();

    user.set('username', username);
    user.set('email', email);
    user.set('password', password);
    user.set('name', name);
    user.set('lastName', lastName);
    user.set('sex', sex);
    user.set('birthday', birthday);
    user.set('degree', degree);

    user.signUp()
      .then(this.onSignupSuccess.bind(this))
      .catch((error) => {
      console.log(`Error: ${error.code} ${error.message}`);
      this.setState({ error: 'Error al registrarse', loading: false });
    });
}

  onSignupFail() {
    this.setState({ error: 'Error al registrarse', loading: false });
  }

  onSignupSuccess() {
    this.setState({
      username: '',
      email: '',
      password: '',
      name: '',
      lastName: '',
      sex: '',
      birthday: '',
      degree: '',
      loading: false,
      error: ''
    });
  }

  renderSignupButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onSignupButtonPress.bind(this)}>
        Registrarse
      </Button>
    );
  }

  render() {
    const { checked } = this.state;
    return (
      <Card>
        <Header headerText='Hospital Real San Lucas' />
        <CardSection>
          <Input
            placeholder=""
            label="Nombre"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />
        </CardSection>

        <CardSection>
          <Input
            placeholder=""
            label="Apellido"
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
          />
        </CardSection>

        <CardSection>
          <Input
            placeholder=""
            label="Profesión"
            value={this.state.degree}
            onChangeText={degree => this.setState({ degree })}
          />
        </CardSection>

        <CardSection>
          <RadioButton
          value="first"
          status={checked === 'first' ? 'checked' : 'unchecked'}
          onPress={() => { this.setState({ checked: 'first' }); }}
          />
          <RadioButton
            value="second"
            status={checked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => { this.setState({ checked: 'second' }); }}
          />
        </CardSection>

        <CardSection>
          <DatePicker
            style={{ width: 200 }}
            date={this.state.birthday}
            mode="date"
            placeholder="Fecha de nacimiento"
            format="DD-MM-YYYY"
            minDate="01-01-1950"
            maxDate="01-01-2020"
            confirmBtnText="Confirmar"
            cancelBtnText="Cancelar"
            customStyles={{
              dateIcon: {
                //showIcon: false, // Marca error al entrar en esta pantalla
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(birthday) => { this.setState({ birthday }); }}
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

        <CardSection>
          {this.renderSignupButton()}
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

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

export default SignUpForm;
