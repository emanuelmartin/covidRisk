import React from 'react';
import { View, Text } from 'react-native';

const ComponentePaciente = (props) => {

function seleccionarPaciente() {
  if (props.item.names === '') {
    return (
      <Text> {'Seleciona un paciente'} </Text>
    );
  } else if (props.item.names !== '' || props.item.names !== 'Anónimo') {
    return (
      <View>
        <View>
          <Text> {props.item.names} { props.item.lastName1} { props.item.lastName2}</Text>
        </View>
        <View>
          <Text> {props.item.birthday} </Text>
        </View>
      </View>
    );
  } if (props.item.names === 'Anónimo') {
    return (
      <Text> {'Anónimo'} </Text>
    );
  }
}

  return (
    <View>
    {seleccionarPaciente()}
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

export { ComponentePaciente };
