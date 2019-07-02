import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { logOut } from '../actions';

class Home extends Component {

  onLogoutButtonPress() {
    this.props.logOut();
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
