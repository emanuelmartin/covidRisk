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
      <Text> {item.ocupadaPor.names } {item.ocupadaPor.lastName1 } {item.ocupadaPor.lastName2 } </Text>
    );
}
  }

function seleccionarHabitacion() {
  switch (props.tipo) {
    case 'ocupacion':
      return (
        <View style={setStyle(props.item.ocupadaPor)}>
          <Text> {props.item.tipo} {props.item.ID} - {props.item.tipoHabitacion} </Text>
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
              <Text> {props.item.tipo} {props.item.ID} </Text>
              <Text> {props.item.tipoHabitacion} </Text>
              <Text> {'$' }{props.item.precio} </Text>
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
