import React from 'react';
import { View } from 'react-native';

const Form = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    marginTop: 0,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between'
  }
};

export { Form };
