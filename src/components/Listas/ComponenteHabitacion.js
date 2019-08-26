import React from 'react';
import { View, Text } from 'react-native';

const ComponenteHabitacion = (props) => {

function seleccionarHabitacion() {
  if (props.item.ID === '') {
    return (
      <Text> {'Seleciona una habitación'} </Text>
    );
  }
}

function mostrarHabitacion() {
  if (props.item.ID !== '') {
    return (
      <View>
        <Text> {props.item.ID} </Text>
        <Text> {props.item.tipoHabitacion} </Text>
      </View>
    );
  }
}

  return (
    <View>
    {seleccionarHabitacion()}
    {mostrarHabitacion()}
    </View>
  )
}

const styles = {
  containerStyle: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  }
};

export { ComponenteHabitacion };
