import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Home from './Home';

const AppStack = createStackNavigator({ Login: LoginForm, SignUp: SignupForm, Home: Home });

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
