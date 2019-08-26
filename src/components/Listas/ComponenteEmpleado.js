import React from 'react';
import { View, Text } from 'react-native';

const ComponenteEmpleado = (props) => {

function seleccionarMedico() {
  if (props.item.names === '') {
    return (
      <Text> {'Seleciona un empleado'} </Text>
    );
  }
}

function mostrarMedico() {
  if (props.item.names !== '') {
    return (
      <View>
        <View>
          <Text> {props.item.names} { props.item.lastName1} { props.item.lastName2} </Text>
        </View>
        <View>
          <Text> {props.item.position} </Text>
        </View>
      </View>
    );
  }
}

  return (
    <View>
    {seleccionarMedico()}
    {mostrarMedico()}
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

export { ComponenteEmpleado };
