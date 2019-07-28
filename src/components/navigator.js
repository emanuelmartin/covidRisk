import { Dimensions } from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator
} from 'react-navigation';
// import screens
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Home from './Home';
import PatientForm from './PatientForm';
import SideMenu from '../SideMenu/SideMenu';
import InventoryScreen from './InventoryScreen.js';
import UpdateItemScreen from './UpdateItemScreen.js';
import OutputItemScreen from './OutputItemScreen.js';
import AddItemScreen from './AddItemScreen.js';
import PatientList from './Patients/PatientList';

const AppStack = createStackNavigator(
  {
    Home,
    SignUp: SignupForm,
    PatientForm,
    PatientList,
    InventoryScreen,
    AddItemScreen,
    UpdateItemScreen,
    OutputItemScreen
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
