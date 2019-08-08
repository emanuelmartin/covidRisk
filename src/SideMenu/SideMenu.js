import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './SideMenu.style';
import { session, logOut } from '../actions';

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

fichasPersonales() {
  if (this.props.userType === 'admin' ||
      this.props.userType === 'recepcion' ||
      this.props.userType === 'recursosHumanos' ||
      this.props.userType === 'enfermeria' ||
      this.props.userType === 'medico') {
    return (
      <View>
        <Text style={styles.sectionHeadingStyle}>
          Fichas personales
        </Text>
        <View style={styles.navSectionStyle}>
        {this.detallePacientes()}
        {this.detalleUsuarios()}
        </View>
      </View>
    );
  }
}

detallePacientes() {
  if (this.props.userType === 'admin' ||
      this.props.userType === 'recepcion' ||
      this.props.userType === 'enfermeria' ||
      this.props.userType === 'medico') {
      return (
        <View >
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PatientList')}>
          Pacientes
          </Text>
        </View>
      );
    }
  }

detalleUsuarios() {
  if (this.props.userType === 'admin' ||
      this.props.userType === 'recursosHumanos') {
    return (
  <View>
    <Text style={styles.navItemStyle} onPress={this.navigateToScreen('UserList')}>
    Usuarios
    </Text>
  </View>
); }
}

ocupacion() {
  if (this.props.userType === 'admin' ||
      this.props.userType === 'recepcion' ||
      this.props.userType === 'enfermeria' ||
      this.props.userType === 'medico'
        ) {
    return (
    <View>
      <Text style={styles.sectionHeadingStyle}>
        Ocupación
      </Text>
      <View style={styles.navSectionStyle}>
      {this.ocupacionActual()}
      {this.ingresarPaciente()}
      {this.altaPaciente()}
      </View>
    </View>
  ); }
}

ocupacionActual() {
  if (this.props.userType === 'admin' ||
      this.props.userType === 'recepcion' ||
      this.props.userType === 'enfermeria' ||
      this.props.userType === 'medico'
        ) {
     return (
       <View>
       <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ListaOcupacion')}>
         Estado actual
       </Text>
       </View>
     );
  }
}

ingresarPaciente() {
  if (this.props.userType === 'admin' ||
      this.props.userType === 'recepcion' ||
      this.props.userType === 'medico') {
    return (
      <View>
      <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PatientSelect')}>
        Ingresar paciente
      </Text>
      </View>
    );
  }
}

altaPaciente() {
  if (this.props.userType === 'admin' ||
      this.props.userType === 'medico') {
    return (
      <View>
      <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page3')}>
        Dar de alta
      </Text>
      </View>
    );
  }
}

farmacia() {
  if (this.props.userType === 'admin' ||
      this.props.userType === 'farmacia' ||
      this.props.userType === 'enfermeria') {
    return (
      <View>
           <Text style={styles.sectionHeadingStyle}>
             Farmacia
           </Text>
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('InventoryList')}>
             Inventario
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('OutputItemScreen')}>
             Ventas
             </Text>
           </View>
         </View>
    );
  }
}

cobros() {
  if (this.props.userType === 'admin' ||
      this.props.userType === 'farmacia' ||
      this.props.userType === 'cobranza') {
    return (
      <View>
           <Text style={styles.sectionHeadingStyle}>
             Control Financiero
           </Text>
           <View style={styles.navSectionStyle}>
            {this.cuentaPaciente()}
           </View>
         </View>
    );
  }
}

cuentaPaciente() {
  if (this.props.userType === 'admin' ||
      this.props.userType === 'farmacia' ||
      this.props.userType === 'cobranza') {
    return (
      <View>
      <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PatientBill')}>
      Cuenta de Paciente
      </Text>
      </View>
    );
  }
}

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        {this.fichasPersonales()}
        {this.ocupacion()}
        {this.farmacia()}
        {this.cobros()}
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

const mapStateToProps = ({ auth }) => {
 const { user } = auth;
 const userType = user.attributes.type;
 return { user, userType };
};

export default connect(mapStateToProps, { session, logOut })(SideMenu);
