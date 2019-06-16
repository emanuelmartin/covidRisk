//import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import AuthLoadingScreen from './AutoLoading';
import HomeScreen from './HomeScreen';

//const AppStack = createStackNavigator({ Home: HomeScreen, SignUp: SignUpForm });
//const AuthStack = createStackNavigator({ LogIn: LoginForm });

const Nav = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Login: LoginForm,
    SignUp: SignUpForm,
    Home: HomeScreen
    //App: AppStack,
    //Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default Nav;
