import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

const DropInput = ({
  label,
  data,
  value,
  onChangeText,
  placeholder
  }) => {
  return (
    <View style={[styles.inputContainer]}>
      <Text style={{ fontWeight: 'bold' }}>{label}</Text>
      <Dropdown
      containerStyle={{ flex: 1 }}
      data={data}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.4)',
    marginTop: 10,
    height: 82,
    flex: 1
  }
});

export { DropInput };
