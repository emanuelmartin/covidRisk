import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View, TouchableWithoutFeedback, Alert, Platform } from 'react-native';
import { signupUpdate, userCreate } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Dropdown } from 'react-native-material-dropdown';
import { CheckBox } from 'react-native-elements';

const INITIAL_STATE = {
  curp: '',
  lastName1: '',
  lastName2: '',
  names: '',
  birthday: '',
  sex: '',
  nationality: '',
  birthState: '',
  cedule: '',
  prof: '',
  master: '',
  cp: '',
  street: '',
  extNum: '',
  intNum: '',
  colonia: '',
  locality: '',
  city: '',
  state: '',
  phone: '',
  email: '',
  bloodType: '',
  emergencyPhone: '',
  emergencyPartner: '',
  emergencyLastName: '',
  emergencyFirstName: '',
  username: '',
  password: '',
  password2: '',
  key: 'personal',
  passwordMatch: true,
  passwordCheck: true,
  tipoRegistro: 'Empleado',
  cargo: '',
  submaster: '',
  estadoCivil: '',
  religion: '',
  etnia: '',
  idioma: '',
  asegurado: false,
  aseguradora: '',
  tipoSeguro: '',
  vigenciaSeguro: ''
}

class SignupForm extends Component {
  static navigationOptions = {
    title: 'Nuevo Usuario',
  };

  constructor(props) {
    super(props);

   this.state = INITIAL_STATE;
  }

  onUserCreatePress() {
    this.props.userCreate(this.state)
    .then(() => {
      Alert.alert(
        'Listo',
        'Usuario creado correctamente',
        [
          { text: 'Ok' },
        ],
      );
      this.setState(INITIAL_STATE);
    })
    .catch((error) => {
      Alert.alert(
        'Error',
        `Error al crear el usuario,  ${error.message}`,
        [
          { text: 'Ok' },
        ],
      );
    })
  }

  checkPassword(value) {
    this.setState({ password: value })
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value)) {
      this.setState({ passwordCheck: true })
    } else {
      this.setState({ passwordCheck: false })
    }
  }

  checkPasswordMatch(value) {
    this.setState({ password2: value, passwordMatch: false })
    if (this.state.password === value) {
      this.setState({ passwordMatch: true });
    }
  }

  coinciden() {
    if (!this.state.passwordCheck) {
      return (
          <Text> La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número </Text>
      );
    }
    if (!this.state.passwordMatch) {
      return (
        <Text> Las contraseñas no coinciden </Text>
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
        value={this.state.aseguradora}
        onChangeText={value => this.setState({ aseguradora: value })}
      />
      </CardSection>

      <CardSection>
      <Input
        label="Tipo de seguro"
        placeholder="Cobertura amplia"
        value={this.state.tipoSeguro}
        onChangeText={value => this.setState({ tipoSeguro: value })}
        />
      </CardSection>

      <CardSection>
      <Input
        label="Vigencia"
        placeholder="10/12/2024"
        value={this.state.vigenciaSeguro}
        onChangeText={value => this.setState({ vigenciaSeguro: value })}
        />
      </CardSection>
      </View>
    );
    }
  }

  infoSeguro() {
    if (this.state.tipoRegistro === 'Paciente') {
      return (
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
      );
    }
  }

  personal() {
    if (this.state.key === 'personal') {
      return (
      <View>
      <CardSection>
        <Input
          required
          autoCapitalize={'characters'}
          label="CURP"
          placeholder="MAAH960909HJCRLC04"
          value={this.state.curp}
          onChangeText={value => this.setState({ curp: value })}
          />
      </CardSection>

        <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Apellido Paterno"
            placeholder="Casillas"
            value={this.state.lastName1}
            onChangeText={value => this.setState({ lastName1: value })}
          />
          <Input
            autoCapitalize={'characters'}
            label="Apellido Materno"
            placeholder="Martín"
            value={this.state.lastName2}
            onChangeText={value => this.setState({ lastName2: value })}
            />
        </CardSection>

        <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Nombres"
            placeholder="José Manuel"
            value={this.state.names}
            onChangeText={value => this.setState({ names: value })}
          />
        </CardSection>

        <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Fecha de nacimiento"
            placeholder="09-09-1996"
            value={this.state.birthday}
            keyboardType="numeric"
            onChangeText={value => this.setState({ birthday: value })}
          />
        </CardSection>

        <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Sexo"
            placeholder="M o F"
            value={this.state.sex}
            onChangeText={value => this.setState({ sex: value })}
          />
        </CardSection>

        <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Nacionalidad"
            placeholder="Mexicana"
            value={this.state.nationality}
            onChangeText={value => this.setState({ nationality: value })}
            />
          <Input
            autoCapitalize={'characters'}
            label="Estado de nacimiento"
            placeholder="Jalisco"
            value={this.state.birthState}
            onChangeText={value => this.setState({ birthState: value })}
            />
        </CardSection>
        {this.personallEspecial()}
        </View>
        );
      }
    }
    personallEspecial() {
      if (this.state.tipoRegistro === 'Empleado') {
        return (
          <View>
          <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Estado civil"
            placeholder="Soltero"
            value={this.state.estadoCivil}
            onChangeText={value => this.setState({ estadoCivil: value })}
          />
            </CardSection>
          </View>
        );
      }
        if (this.state.tipoRegistro === 'Paciente') {
          return (
            <View>
        <CardSection>
          <Input
            required
            label="Religión"
            placeholder="Religión"
            value={this.state.religion}
            onChangeText={value => this.setState({ religion: value })}
          />
        </CardSection>

        <CardSection>
          <Input
            required
            label="Etnia indígena"
            placeholder="Taraumara"
            value={this.state.etnia}
            onChangeText={value => this.setState({ etnia: value })}
          />
        </CardSection>

        <CardSection>
          <Input
            required
            label="Idioma principal"
            placeholder="Español"
            value={this.state.idioma}
            onChangeText={value => this.setState({ idioma: value })}
          />
        </CardSection>
        </View>
      );
      }
    }


  infoProfesional() {
    if(this.state.tipoRegistro === 'Empleado' || this.state.tipoRegistro === 'Médico')
    return(
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
   );
  }

  profesional() {
    if (this.state.key === 'profesional') {
      return (
        <View>
          <CardSection>
            <Input
              autoCapitalize={'characters'}
              keyboardType={'numeric'}
              label="Cédula profesional"
              placeholder="12345678"
              value={this.state.cedule}
              onChangeText={value => this.setState({ cedule: value })}
            />
          </CardSection>
          {this.profesionalEspecial()}
        </View>
        );
      }
    }
    profesionalEspecial() {
      if (this.state.tipoRegistro === 'Empleado') {
        return (
          <View>
          <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Cargo"
            placeholder="Recepcionista"
            value={this.state.cargo}
            onChangeText={value => this.setState({ cargo: value })}
          />
            </CardSection>

          <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Profesión"
            placeholder="Ing. Biomédico"
            value={this.state.prof}
            onChangeText={value => this.setState({ prof: value })}
          />
            </CardSection>

          <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Maestría"
            placeholder="Mtría. en diseño de hardware"
            value={this.state.master}
            onChangeText={value => this.setState({ master: value })}
          />
          </CardSection>
          </View>
        );
      }
      if (this.state.tipoRegistro === 'Médico') {
        return (
          <View>
          <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Especialidad"
            placeholder="Ginecologia"
            value={this.state.master}
            onChangeText={value => this.setState({ master: value })}
          />
          </CardSection>
          <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Subespecialidad"
            placeholder="Tococirugía"
            value={this.state.submaster}
            onChangeText={value => this.setState({ submaster: value })}
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
          autoCapitalize={'characters'}
          label="Código postal"
          placeholder="47600"
          value={this.state.cp}
          keyboardType="numeric"
          onChangeText={value => this.setState({ cp: value })}
        />
        </CardSection>

        <CardSection>
        <Input
          autoCapitalize={'characters'}
          label="Calle"
          placeholder="Av. Colosio"
          value={this.state.street}
          onChangeText={value => this.setState({ street: value })}
        />
        </CardSection>

        <CardSection>
        <Input
          autoCapitalize={'characters'}
          label="N. Exterior"
          placeholder="863"
          value={this.state.extNum}
          onChangeText={value => this.setState({ extNum: value })}
        />

        <Input
          autoCapitalize={'characters'}
          label="N. Interior"
          placeholder=".1"
          value={this.state.intNum}
          onChangeText={value => this.setState({ intNum: value })}
        />
        </CardSection>

        <CardSection>
        <Input
          autoCapitalize={'characters'}
          label="Colonia"
          placeholder="Centro"
          value={this.state.colonia}
          onChangeText={value => this.setState({ colonia: value })}
        />

        <Input
          autoCapitalize={'characters'}
          label="Localidad"
          placeholder="Tepatitlán"
          value={this.state.locality}
          onChangeText={value => this.setState({ locality: value })}
        />
        </CardSection>

        <CardSection>
        <Input
          autoCapitalize={'characters'}
          label="Municipio"
          placeholder="Tepatitlán"
          value={this.state.city}
          onChangeText={value => this.setState({ city: value })}
        />

        <Input
          autoCapitalize={'characters'}
          label="Estado"
          placeholder="Jalisco"
          value={this.state.state}
          onChangeText={value => this.setState({ state: value })}
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
            autoCapitalize={'characters'}
            label="Teléfono"
            placeholder="3781219925"
            value={this.state.phone}
            keyboardType="numeric"
            onChangeText={value => this.setState({ phone: value })}
          />
          </CardSection>

          <CardSection>
          <Input
            autoCapitalize={'characters'}
            label="Email"
            placeholder="emanuel@healtech.com.mx"
            value={this.state.email}
            keyboardType="email-address"
            onChangeText={value => this.setState({ email: value })}
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
          autoCapitalize={'characters'}
          label="Grupo sanguíneo"
          placeholder="O+"
          value={this.state.bloodType}
          onChangeText={value => this.setState({ bloodType: value })}
          />
        </CardSection>

        <CardSection>
        <Text>Contacto de emergencia</Text>
        </CardSection>

        <CardSection>
        <Input
          autoCapitalize={'characters'}
          label="Apellidos"
          placeholder="Martín Alcalá"
          value={this.state.emergencyLastName}
          onChangeText={value => this.setState({ emergencyLastName: value })}
        />
        </CardSection>

        <CardSection>
        <Input
          autoCapitalize={'characters'}
          label="Nombres"
          placeholder="Héctor Emanuel"
          value={this.state.emergencyFirstName}
          onChangeText={value => this.setState({ emergencyFirstName: value })}
        />
        </CardSection>

        <CardSection>
        <Input
          autoCapitalize={'characters'}
          label="Parentezco"
          placeholder="Padre"
          value={this.state.emergencyPartner}
          onChangeText={value => this.setState({ emergencyPartner: value })}
        />
        </CardSection>

        <CardSection>
        <Input
          autoCapitalize={'characters'}
          label="Teléfono"
          placeholder="37809892323"
          value={this.state.emergencyPhone}
          keyboardType="numeric"
          onChangeText={value => this.setState({ emergencyPhone: value })}
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
        autoCapitalize={'none'}
          label="Usuario"
          placeholder="EmanuelMartin"
          value={this.state.username}
          onChangeText={value => this.setState({ username: value })}
        />
        </CardSection>

        <CardSection>
        <Input
          secureTextEntry
          label="Contraseña"
          placeholder="contraseña"
          value={this.state.password}
          onChangeText={value => this.checkPassword(value)}
        />
        </CardSection>

        <CardSection>
        <Input
          secureTextEntry
          label="Confirmar contraseña"
          placeholder="contraseña"
          value={this.state.password2}
          onChangeText={value => this.checkPasswordMatch(value)}
        />
        </CardSection>

        <CardSection>
        {this.coinciden()}
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
      <Button onPress={() => this.onUserCreatePress()}>
        Crear usuario
      </Button>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, paddingBottom: 20 }}>
    <ScrollView>
    <CardSection>
    <Dropdown
    containerStyle={{ flex: 1, padding: 5 }}
    data={[{
        value: 'Empleado',
      }, {
        value: 'Paciente'
      }, {
        value: 'Médico'
      }]}
    value={this.state.tipoRegistro}
    onChangeText={value => this.setState({ tipoRegistro: value })}
    placeholder={'Selecciona el tipo de registro'}
    />
    </CardSection>

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

     {this.infoProfesional()}

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
        {this.infoSeguro()}
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

      <CardSection>
        {this.renderButton()}
      </CardSection>

      </ScrollView>
      </View>
      );
    }
  }

const styles = {
  pickerTextStyle: {
    fontSize: 26,
    fontWeight: 'bold'
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
