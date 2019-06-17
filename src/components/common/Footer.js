// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Footer = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.footerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#62BFB9',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    paddingTop: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 15,
    color: '#fff'
  }
};

// Make the component available to other parts of the app
export { Footer };
