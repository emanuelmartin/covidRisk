import React from 'react';
import { View, Text } from 'react-native';

const ComponentePaciente = (props) => {

function seleccionarPaciente() {
  switch (props.tipo) {
    case 'activos': {
          console.log(props.item)

          const { paciente, medico, habitacion, tipo, tipoMedico, estadoActual } = props.item;

        switch (estadoActual) {
          case 'Urgencias': {
            return (
              <View>
              <View>
                <Text> {estadoActual} </Text>
              </View>
                <View>
                  <Text> {paciente.names} </Text>
                </View>
                <View>
                  <Text> {tipoMedico}: {medico.names} </Text>
                </View>
              </View>
            );
          } break;

          case 'Cirugía mayor': {
            return (
              <View>
              <View>
                <Text> {estadoActual} </Text>
              </View>
                <View>
                  <Text> {paciente.names} </Text>
                </View>
                <View>
                  <Text> {tipoMedico}: {medico.names} </Text>
                </View>
                <View>
                  <Text> {'Habitación'}: {habitacion.ID} </Text>
                </View>
              </View>
            );
          } break;

          case 'Cirugía ambulatoria': {
            return (
              <View>
              <View>
                <Text> {estadoActual} </Text>
              </View>
                <View>
                  <Text> {paciente.names} </Text>
                </View>
                <View>
                  <Text> {tipoMedico}: {medico.names} </Text>
                </View>
              </View>
            );
          } break;

          case 'Hospitalización': {
            return (
              <View>
              <View>
                <Text> {estadoActual} </Text>
              </View>
                <View>
                  <Text> {paciente.names} </Text>
                </View>
                <View>
                  <Text> {tipoMedico}: {medico.names} </Text>
                </View>
                <View>
                  <Text> {'Habitación'}: {habitacion.ID} </Text>
                </View>
              </View>
            );
          } break;

        }
      } break;
    default:
  }
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
