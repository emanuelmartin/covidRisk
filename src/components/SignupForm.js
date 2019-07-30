import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { signupUpdate, userCreate } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class SignupForm extends Component {
  static navigationOptions = {
    title: 'Nuevo Usuario',
  };

  componentWillMount() {
    this.setState({ key: 'personal' });
  }

  onUserCreatePress() {
    this.props.userCreate(this.props.signupForm);
  }

  personal() {
    if (this.state.key === 'personal') {
      return (
      <View>
      <CardSection>
        <Input
          required
          label="CURP"
          placeholder="MAAH960909HJCRLC04"
          value={this.props.curp.toShow}
          valid={this.props.curp.valid}
          edited={this.props.curp.edited}
          onChangeText={value => this.props.signupUpdate({ prop: 'curp', value, type: 'curp', edited: true })}
        />
      </CardSection>

        <CardSection>
          <Input
            label="Apellido Paterno"
            placeholder="Casillas"
            value={this.props.lastName1.toShow}
            valid={this.props.lastName1.valid}
            edited={this.props.lastName1.edited}
            onChangeText={value => this.props.signupUpdate({ prop: 'lastName1', value, type: 'oneWord', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Apellido Materno"
            placeholder="Martín"
            value={this.props.lastName2.toShow}
            valid={this.props.lastName2.valid}
            edited={this.props.lastName2.edited}
            onChangeText={value => this.props.signupUpdate({ prop: 'lastName2', value, type: 'oneWord', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Nombres"
            placeholder="José Manuel"
            value={this.props.names.toShow}
            valid={this.props.names.valid}
            edited={this.props.names.edited}
            onChangeText={value => this.props.signupUpdate({ prop: 'names', value, type: 'firstCap', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Fecha de nacimiento"
            placeholder="09-09-1996"
            value={this.props.birthday.toShow}
            valid={this.props.birthday.valid}
            edited={this.props.birthday.edited}
            onChangeText={value => this.props.signupUpdate({ prop: 'birthday', value, type: 'date', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Sexo"
            placeholder="M o F"
            value={this.props.sex.toShow}
            valid={this.props.sex.valid}
            edited={this.props.sex.edited}
            onChangeText={value => this.props.signupUpdate({ prop: 'sex', value, type: 'sex', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Nacionalidad"
            placeholder="Mexicana"
            value={this.props.nationality.toShow}
            valid={this.props.nationality.valid}
            edited={this.props.nationality.edited}
            onChangeText={value => this.props.signupUpdate({ prop: 'nationality', value, type: 'oneWord', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Estado de nacimiento"
            placeholder="Jalisco"
            value={this.props.birthState.toShow}
            valid={this.props.birthState.valid}
            edited={this.props.birthState.edited}
            onChangeText={value => this.props.signupUpdate({ prop: 'birthState', value, type: 'oneWord', edited: true })}
          />
        </CardSection>
        </View>
        );
      }
    }
  profesional() {
    if (this.state.key === 'profesional') {
      return (
        <View>
          <CardSection>
            <Input
              label="Cédula profesional"
              placeholder="12345678"
              value={this.props.cedule.toShow}
              valid={this.props.cedule.valid}
              edited={this.props.cedule.edited}
              onChangeText={value => this.props.signupUpdate({ prop: 'cedule', value, type: 'cedule', edited: true })}
            />
          </CardSection>

          <CardSection>
          <Input
            label="Profesión"
            placeholder="Ing. Biomédico"
            value={this.props.prof.toShow}
            valid={this.props.prof.valid}
            edited={this.props.prof.edited}
            onChangeText={value => this.props.signupUpdate({ prop: 'prof', value, type: 'string', edited: true })}
          />
            </CardSection>

          <CardSection>
          <Input
            label="Especialidad"
            placeholder="Mtría. en materiales"
            value={this.props.master}
            onChangeText={value => this.props.signupUpdate({ prop: 'master', value, type: 'default' })}
          />
          </CardSection>
        </View>
        );
      }
    }
  domicilio() {
    if (this.state.key === 'domicilio') {
      return (
        <View>
        <CardSection>
        <Input
          label="Código postal"
          placeholder="47600"
          value={this.props.CP}
          onChangeText={value => this.props.signupUpdate({ prop: 'CP', value, type: 'numbers', limit: 8 })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Calle"
          placeholder="Av. Colosio"
          value={this.props.street}
          onChangeText={value => this.props.signupUpdate({ prop: 'street', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="N. Exterior"
          placeholder="863"
          value={this.props.extNum}
          onChangeText={value => this.props.signupUpdate({ prop: 'extNum', value, type: 'numbers', limit: 10 })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="N. Interior"
          placeholder=".1"
          value={this.props.extNum}
          onChangeText={value => this.props.signupUpdate({ prop: 'intNum', value, type: 'default' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Colonia"
          placeholder="Centro"
          value={this.props.colonia}
          onChangeText={value => this.props.signupUpdate({ prop: 'colonia', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Localidad"
          placeholder="Tepatitlán"
          value={this.props.locality}
          onChangeText={value => this.props.signupUpdate({ prop: 'locality', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Municipio"
          placeholder="Tepatitlán"
          value={this.props.city}
          onChangeText={value => this.props.signupUpdate({ prop: 'city', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Estado"
          placeholder="Jalisco"
          value={this.props.state}
          onChangeText={value => this.props.signupUpdate({ prop: 'state', value, type: 'oneWord' })}
        />
        </CardSection>
        </View>
        );
      }
    }
  contacto() {
    if (this.state.key === 'contacto') {
      return (
        <View>
          <CardSection>
          <Input
            label="Teléfono"
            placeholder="378-121-9925"
            value={this.props.phone.toShow}
            valid={this.props.phone.valid}
            edited={this.props.phone.edited}
            onChangeText={value => this.props.signupUpdate({ prop: 'phone', value, type: 'phone', edited: true })}
          />
          </CardSection>

          <CardSection>
          <Input
            label="Email"
            placeholder="emanuel@healtech.com.mx"
            value={this.props.email}
            onChangeText={value => this.props.signupUpdate({ prop: 'email', value })}
          />
          </CardSection>
        </View>
        );
      }
    }
  emergencia() {
    if (this.state.key === 'emergencia') {
      return (
        <View>
        <CardSection>
        <Input
          label="Grupo sanguíneo"
          placeholder="O+"
          value={this.props.bloodType}
          onChangeText={value => this.props.signupUpdate({ prop: 'bloodType', value })}
        />
        </CardSection>

        <CardSection>
        <Text>Contacto de emergencia</Text>
        </CardSection>

        <CardSection>
        <Input
          label="Apellidos"
          placeholder="Martín Alcalá"
          value={this.props.emergencyLastName}
          onChangeText={value => this.props.signupUpdate({ prop: 'emergencyLastName', value })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Nombres"
          placeholder="Héctor Emanuel"
          value={this.props.emergencyFirstName}
          onChangeText={value => this.props.signupUpdate({ prop: 'emergencyFirstName', value })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Parentezco"
          placeholder="Padre"
          value={this.props.emergencyPartner}
          onChangeText={value => this.props.signupUpdate({ prop: 'emergencyPartner', value })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Teléfono"
          placeholder="378-098-92323"
          value={this.props.emergencyPhone}
          onChangeText={value => this.props.signupUpdate({ prop: 'emergencyPhone', value })}
        />
        </CardSection>
        </View>
        );
      }
    }
  usuario() {
    if (this.state.key === 'usuario') {
      return (
        <View>
        <CardSection>
        <Input
          label="Usuario"
          placeholder="EmanuelMartin"
          value={this.props.username.toShow}
          valid={this.props.username.valid}
          edited={this.props.username.edited}
          onChangeText={value => this.props.signupUpdate({ prop: 'username', value, type: 'username', edited: true })}
        />
        </CardSection>

        <CardSection>
        <Input
          secureTextEntry
          label="Contraseña"
          placeholder="contraseña"
          value={this.props.password.toShow}
          valid={this.props.password.valid}
          edited={this.props.password.edited}
          onChangeText={value => this.props.signupUpdate({ prop: 'password', value, type: 'password', edited: true })}
        />
        </CardSection>

        <CardSection>
        <Input
          secureTextEntry
          label="Confirmar contraseña"
          placeholder="contraseña"
          value={this.props.password2}
          onChangeText={value => this.props.signupUpdate({ prop: 'password2', value })}
        />
        </CardSection>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onUserCreatePress.bind(this)}>
        Crear usuario
      </Button>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, paddingBottom: 20 }}>
    <ScrollView>

      <Card>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ key: 'personal' })}
        >
          <View>
       <CardSection>
          <Text style={styles.pickerTextStyle}>Datos personales</Text>
        </CardSection>
      </View>
      </TouchableWithoutFeedback>
        {this.personal()}
      </Card>

     <Card>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ key: 'profesional' })}
        >
          <View>
        <CardSection>
          <Text style={styles.pickerTextStyle}>Datos profesionales</Text>
        </CardSection>
      </View>
        </TouchableWithoutFeedback>
        {this.profesional()}
      </Card>

      <Card>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ key: 'domicilio' })}
        >
          <View>
        <CardSection>
          <Text style={styles.pickerTextStyle}>Domicilio</Text>
        </CardSection>
      </View>
        </TouchableWithoutFeedback>
        {this.domicilio()}
      </Card>

      <Card>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ key: 'contacto' })}
        >
          <View>
        <CardSection>
          <Text style={styles.pickerTextStyle}>Contacto</Text>
        </CardSection>
      </View>
        </TouchableWithoutFeedback>
        {this.contacto()}
      </Card>

      <Card>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ key: 'emergencia' })}
        >
          <View>
        <CardSection>
          <Text style={styles.pickerTextStyle}>Información de emergencia</Text>
        </CardSection>
      </View>
        </TouchableWithoutFeedback>
        {this.emergencia()}
      </Card>

      <Card>
        <TouchableWithoutFeedback
          onPress={() => this.setState({ key: 'usuario' })}
        >
          <View>
        <CardSection>
          <Text style={styles.pickerTextStyle}>Información de inicio de sesión</Text>
        </CardSection>
      </View>
        </TouchableWithoutFeedback>
        {this.usuario()}
      </Card>
      </ScrollView>
      <CardSection>
        {this.renderButton()}
      </CardSection>
      </View>
      );
    }
  }

const styles = {
  pickerTextStyle: {
    fontSize: 18,
  }
};

const mapStateToProps = (state) => {
  const {
    loading,
    curp,
    lastName1,
    lastName2,
    names,
    birthday,
    birthState,
    cedule,
    phone,
    nationality,
    sex,
    prof,
    username,
    password
  } = state.signupForm;
  return {
    loading,
    curp,
    lastName1,
    lastName2,
    names,
    birthday,
    birthState,
    cedule,
    phone,
    nationality,
    sex,
    prof,
    username,
    password
  };
};

export default connect(mapStateToProps, { signupUpdate, userCreate })(SignupForm);
