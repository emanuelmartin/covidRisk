import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Home from './Home';
import PatientForm from './PatientForm';
import { createDrawerNavigator } from 'react-navigation';
import SideMenu from '../SideMenu/SideMenu'
import { AppRegistry, Dimensions } from 'react-native';

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
