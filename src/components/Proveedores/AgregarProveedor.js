import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { providerUpdate, providerCreate } from '../../actions';
import { SearchBar, CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { Card, CardSection, Input, Button, Spinner } from '../common';

class AgregarProveedor extends Component {
  static navigationOptions = {
    title: 'Nuevo Proveedor',
  };

  componentWillMount() {
    this.setState({ key: 'tipo' });
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
        Añadir proveedor
      </Button>
    );
  }

  tipo() {
    if (this.state.key === 'tipo') {
      return (
      <View>
      <CardSection>
        <Dropdown
        containerStyle={{ flex: 1 }}
        data={[{
            value: 'Producto',
          }, {
            value: 'Servicio'
          }]}
        value={this.props.tipoProveedor.toShow}
        onChangeText={value => this.props.providerUpdate({ prop: 'tipoProveedor', value, type: '', edited: true })}
        placeholder={'Tipo de proveedor'}
        />
      </CardSection>

      <CardSection>
        <Input
          required
          label="Producto o servicio que provee"
          placeholder="Medicamento"
          value={this.props.tipoProducto.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'tipoProducto', value, type: '', edited: true })}
        />
      </CardSection>
        </View>
        );
      }
    }

    pago() {
      if (this.state.key === 'pago') {
        return (
          <View>
          <CardSection>
            <Dropdown
            containerStyle={{ flex: 1 }}
            data={[{
                value: 'Efectivo',
              }, {
                value: 'Cheque'
              }, {
                value: 'Transferencia'
              }]}
            value={this.props.tipoPago.toShow}
            onChangeText={value => this.props.providerUpdate({ prop: 'tipoPago', value, type: '', edited: true })}
            placeholder={'Tipo de pago'}
            />
          </CardSection>

          <CardSection>
            {this.infoTransferencia()}
            {this.infoCheque()}
          </CardSection>

          <CardSection>
            <Dropdown
            containerStyle={{ flex: 1 }}
            data={[{
                value: 'Contado',
              }, {
                value: '8 días'
              }, {
                value: '15 días'
              }, {
                value: '30 días'
              }]}
            value={this.props.condicionesPago.toShow}
            onChangeText={value => this.props.providerUpdate({ prop: 'condicionesPago', value, type: '', edited: true })}
            placeholder={'Condiciones de pago'}
            />
          </CardSection>


          </View>
          );
        }
      }

      infoCheque() {
        if (this.props.tipoPago.toShow === 'Cheque') {
        return (
        <View style={{ flex: 1 }}>
        <CardSection>
          <Input
            required
            label="Beneficiario en cheque"
            placeholder="Hospital Real San Lucas SA de CV"
            value={this.props.beneficiarioCheque.toShow}
            onChangeText={value => this.props.providerUpdate({ prop: 'beneficiarioCheque', value, type: '', edited: true })}
          />
        </CardSection>
        <CardSection>
          <Input
            required
            label="Numero de cuenta"
            placeholder=""
            value={this.props.numeroCuenta.toShow}
            onChangeText={value => this.props.providerUpdate({ prop: 'numeroCuenta', value, type: '', edited: true })}
          />
        </CardSection>
        </View>
      );
    }
      }

      infoTransferencia() {
        if (this.props.tipoPago.toShow === 'Transferencia') {
        return (
        <View style={{ flex: 1 }}>
        <CardSection>
          <Input
            required
            label="Nombre de titular"
            placeholder="Hospital Real San Lucas SA de CV"
            value={this.props.titularCuenta.toShow}
            onChangeText={value => this.props.providerUpdate({ prop: 'titularCuenta', value, type: '', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            required
            label="Número de cuenta"
            placeholder="Hospital Real San Lucas SA de CV"
            value={this.props.numeroCuenta.toShow}
            onChangeText={value => this.props.providerUpdate({ prop: 'numeroCuenta', value, type: '', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            required
            label="CLABE"
            placeholder="Hospital Real San Lucas SA de CV"
            value={this.props.clabeCuenta.toShow}
            onChangeText={value => this.props.providerUpdate({ prop: 'clabeCuenta', value, type: '', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            required
            label="Banco"
            placeholder="Hospital Real San Lucas SA de CV"
            value={this.props.bancoCuenta.toShow}
            onChangeText={value => this.props.providerUpdate({ prop: 'bancoCuenta', value, type: '', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            required
            label="Referencia"
            placeholder="Hospital Real San Lucas SA de CV"
            value={this.props.referenciaCuenta.toShow}
            onChangeText={value => this.props.providerUpdate({ prop: 'referenciaCuenta', value, type: '', edited: true })}
          />
        </CardSection>
        </View>
      );
    }
      }

      infoTransferenciaa() {
        if (this.props.tipoPago.toShow === '"Transferencia"') {
        return (
        <View style={{ flex: 1 }}>

        </View>
      );
    }
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
          value={this.props.nombre.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'nombre', value, type: '', edited: true })}
        />
      </CardSection>

        <CardSection>
          <Input
            label="Razón Social"
            placeholder="Hospital Real San Lucas SA de CV"
            value={this.props.razonSocial.toShow}
            onChangeText={value => this.props.providerUpdate({ prop: 'razonSocial', value, type: '', edited: true })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="RFC"
            placeholder="HRS16"
            value={this.props.rfc.toShow}
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
          value={this.props.CP.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'CP', value, type: 'numbers', limit: 8 })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Calle"
          placeholder="Av. Colosio"
          value={this.props.street.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'street', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="N. Exterior"
          placeholder="863"
          value={this.props.extNum.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'extNum', value, type: 'numbers', limit: 10 })}
        />

        <Input
          label="N. Interior"
          placeholder=".1"
          value={this.props.intNum.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'intNum', value, type: 'default' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Colonia"
          placeholder="Centro"
          value={this.props.colonia.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'colonia', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Localidad"
          placeholder="Tepatitlán"
          value={this.props.locality.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'locality', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Municipio"
          placeholder="Tepatitlán"
          value={this.props.city.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'city', value, type: 'firstCap' })}
        />
        </CardSection>

        <CardSection>
        <Input
          label="Estado"
          placeholder="Jalisco"
          value={this.props.estado.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'estado', value, type: 'oneWord' })}
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
          label="Nombre"
          placeholder="Juan Martín"
          value={this.props.nombreContacto.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'nombreContacto', value, type: '', edited: true })}
        />
        </CardSection>

          <CardSection>
          <Input
            label="Teléfono"
            placeholder="378-121-9925"
            value={this.props.phone.toShow}
            valid={this.props.phone}
            edited={this.props.phone}
            onChangeText={value => this.props.providerUpdate({ prop: 'phone', value, type: '', edited: true })}
          />
          </CardSection>

          <CardSection>
          <Input
            label="Email"
            placeholder="emanuel@healtech.com.mx"
            value={this.props.email.toShow}
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
          value={this.props.username.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'username', value, type: 'username', edited: true })}
        />
        </CardSection>

        <CardSection>
        <Input
          secureTextEntry
          label="Contraseña"
          placeholder="contraseña"
          value={this.props.password.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'password', value, type: 'password', edited: true })}
        />
        </CardSection>

        <CardSection>
        <Input
          secureTextEntry
          label="Confirmar contraseña"
          placeholder="contraseña"
          value={this.props.password2.toShow}
          onChangeText={value => this.props.providerUpdate({ prop: 'password2', value })}
        />
        </CardSection>
        </View>
      );
    }
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    return (
      <View style={{ flex: 1, paddingBottom: 20 }}>
    <ScrollView>

    <Card>
      <TouchableWithoutFeedback
        onPress={() => this.setState({ key: 'tipo' })}
      >
        <View>
     <CardSection>
        <Text style={styles.pickerTextStyle}>Tipo de proveedor</Text>
      </CardSection>
    </View>
    </TouchableWithoutFeedback>
      {this.tipo()}
    </Card>

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
          onPress={() => this.setState({ key: 'pago' })}
        >
          <View>
        <CardSection>
          <Text style={styles.pickerTextStyle}>Información de pago</Text>
        </CardSection>
      </View>
        </TouchableWithoutFeedback>
        {this.pago()}
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
    tipoProveedor,
    tipoProducto,
    nombre,
    razonSocial,
    rfc,
    CP,
    street,
    extNum,
    intNum,
    colonia,
    locality,
    city,
    estado,
    nombreContacto,
    email,
    phone,
    username,
    password,
    password2,
    tipoPago,
    condicionesPago,
    beneficiarioCheque,
    titularCuenta,
    numeroCuenta,
    bancoCuenta,
    clabeCuenta,
    referenciaCuenta
  } = state.providerForm;
  return {
    tipoProveedor,
    tipoProducto,
    nombre,
    razonSocial,
    rfc,
    CP,
    street,
    extNum,
    intNum,
    colonia,
    locality,
    city,
    estado,
    nombreContacto,
    email,
    phone,
    username,
    password,
    password2,
    tipoPago,
    condicionesPago,
    beneficiarioCheque,
    titularCuenta,
    numeroCuenta,
    bancoCuenta,
    clabeCuenta,
    referenciaCuenta
  };
};

export default connect(mapStateToProps, { providerUpdate, providerCreate })(AgregarProveedor);
