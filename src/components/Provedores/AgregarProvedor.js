import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { providerUpdate, providerCreate } from '../../actions';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Card, CardSection, Input, Button, Spinner } from '../common';

class AgregarProvedor extends Component {
  static navigationOptions = {
    title: 'Nuevo Provedor',
  };

  componentWillMount() {
    this.setState({ key: 'empresa' });
  }

  onProviderCreatePress() {
    this.props.providerCreate(this.props.ProviderForm);
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onProviderCreatePress.bind(this)}>
        Añadir provedor
      </Button>
    );
  }

  empresa() {
    if (this.state.key === 'empresa') {
      return (
      <View>
      <CardSection>
        <Input
          required
          label="Nombre"
          placeholder="Hospital Real San Lucas"
          value={this.props.nombre}
          onChangeText={value => this.props.providerUpdate({ prop: 'nombre', value, type: 'oneWord', edited: true })}
        />
      </CardSection>

        <CardSection>
          <Input
            label="Razón Social"
            placeholder="Hospital Real San Lucas SA de CV"
            value={this.props.razonSocial}
            onChangeText={value => this.props.providerUpdate({ prop: 'razonSocial', value, type: '', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="RFC"
            placeholder="HRS16"
            value={this.props.rfc}
            onChangeText={value => this.props.providerUpdate({ prop: 'rfc', value, type: 'oneWord', edited: true })}
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
          onChangeText={value => this.props.providerUpdate({ prop: 'CP', value, type: 'numbers', limit: 8 })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Calle"
          placeholder="Av. Colosio"
          value={this.props.street}
          onChangeText={value => this.props.providerUpdate({ prop: 'street', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="N. Exterior"
          placeholder="863"
          value={this.props.extNum}
          onChangeText={value => this.props.providerUpdate({ prop: 'extNum', value, type: 'numbers', limit: 10 })}
        />

        <Input
          label="N. Interior"
          placeholder=".1"
          value={this.props.extNum}
          onChangeText={value => this.props.providerUpdate({ prop: 'intNum', value, type: 'default' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Colonia"
          placeholder="Centro"
          value={this.props.colonia}
          onChangeText={value => this.props.providerUpdate({ prop: 'colonia', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Localidad"
          placeholder="Tepatitlán"
          value={this.props.locality}
          onChangeText={value => this.props.providerUpdate({ prop: 'locality', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Municipio"
          placeholder="Tepatitlán"
          value={this.props.city}
          onChangeText={value => this.props.providerUpdate({ prop: 'city', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Estado"
          placeholder="Jalisco"
          value={this.props.state}
          onChangeText={value => this.props.providerUpdate({ prop: 'state', value, type: 'oneWord' })}
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
            value={this.props.phone}
            valid={this.props.phone}
            edited={this.props.phone}
            onChangeText={value => this.props.providerUpdate({ prop: 'phone', value, type: 'phone', edited: true })}
          />
          </CardSection>

          <CardSection>
          <Input
            label="Email"
            placeholder="emanuel@healtech.com.mx"
            value={this.props.email}
            onChangeText={value => this.props.providerUpdate({ prop: 'email', value })}
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
          value={this.props.username}
          onChangeText={value => this.props.providerUpdate({ prop: 'username', value, type: 'username', edited: true })}
        />
        </CardSection>

        <CardSection>
        <Input
          secureTextEntry
          label="Contraseña"
          placeholder="contraseña"
          value={this.props.password}
          onChangeText={value => this.props.providerUpdate({ prop: 'password', value, type: 'password', edited: true })}
        />
        </CardSection>

        <CardSection>
        <Input
          secureTextEntry
          label="Confirmar contraseña"
          placeholder="contraseña"
          value={this.props.password2}
          onChangeText={value => this.props.providerUpdate({ prop: 'password2', value })}
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
          onPress={() => this.setState({ key: 'empresa' })}
        >
          <View>
       <CardSection>
          <Text style={styles.pickerTextStyle}>Datos de la empresa</Text>
        </CardSection>
      </View>
      </TouchableWithoutFeedback>
        {this.empresa()}
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
          onPress={() => this.setState({ key: 'pago' })}
        >
          <View>
        <CardSection>
          <Text style={styles.pickerTextStyle}>Información de pago</Text>
        </CardSection>
      </View>
        </TouchableWithoutFeedback>
        {this.contacto()}
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
  } = state.providerForm;
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

export default connect(mapStateToProps, { providerUpdate, providerCreate })(AgregarProvedor);
