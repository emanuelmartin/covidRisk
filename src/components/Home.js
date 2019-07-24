import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { logOut } from '../actions';
import Parse from 'parse/react-native';


class Home extends Component {

  onLogoutButtonPress() {
    this.props.logOut();
  }

  onAddPatientButtonPress() {
    this.props.navigation.navigate('Patient');
  }
  // user.get('atributteName') si funciona
  render() {
  if (!this.props.loggedIn) {
    this.props.navigation.navigate('Login');
    return null;
  }
  return (
      <Card>
        <CardSection>
          <Text>Bienvenido, { this.props.user.get('names') }</Text>
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
