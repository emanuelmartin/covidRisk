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
import Home from './Home';
import PatientForm from './PatientForm';
import SignupForm from './SignupForm';
import SideMenu from '../SideMenu/SideMenu';
import InventoryScreen from './InventoryScreen.js';
import InventoryList from './Inventory/InventoryList';
import InventoryDetail from './Inventory/InventoryDetail';
import UpdateItemScreen from './UpdateItemScreen.js';
import OutputItemScreen from './OutputItemScreen.js';
import AddItemScreen from './AddItemScreen.js';
import PatientList from './Patients/PatientList';
import PatientDetail from './Patients/PatientDetail';
import ListaOcupacion from './Ocupacion/ListaOcupacion';
//import DetalleIngreso from './Ingresos/DetalleIngreso';
//import IngresarPaciente from './Ingresos/IngresarPaciente';
import PatientSelect from './Ingresos/PatientSelect';
import RoomSelect from './Ingresos/RoomSelect';

const AppStack = createStackNavigator(
  {
    Home,
    SignUp: SignupForm,
    UserList,
    PatientForm,
    PatientList,
    InventoryScreen,
    InventoryList,
    InventoryDetail,
    AddItemScreen,
    UpdateItemScreen,
    OutputItemScreen,
    PatientDetail,
    ListaOcupacion,
    //DetalleIngreso,
    //IngresarPaciente,
    PatientSelect,
    RoomSelect
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
    Home: AppStack
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
