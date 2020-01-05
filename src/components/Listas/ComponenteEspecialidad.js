import React from 'react';
import { View, Text } from 'react-native';

const ComponenteEspecialidad = (props) => {

function seleccionarEspecialidad() {
  if (props.item.name === '') {
    return (
      <Text> {'Seleciona una especialidad'} </Text>
    );
  }
}

function mostrarEspecialidad() {
  if (props.item.name !== '') {
    return (
      <Text> {props.item.name} </Text>
    );
  }
}

  return (
    <View>
    {seleccionarEspecialidad()}
    {mostrarEspecialidad()}
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

export { ComponenteEspecialidad };
