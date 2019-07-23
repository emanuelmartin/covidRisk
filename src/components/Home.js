import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { logOut } from '../actions';

class Home extends Component {

  onLogoutButtonPress() {
    this.props.logOut();
  }

  onAddPatientButtonPress() {
    this.props.navigation.navigate('Patient');
  }

  render() {
    if (!this.props.loggedIn) {
    this.props.navigation.navigate('Login');
  }
    return (
      <Card>
        <CardSection>
          <Button onPress={this.onLogoutButtonPress.bind(this)}>
            Cerrar sesión
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onAddPatientButtonPress.bind(this)}>
            Añadir paciente
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => {
 const { loading, loggedIn } = auth;
 return { loading, loggedIn };
};

export default connect(mapStateToProps, {
  logOut
})(Home);
