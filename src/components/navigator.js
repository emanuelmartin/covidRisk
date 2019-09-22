import { Dimensions } from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';
// import screens
import LoginForm from './LoginForm';
import UserList from './Users/UserList';
import UserDetail from './Users/UserDetail';
import Home from './Home';
import PatientForm from './PatientForm';
import SignupForm from './SignupForm';
import SideMenu from '../SideMenu/SideMenu';
import InventoryList from './Inventory/InventoryList';
import InventoryDetail from './Inventory/InventoryDetail';
import CajaPrincipal from './Cajas/Principal.js';
import Cafe from './Cajas/Cafeteria.js';
import AddItemScreen from './AddItemScreen.js';
import PatientBill from './Cuentas/PatientBill';
import PatientList from './Patients/PatientList';
import PatientDetail from './Patients/PatientDetail';
import ListaOcupacion from './Ocupacion/ListaOcupacion';
import PatientSelect from './Ingresos/PatientSelect';
import RoomSelect from './Ingresos/RoomSelect';
import ListaMedicos from './Medicos/ListaMedicos';
import PacientesActivos from './Patients/PacientesActivos';
import DetalleActivos from './Patients/DetalleActivos';
import AdminQuirofano from './Quirofano/AdminQuirofano';
import VoiceNative from './dictar';
import BarCodeScanner from './BarCodeScanner';
import qrGen from './qrGenerator';

import {
  BloodBank,
  Lab,
  Rehabilitation,
  Tomography,
  XRay
} from './Servicios';
import PruebaImpresion from './PruebaImpresion';

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
    CajaPrincipal,
    PatientDetail,
    ListaOcupacion,
    PatientSelect,
    RoomSelect,
    ListaMedicos,
    BloodBank,
    Cafe,
    Lab,
    Rehabilitation,
    Tomography,
    XRay,
    PacientesActivos,
    AdminQuirofano,
    PruebaImpresion,
    DetalleActivos,
    VoiceNative,
    qrGen
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
