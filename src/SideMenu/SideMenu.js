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
            {this.detalleMedicos()}
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
          Empleados
          </Text>
        </View>
      );
    }
  }

  detalleMedicos() {
    if (this.props.userType === 'admin' ||
        this.props.userType === 'recursosHumanos' ||
            this.props.userType === 'recepcion') {
      return (
        <View>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ListaMedicos')}>
          Médicos
          </Text>
        </View>
      );
    }
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
            {this.pacientesActivos()}
            {this.ocupacionActual()}
            {this.ingresarPaciente()}
            {this.altaPaciente()}
          </View>
        </View>
      );
    }
  }

  pacientesActivos() {
    if (this.props.userType === 'admin') {
      return (
        <View>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PacientesActivos')}>
            Pacientes activos
          </Text>
        </View>
      );
    }
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
           </View>
         </View>
      );
    }
  }

  ventas() {
    if (this.props.userType === 'admin') {
      return (
        <View>
           <Text style={styles.sectionHeadingStyle}>
             Ventas
           </Text>
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('CajaPrincipal')}>
             Caja Principal
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Cafe')}>
             Cafetería
             </Text>
           </View>
         </View>
      );
    }
  }

  servicios() {
    if (this.props.userType === 'admin') {
      return (
        <View>
           <Text style={styles.sectionHeadingStyle}>
             Servicios
           </Text>
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Lab')}>
               Laboratorio
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('XRay')}>
               Rayos X
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Tomography')}>
               Tomografía
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('BloodBank')}>
               Banco de Sangre
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Rehabilitation')}>
               Rehabilitación
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('AdminQuirofano')}>
               Quirófanos
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

  pruebas() {
    if (this.props.userType === 'admin') {
      return (
        <View>
           <Text style={styles.sectionHeadingStyle}>
             Desarrollo
           </Text>
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PruebaImpresion')}>
               Prueba de impresión
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('VoiceNative')}>
               Prueba de dictado
             </Text>
           </View>
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
          {this.ventas()}
          {this.servicios()}
          {this.cobros()}
          {this.pruebas()}
        </ScrollView>
        <View style={styles.footerContainer}>
          <Text
            onPress={this.onLogoutButtonPress.bind(this)}
            style={{ fontSize: 17, alignSelf: 'center', fontWeight: 'bold', color: 'white' }}
          >
            Cerrar sesión
          </Text>
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
