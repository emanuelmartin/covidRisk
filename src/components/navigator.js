//import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import LoadingScreen from './LoadingScreen';
import HomeScreen from './HomeScreen';

const AppStack = createStackNavigator({ Login: LoginForm, SignUp: SignUpForm });
//const AuthStack = createStackNavigator({ LogIn: LoginForm });

const Nav = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: LoadingScreen,
    Home: HomeScreen,
    App: AppStack
    //Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default Nav;
