import React from 'react';
import { View, Text } from 'react-native';

const ComponenteConsultorio = (props) => {

  function paciente(item) {
    if (item.Ocupada) {
      return (
      <Text> {props.item.OcupadaPor.names } {props.item.OcupadaPor.lastName1 } {props.item.OcupadaPor.lastName2 } </Text>
    );
}
  }

function seleccionarHabitacion() {
  if (props.item.ID === '') {
    return (
      <Text> {'Seleciona un consultorio'} </Text>
    );
  }
      return (
        <View>
          <Text> {props.item.Tipo} {props.item.ID} </Text>
          {paciente(props.item)}
          </View>
      );
}

  return (
    <View>
    {seleccionarHabitacion()}
    </View>
  );
};

export { ComponenteConsultorio };
