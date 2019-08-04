import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './SideMenu.style';
import { logOut } from '../actions';

class SideMenu extends Component {
  onLogoutButtonPress() {
    this.props.logOut();
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Fichas personales
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PatientList')}>
              Pacientes
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('UserList')}>
              Usuarios
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Ocupación
            </Text>
            <View style={styles.navSectionStyle}>
            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ListaOcupacion')}>
              Estado actual
            </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PatientSelect')}>
                Ingresar paciente
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page3')}>
                Dar de alta
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Inventarios
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('InventoryList')}>
              Consulta
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('OutputItemScreen')}>
              Venta producto
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('UpdateItemScreen')}>
              Entrada producto
              </Text>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text onPress={this.onLogoutButtonPress.bind(this)}>Cerrar sesión</Text>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default connect(null, { logOut })(SideMenu);
