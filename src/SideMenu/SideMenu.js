import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './SideMenu.style';
import { session, logOut } from '../actions';
import WifiManager from "react-native-wifi-reborn";
import {PermissionsAndroid} from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Permiso de ubicación',
        message:
          'Necesitamos acceder a la ubicación ',
        buttonNeutral: 'Preguntarme después',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}


class SideMenu extends Component {
  constructor(props) {
    super(props);
    // setting default state
    this.state = {
      ssid: ''
    };
    this.arrayholder = [];
  }


  onLogoutButtonPress() {
    this.props.logOut().then(
      this.setState({ logout: 'logout' })
    );
  }

  componentWillMount() {
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        this.setState({ ssid: ssid })
        console.log("Your current connected wifi SSID is " + ssid);
      },
      () => {
        console.log("Cannot get current SSID!");
      }
    );
    console.log(this.props.userLevel)
  }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  fichasPersonales() {
    if (this.props.userType === 'admin') {
      return (
        <View>
          <Text style={styles.sectionHeadingStyle}>
            Fichas personales
          </Text>
          <View style={styles.navSectionStyle}>
            {this.detalleProveedores()}
            {this.detallePacientes()}
            {this.detalleMedicos()}
          </View>
        </View>
      );
    }
    if (this.props.userType === 'farmacia') {
      return (
      <View>
        <Text style={styles.sectionHeadingStyle}>
          Fichas personales
        </Text>
        <View style={styles.navSectionStyle}>
          {this.detalleProveedores()}
          </View>
          </View>
        );
    }
    if (this.props.userType === 'recursosHumanos') {
      return (
      <View>
        <Text style={styles.sectionHeadingStyle}>
          Fichas personales
        </Text>
        <View style={styles.navSectionStyle}>
          {this.detalleEmpleados()}
          </View>
          </View>
        );
    }
    if (this.props.userType === 'recepcion' ||
    this.props.userType === 'admision' ||
    this.props.userType === 'caja'||
    this.props.userType === 'enfermeria' ||
    this.props.userType === 'medico') {
      return (
      <View>
        <Text style={styles.sectionHeadingStyle}>
          Fichas personales
        </Text>
        <View style={styles.navSectionStyle}>
          {this.detallePacientes()}
          </View>
          </View>
        );
    }
  }

  detallePacientes() {
        return (
          <View >
            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PatientList')}>
            Pacientes
            </Text>
          </View>
        );
      }

  detalleMedicos() {
      return (
        <View>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ListaMedicos')}>
          Médicos
          </Text>
        </View>
      );
    }

  detalleProveedores() {
        return (
          <View >
            <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ListaProveedores')}>
            Proveedores
            </Text>
          </View>
        );
    }

  ocupacion() {
    if (this.props.userType === 'admin' ||
        this.props.userType === 'recepcion' ||
        this.props.userType === 'enfermeria' ||
        this.props.userType === 'medico' ||
        this.props.userType === 'admision'||
        this.props.userType === 'caja'
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
          </View>
        </View>
      );
    }
  }

  pacientesActivos() {
      return (
        <View>
          <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PacientesActivos')}>
            Pacientes activos
          </Text>
        </View>
      );
    }

  ocupacionActual() {
       return (
         <View>
           <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ListaOcupacion')}>
             Estado actual
           </Text>
         </View>
       );
}

  ingresarPaciente() {
    if (this.props.userType === 'admin' ||
        this.props.userType === 'recepcion' ||
        this.props.userType === 'admision' ||
        this.props.userType === 'caja') {
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
        this.props.userType === 'medico' ||
        this.props.userType === 'recepcion' ||
        this.props.userType === 'admision' ||
        this.props.userType === 'caja') {
      return (
        <View>
        <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page3')}>
          Dar de alta
        </Text>
        </View>
      );
    }
  }

  enfermeria() {
    if (this.props.userType === 'admin' ||
        this.props.userType === 'enfermeria'
        || this.props.userType === 'farmacia') {
      return (
        <View>
           <Text style={styles.sectionHeadingStyle}>
             Enfermería
           </Text>
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PedidosEnfemeria')}>
             Solicitud a farmacia
             </Text>
             <View>
               <Text style={styles.navItemStyle} onPress={this.navigateToScreen('SolicitudesEstudios')}>
               Solicitudes de estudios
               </Text>
               </View>
           </View>
         </View>
      );
    }
  }

  farmacia() {
    if (this.props.userType === 'admin' ||
        this.props.userType === 'farmacia') {
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
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('MainFarmacia')}>
             Farmacia
             </Text>
           </View>
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('IngresarPedido')}>
             Ingresar pedido
             </Text>
           </View>
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ArmarPaquetes')}>
             Armar paquetes
             </Text>
           </View>
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('SurtirPedido')}>
             Surtir pedido
             </Text>
           </View>
         </View>
      );
    }
  }

  cafeteria() {
    if (this.props.userType === 'admin' ||
        this.props.userType === 'cafeteria') {
      return (
        <View>
           <Text style={styles.sectionHeadingStyle}>
             Cafetería
           </Text>
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('InventoryList')}>
             Inventario
             </Text>
           </View>
           <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Cafe')}>
             Ventas
           </Text>
         </View>
      );
    }
  }

  servicios() {
    if (this.props.userType === 'admin' ||
        this.props.userType === 'caja' ||
        this.props.userType === 'farmacia' ||
            this.props.userType === 'admision' ||
                this.props.userType === 'recepcion') {
      return (
        <View>
           <Text style={styles.sectionHeadingStyle}>
             Solicitudes
           </Text>
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('CajaPrincipal')}>
               Productos y servicios
             </Text>

           </View>
         </View>
      );
    }
  }

  imagen() {
    if (this.props.userType === 'imagen' ||
        this.props.userType === 'recepcion' ||
            this.props.userType === 'admin' ||
                this.props.userType === 'dev') {
      return (
        <View>
        <Text style={styles.sectionHeadingStyle}>
          Servicios
        </Text>
    <Text style={styles.navItemStyle} onPress={this.navigateToScreen('AdminImagen')}>
      Imagen
    </Text>
    </View>
  );
  }
}

lab() {
  if (this.props.userType === 'laboratorio' ||
        this.props.userType === 'recepcion' ||
            this.props.userType === 'admin' ||
                this.props.userType === 'dev') {
    return (
      <View>
      <Text style={styles.sectionHeadingStyle}>
        Servicios
      </Text>
  <Text style={styles.navItemStyle} onPress={this.navigateToScreen('AdminLaboratorio')}>
    Laboratorio
  </Text>
  </View>
);
}
}

  cobros() {
    if (this.props.userType === 'admin' ||
        this.props.userType === 'farmacia' ||
        this.props.userType === 'caja' ||
        this.props.userType === 'recepcion' ||
        this.props.userType === 'admision') {
      return (
        <View>
           <Text style={styles.sectionHeadingStyle}>
             Control Financiero
           </Text>
           <View style={styles.navSectionStyle}>
             {this.cuentaPaciente()}
           </View>
           <View style={styles.navSectionStyle}>
             {this.cargosAdministrativos()}
           </View>
         </View>
      );
    }
  }

  cuentaPaciente() {
      return (
        <View>
        <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PatientBill')}>
          Cuenta de Paciente
        </Text>
        </View>
      );
  }

  cargosAdministrativos() {
      return (
        <View>
        <Text style={styles.navItemStyle} onPress={this.navigateToScreen('CargosAdmision')}>
          Cargos administrativos
        </Text>
        </View>
      );
  }

  pruebas() {
    if (this.props.userType === 'admin') {
      return (
        <View>
           <Text style={styles.sectionHeadingStyle}>
             Desarrollo
           </Text>
           <View style={styles.navSectionStyle}>
           <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Reimprimir')}>
            Reimpresión
           </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PruebaImpresion')}>
               Prueba de impresión
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('PruebaCalendario')}>
               Prueba de calendario
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('VoiceNative')}>
               Prueba de dictado
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('qrGen')}>
               Prueba generación de QR
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ingresarPedido')}>
               Prueba ingreso de pedido
             </Text>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Importar')}>
               Importar a DB
             </Text>
           </View>
         </View>
      );
    }
  }

  administracion() {
    if(this.props.userType === 'admin' || this.props.userType === 'dev') {
      return (
        <View>
           <Text style={styles.sectionHeadingStyle}>
             Administración
           </Text>
           <View style={styles.navSectionStyle}>
             <Text style={styles.navItemStyle} onPress={this.navigateToScreen('AjustePrecios')}>
              Ajuste Precios
             </Text>
           </View>
         </View>
      );
    }
  }

  expedienteClinico() {
    if (this.props.userType === 'admin' || this.props.userType === 'dev') {
      return (
        <View>
         <Text style={styles.sectionHeadingStyle}>
           Expediente Clínico
         </Text>
         <View style={styles.navSectionStyle}>
           <Text style={styles.navItemStyle} onPress={this.navigateToScreen('ExpedienteImpresion')}>
            Impresión de formatos
           </Text>
         </View>
       </View>
      );
    }
  }

  wifi() {
    const { ssid } = this.state;
    if(ssid === 'Ina_General' || this.props.userLevel === 'write') {
      return(
      <ScrollView>
        {this.administracion()}
        {this.fichasPersonales()}
        {this.expedienteClinico()}
        {this.ocupacion()}
        {this.imagen()}
        {this.lab()}
        {this.enfermeria()}
        {this.farmacia()}
        {this.cafeteria()}
        {this.servicios()}
        {this.cobros()}
        {this.pruebas()}
      </ScrollView>
    );
  } else {
    return(
      <View style={styles.container}>
      <Text style={{ fontSize: 17, alignSelf: 'center', fontWeight: 'bold', color: 'black', paddingLeft: 20, paddingRight: 20 }}>
      No tienes permisos para acceder al sistema
      </Text>
      </View>
    );
  }
  }

  render() {
    requestLocationPermission()
    return (
      <View style={styles.container}>
        {this.wifi()}
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
 const userType = user.attributes.userType;
 const userLevel = user.attributes.userLevel;
 return { user, userType, userLevel };
};

export default connect(mapStateToProps, { session, logOut })(SideMenu);
