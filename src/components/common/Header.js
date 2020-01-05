// Import libraries for making a component
import React from 'react';
import { Text, View, Image } from 'react-native';

// Make a component
const Header = (props) => {
  const { textStyle, viewStyle, logoStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
      <Image
      style={logoStyle}
      source={require('../img/LogoVerde.png')}
      />
      </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
    },
  textStyle: {
    fontSize: 20,
    color: '#63C0B9',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  logoStyle: {
    alignSelf: 'flex-end',
    width: 30,
    height: 30,
    paddingRight: 20,
    paddingBottom: 20
  }
};

// Make the component available to other parts of the app
export { Header };
