import { AppRegistry, Dimensions } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Home from './Home';
import PatientForm from './PatientForm';
import SideMenu from '../SideMenu/SideMenu';

const Drawer = createDrawerNavigator({
 Login: LoginForm, SignUp: SignupForm, Home, Patient: PatientForm
  }, {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width - 120,
});

const AppStack = createStackNavigator({ Home: Drawer });


const Nav = createAppContainer(AppStack);
//const Nav = createAppContainer(createSwitchNavigator(
  //{
    //AuthLoading: LoadingScreen,
    //Home: HomeScreen,
    //App: AppStack
  //},
  /*{
    initialRouteName: 'Login',
  }*/
//));

export default Nav;
