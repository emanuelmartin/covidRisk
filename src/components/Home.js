import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Card, CardSection, Header } from './common';
import { logOut } from '../actions';

class Home extends Component {

  static navigationOptions = {
    headerShown: false  //this will hide the header
  };

  onLogoutButtonPress() {
    this.props.logOut();
  }

  onAddPatientButtonPress() {
    this.props.navigation.navigate('Patient');
  }

  onHeartPress() {
    this.props.navigation.openDrawer();
  }

  // user.get('atributteName') si funciona
  render() {
  if (!this.props.loggedIn) {
    this.props.navigation.navigate('Login');
    return null;
  }
  return (
      <Card>
        <Header headerText={'Bienvenido ' + this.props.user.get('names')} />
        <Text style={{ textAlign: 'center' }}>El hospital ofrece los siguientes servicios</Text>

        <CardSection style={{ justifyContent: 'space-around' }}>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/agua.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Hidratación</Text>
          </View>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/ambulancia.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Emergencias</Text>
          </View>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/salaPartos.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Sala de Partos</Text>
          </View>
        </CardSection>

        <CardSection style={{ justifyContent: 'space-around' }}>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/corazon.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Cardiología</Text>
          </View>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/liquido.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Medicamentos</Text>
          </View>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/primerosAuxilios.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Primeros Auxilios</Text>
          </View>
        </CardSection>

        <CardSection style={{ justifyContent: 'space-around' }}>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/medicina.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Medicina</Text>
            <Text style={{ textAlign: 'center' }}>General</Text>
          </View>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/pildoras.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Recetas</Text>
            <Text style={{ textAlign: 'center' }}>Médicas</Text>
          </View>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/estetoscopio.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Agende su</Text>
            <Text style={{ textAlign: 'center' }}>consulta</Text>
          </View>
        </CardSection>

        <CardSection style={{ justifyContent: 'space-around' }}>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/resultados.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Historial</Text>
            <Text style={{ textAlign: 'center' }}>Médico</Text>
          </View>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/inyeccion.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Muestras de</Text>
            <Text style={{ textAlign: 'center' }}>Sangre</Text>
          </View>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/solucion.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Pruebas</Text>
            <Text style={{ textAlign: 'center' }}>Químicas</Text>
          </View>
        </CardSection>

        <CardSection style={{ justifyContent: 'space-around' }}>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/nutricion.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Cafetería</Text>
          </View>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/curacion.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Rehabilitación</Text>
          </View>
          <View>
            <TouchableHighlight onPress={this.onHeartPress.bind(this)}>
              <Image
                source={require('./img/icons/diente.png')}
                style={{ width: 100, height: 100 }}
              />
            </TouchableHighlight>
            <Text style={{ textAlign: 'center' }}>Ortopedia</Text>
          </View>
        </CardSection>

      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => {
 const { loading, loggedIn, user } = auth;
 return { loading, loggedIn, user };
};

export default connect(mapStateToProps, {
  logOut
})(Home);
