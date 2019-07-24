import { Dimensions } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
// import screens
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Home from './Home';
import PatientForm from './PatientForm';
import SideMenu from '../SideMenu/SideMenu';
import PharmacyScreen from './PharmacyScreen.js';
import InventoryScreen from './InventoryScreen.js';
import UpdateItemScreen from './UpdateItemScreen.js';
import OutputItemScreen from './OutputItemScreen.js';
import AddItemScreen from './AddItemScreen.js';

const Drawer = createDrawerNavigator({
 //Login: LoginForm,
 Home,
 SignUp: SignupForm,
 Patient: PatientForm,
 PharmacyScreen,
 InventoryScreen,
 AddItemScreen,
 UpdateItemScreen,
 OutputItemScreen
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});

const AppSwitch = createSwitchNavigator({
  Login: LoginForm,
  Home: Drawer
});
/*
const AppStack = createStackNavigator({
  Stack: Drawer
});
*/
const Nav = createAppContainer(AppSwitch);

export default Nav;
