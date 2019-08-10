import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { patientUpdate, patientCreate } from '../actions';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Card, CardSection, Input, Button, Spinner } from './common';

class PatientForm extends Component {
  static navigationOptions = {
    title: 'Nuevo Paciente',
  };

  componentWillMount() {
    this.setState({ key: 'personal', asegurado: false });
  }

  onPatientCreatePress() {
    this.props.patientCreate(this.props.PatientForm);
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onPatientCreatePress.bind(this)}>
        Añadir paciente
      </Button>
    );
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
          onChangeText={value => this.props.patientUpdate({ prop: 'curp', value, type: 'curp', edited: true })}
        />
      </CardSection>

        <CardSection>
          <Input
            label="Apellido Paterno"
            placeholder="Casillas"
            value={this.props.lastName1.toShow}
            valid={this.props.lastName1.valid}
            edited={this.props.lastName1.edited}
            onChangeText={value => this.props.patientUpdate({ prop: 'lastName1', value, type: 'oneWord', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Apellido Materno"
            placeholder="Martín"
            value={this.props.lastName2.toShow}
            valid={this.props.lastName2.valid}
            edited={this.props.lastName2.edited}
            onChangeText={value => this.props.patientUpdate({ prop: 'lastName2', value, type: 'oneWord', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Nombres"
            placeholder="José Manuel"
            value={this.props.names.toShow}
            valid={this.props.names.valid}
            edited={this.props.names.edited}
            onChangeText={value => this.props.patientUpdate({ prop: 'names', value, type: 'firstCap', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Fecha de nacimiento"
            placeholder="09-09-1996"
            value={this.props.birthday.toShow}
            valid={this.props.birthday.valid}
            edited={this.props.birthday.edited}
            onChangeText={value => this.props.patientUpdate({ prop: 'birthday', value, type: 'date', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Sexo"
            placeholder="M o F"
            value={this.props.sex.toShow}
            valid={this.props.sex.valid}
            edited={this.props.sex.edited}
            onChangeText={value => this.props.patientUpdate({ prop: 'sex', value, type: 'sex', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Nacionalidad"
            placeholder="Mexicana"
            value={this.props.nationality.toShow}
            valid={this.props.nationality.valid}
            edited={this.props.nationality.edited}
            onChangeText={value => this.props.patientUpdate({ prop: 'nationality', value, type: 'oneWord', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Estado de nacimiento"
            placeholder="Jalisco"
            value={this.props.birthState.toShow}
            valid={this.props.birthState.valid}
            edited={this.props.birthState.edited}
            onChangeText={value => this.props.patientUpdate({ prop: 'birthState', value, type: 'oneWord', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            required
            label="Religión"
            placeholder="Religión"
            value={this.props.religion.toShow}
            valid={this.props.religion.valid}
            edited={this.props.religion.edited}
            onChangeText={value => this.props.patientUpdate({ prop: 'religion', value, type: 'oneWord', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            required
            label="Etnia indígena"
            placeholder="Taraumara"
            value={this.props.etnia.toShow}
            valid={this.props.etnia.valid}
            edited={this.props.etnia.edited}
            onChangeText={value => this.props.patientUpdate({ prop: 'etnia', value, type: 'oneWord', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            required
            label="Idioma principal"
            placeholder="Español"
            value={this.props.idioma.toShow}
            valid={this.props.idioma.valid}
            edited={this.props.idioma.edited}
            onChangeText={value => this.props.patientUpdate({ prop: 'idioma', value, type: 'oneWord', edited: true })}
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
          onChangeText={value => this.props.patientUpdate({ prop: 'CP', value, type: 'numbers', limit: 8 })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Calle"
          placeholder="Av. Colosio"
          value={this.props.street}
          onChangeText={value => this.props.patientUpdate({ prop: 'street', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="N. Exterior"
          placeholder="863"
          value={this.props.extNum}
          onChangeText={value => this.props.patientUpdate({ prop: 'extNum', value, type: 'numbers', limit: 10 })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="N. Interior"
          placeholder=".1"
          value={this.props.extNum}
          onChangeText={value => this.props.patientUpdate({ prop: 'intNum', value, type: 'default' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Colonia"
          placeholder="Centro"
          value={this.props.colonia}
          onChangeText={value => this.props.patientUpdate({ prop: 'colonia', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Localidad"
          placeholder="Tepatitlán"
          value={this.props.locality}
          onChangeText={value => this.props.patientUpdate({ prop: 'locality', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Municipio"
          placeholder="Tepatitlán"
          value={this.props.city}
          onChangeText={value => this.props.patientUpdate({ prop: 'city', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Estado"
          placeholder="Jalisco"
          value={this.props.state}
          onChangeText={value => this.props.patientUpdate({ prop: 'state', value, type: 'oneWord' })}
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
            onChangeText={value => this.props.patientUpdate({ prop: 'phone', value, type: 'phone', edited: true })}
          />
          </CardSection>

          <CardSection>
          <Input
            label="Email"
            placeholder="emanuel@healtech.com.mx"
            value={this.props.email}
            onChangeText={value => this.props.patientUpdate({ prop: 'email', value })}
          />
          </CardSection>
        </View>
        );
      }
    }

    seguro() {
      if (this.state.key === 'seguro') {
        return (
          <View>
          <CardSection>
          <CheckBox
            title='Paciente asegurado'
            checked={this.state.asegurado}
            onPress={() => this.setState({ asegurado: !this.state.asegurado })}
            />
            </CardSection>
            {this.datosSeguro()}
          </View>
          );
        }
      }

      datosSeguro() {
        if (this.state.asegurado) {
          return (
        <View>
        <CardSection>
        <Input
          label="Aseguradora"
          placeholder="GNP"
          value={this.props.aseguradora.toShow}
          valid={this.props.aseguradora.valid}
          edited={this.props.aseguradora.edited}
          onChangeText={value => this.props.patientUpdate({ prop: 'aseguradora', value, type: 'oneWord', edited: true })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Tipo de seguro"
          placeholder="Cobertura amplia"
          value={this.props.tipoSeguro.toShow}
          valid={this.props.tipoSeguro.valid}
          edited={this.props.tipoSeguro.edited}
          onChangeText={value => this.props.patientUpdate({ prop: 'tipoSeguro', value, type: '', edited: true })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Vigencia"
          placeholder="10/12/2024"
          value={this.props.vigenciaSeguro.toShow}
          valid={this.props.vigenciaSeguro.valid}
          edited={this.props.vigenciaSeguro.edited}
          onChangeText={value => this.props.patientUpdate({ prop: 'vigenciaSeguro', value, type: 'date', edited: true })}
          />
        </CardSection>
        </View>
      ); }
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
          onChangeText={value => this.props.patientUpdate({ prop: 'bloodType', value })}
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
          onChangeText={value => this.props.patientUpdate({ prop: 'emergencyLastName', value })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Nombres"
          placeholder="Héctor Emanuel"
          value={this.props.emergencyFirstName}
          onChangeText={value => this.props.patientUpdate({ prop: 'emergencyFirstName', value })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Parentezco"
          placeholder="Padre"
          value={this.props.emergencyPartner}
          onChangeText={value => this.props.patientUpdate({ prop: 'emergencyPartner', value })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Teléfono"
          placeholder="378-098-92323"
          value={this.props.emergencyPhone}
          onChangeText={value => this.props.patientUpdate({ prop: 'emergencyPhone', value })}
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
          onChangeText={value => this.props.patientUpdate({ prop: 'username', value, type: 'username', edited: true })}
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
          onChangeText={value => this.props.patientUpdate({ prop: 'password', value, type: 'password', edited: true })}
        />
        </CardSection>

        <CardSection>
        <Input
          secureTextEntry
          label="Confirmar contraseña"
          placeholder="contraseña"
          value={this.props.password2}
          onChangeText={value => this.props.patientUpdate({ prop: 'password2', value })}
        />
        </CardSection>
        </View>
      );
    }
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
          onPress={() => this.setState({ key: 'seguro' })}
        >
          <View>
       <CardSection>
          <Text style={styles.pickerTextStyle}>Aseguradora</Text>
        </CardSection>
      </View>
      </TouchableWithoutFeedback>
        {this.seguro()}
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
    password,
    religion,
    idioma,
    etnia,
    aseguradora,
    tipoSeguro,
    vigenciaSeguro
  } = state.patientForm;
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
    password,
    religion,
    idioma,
    etnia,
    aseguradora,
    tipoSeguro,
    vigenciaSeguro
  };
};

export default connect(mapStateToProps, { patientUpdate, patientCreate })(PatientForm);
