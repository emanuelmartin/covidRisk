import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FalseInput = ({
  label,
  value}) => {

  return (
    <View style={[styles.inputContainer]}>
      <Text style={{ fontWeight: 'bold' }}>{label}</Text>
      <Text style={styles.inputStyle}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    fontSize: 18,
    lineHeight: 50,
    flex: 1
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    marginTop: 10,
    height: 60,
    flex: 1
  }
});

export { FalseInput };
