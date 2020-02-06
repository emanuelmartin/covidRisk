
import { Dimensions } from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

// import screens
import LoginForm from './LoginForm';
import UserList from './Users/UserList';
import UserDetail from './Users/UserDetail';
import Home from './Home';
import PatientForm from './PatientForm';
import SignupForm from './SignupForm';
import SideMenu from '../SideMenu/SideMenu';
import PatientBill from './Cuentas/PatientBill';
import PatientList from './Patients/PatientList';
import PatientDetail from './Patients/PatientDetail';
import ListaOcupacion from './Ocupacion/ListaOcupacion';
import PatientSelect from './Ingresos/PatientSelect';
import ListaMedicos from './Medicos/ListaMedicos';
import PacientesActivos from './Patients/PacientesActivos';
import DetalleActivos from './Patients/DetalleActivos';
import AdminQuirofano from './Quirofano/AdminQuirofano';
import VoiceNative from './dictar';
import BarCodeScanner from './BarCodeScanner';
import qrGen from './qrGenerator';
import ListaProveedores from './Proveedores/ListaProveedores';
import AgregarProveedor from './Proveedores/AgregarProveedor';
import Reimprimir from './Formatos/reimprimir';
import IngresarPedido from './Proveedores/IngresarPedido';
import Importar from './DB/importar';
import PedidosEnfemeria from './Servicios/PedidosEnfermeria';
import SolicitudesEstudios from './Servicios/SolicitudesEstudios';
import AdminImagen from './Servicios/AdminImagen';
import AdminLaboratorio from './Servicios/AdminLaboratorio';
import AdminRehabilitacion from './Servicios/AdminRehabilitacion';
import CargosAdmision from './Servicios/CargosAdmision';
import PruebaCalendario from './Agenda/PruebaCalendario';
import {
  AjustePrecios,
  DetallePrecio,
  NewService
} from './Administracion';

import {
  InventoryList,
  InventoryDetail
} from './Inventario';

import {
  AddItemScreen,
  AgregarProducto,
  ArmarPaquetes,
  SurtirPedido,
  MainFarmacia
} from './Farmacia';

import {
  CajaPrincipal,
  Cafe,
  Urgencias,
  Laboratorio,
  Rehabilitacion
} from './Servicios';

import {
  ExpedienteImpresion
} from './Expediente';

import PruebaImpresion from './PruebaImpresion';


import { useScreens } from 'react-native-screens';
useScreens();

const AppStack = createStackNavigator(
  {
    Home,
    SignUp: SignupForm,
    UserList,
    UserDetail,
    PatientForm,
    PatientList,
    PatientBill,
    InventoryList,
    InventoryDetail,
    AddItemScreen,
    PatientDetail,
    ListaOcupacion,
    SolicitudesEstudios,
    PatientSelect,
    ListaMedicos,
    Cafe,
    CajaPrincipal,
    Importar,
    Urgencias,
    Laboratorio,
    Rehabilitacion,
    PacientesActivos,
    AdminQuirofano,
    PruebaImpresion,
    DetalleActivos,
    VoiceNative,
    qrGen,
    ListaProveedores,
    AgregarProveedor,
    Reimprimir,
    IngresarPedido,
    AgregarProducto,
    ArmarPaquetes,
    SurtirPedido,
    MainFarmacia,
    PedidosEnfemeria,
    AdminImagen,
    AdminLaboratorio,
    AdminRehabilitacion,
    AjustePrecios,
    DetallePrecio,
    NewService,
    CargosAdmision,
    ExpedienteImpresion,
    PruebaCalendario
    },
  {
    defaultNavigationOptions: {
      headerTintColor: '#63C0B9',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const LoginStack = createStackNavigator(
  {
    Login: LoginForm,
    SignUp: SignupForm,
  },
  {
    defaultNavigationOptions: {
      headerTintColor: '#63C0B9',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const Drawer = createDrawerNavigator(
  {
    Home: AppStack,
    BarCodeScanner
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});

const AppSwitch = createSwitchNavigator({
  Login: LoginStack,
  Stack: Drawer
});

const Nav = createAppContainer(AppSwitch);

export default Nav;
