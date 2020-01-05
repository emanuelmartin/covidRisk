import React from 'react';
import { View, Text } from 'react-native';

const ComponenteMedico = (props) => {

function seleccionarMedico() {
  if (props.item.names === '') {
    return (
      <Text> {'Seleciona un médico'} </Text>
    );
  }
}

function mostrarMedico() {
  console.log('item', props.item)
  if (props.item.names !== '') {
    return (
      <View>
        <View>
          <Text> {props.item.names} { props.item.lastName1} { props.item.lastName2} </Text>
        </View>
        <View>
          <Text> {props.item.master} </Text>
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

export { ComponenteMedico };
