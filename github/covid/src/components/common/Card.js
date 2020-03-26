import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3
  }
};

export { Card };
