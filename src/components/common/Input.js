import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, edited, valid }) => {
  const validationStyles = edited
    ? valid ? styles.valid : styles.invalid
    : null;

  return (
    <View style={[styles.inputContainer, validationStyles]}>
      <Text>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={styles.inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 1
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    marginTop: 10,
    height: 60,
    flex: 1
  },
  valid: {
    borderColor: '#53E69D'
  },
  invalid: {
    borderColor: '#F55E64'
  }
});


export { Input };
