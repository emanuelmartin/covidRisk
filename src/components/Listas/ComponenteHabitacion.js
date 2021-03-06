import React from 'react';
import { View, Text } from 'react-native';

const ComponenteHabitacion = (props) => {

  function setStyle(estado) {
    if (estado) {
      return ({
      padding: 10,
      backgroundColor: '#F55E64'
      });
    }
    return ({
      padding: 10,
      backgroundColor: '#53E69D'
    });
  }

  function paciente(item) {
    if (item.ocupadaPor) {
      return (
      <Text> {props.item.ocupadaPor.names } {props.item.ocupadaPor.lastName1 } {props.item.OcupadaPor.lastName2 } </Text>
    );
}
  }

function seleccionarHabitacion() {
  switch (props.tipo) {
    case 'ocupacion':
      return (
        <View style={setStyle(props.item.ocupadaPor)}>
          <Text> {props.item.Tipo} {props.item.ID} </Text>
          {paciente(props.item)}
          </View>
      );
      case 'ingreso':
        if (props.item.ID === '') {
          return (
            <Text> {'Seleciona una habitación'} </Text>
          );
        } else if (props.item.ID !== '') {
          return (
            <View style={setStyle(props.item.ocupadaPor)}>
              <Text> {props.item.ID} </Text>
              <Text> {props.item.tipoHabitacion} </Text>
              <Text> {'$' }{props.item.costoHabitacion} </Text>
            </View>
          );
      }
      break;
    default: {
      const a = 1;
    }
  }
}

  return (
    <View>
    {seleccionarHabitacion()}
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
