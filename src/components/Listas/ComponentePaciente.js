import React from 'react';
import { View, Text } from 'react-native';

const ComponentePaciente = (props) => {

function seleccionarPaciente() {
  const { paciente, medico, ubicacion, tipo, tipoMedico, estadoActual } = props.item;


  switch (props.tipo) {
    case 'activos': {
          console.log(props.item)

        switch (estadoActual) {
          case 'Urgencias': {
            return (
              <View>
              <View>
                <Text> {estadoActual} </Text>
              </View>
                <View>
                  <Text> {paciente.names} {paciente.lastName1}</Text>
                </View>
                <View>
                  <Text> {tipoMedico}: {medico.names} {medico.lastName1} </Text>
                </View>
                <View>
                  <Text> {ubicacion.tipo}: {ubicacion.ID} </Text>
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
                  <Text> {paciente.names}  {paciente.lastName1} {paciente.lastName2}</Text>
                </View>
                <View>
                  <Text> {tipoMedico}: {medico.names} {medico.lastName1} {paciente.lastName2}</Text>
                </View>
                <View>
                  <Text> {ubicacion.tipo}: {ubicacion.ID} </Text>
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
                  <Text> {paciente.names} {paciente.lastName1}{paciente.lastName2} </Text>
                </View>
                <View>
                  <Text> {tipoMedico}: {medico.names} {medico.lastName1} {medico.lastName2}</Text>
                </View>

              </View>
            );
          } break;

          case 'Shock': {
            return (
              <View>
              <View>
                <Text> {estadoActual} </Text>
              </View>
                <View>
                  <Text> {paciente.names} {paciente.lastName1} {paciente.lastName2}</Text>
                </View>
                <View>
                  <Text> {tipoMedico}: {medico.names} {medico.lastName1} {medico.lastName2}</Text>
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
                  <Text> {paciente.names} {paciente.lastName1} {paciente.lastName2}</Text>
                </View>
                <View>
                  <Text> {tipoMedico}: {medico.names} {medico.lastName1} {medico.lastName2}</Text>
                </View>
                <View>
                  <Text> {ubicacion.tipo}: {ubicacion.ID} </Text>
                </View>
              </View>
            );
          } break;
          case 'Consulta': {
            return (
              <View>
              <View>
                <Text> {estadoActual} </Text>
              </View>
                <View>
                  <Text> {paciente.names} {paciente.lastName1} {paciente.lastName2}</Text>
                </View>
                <View>
                  <Text> {tipoMedico}: {medico.names} {medico.lastName1} {medico.lastName2}</Text>
                </View>
                <View>
                  <Text> {ubicacion.tipo}: {ubicacion.ID} </Text>
                </View>
              </View>
            );
          } break;

        }
      } break;
      case 'busqueda': {
        return (
          <View>
            <View>
              <Text> {paciente.names} {paciente.lastName1}{paciente.lastName2} </Text>
            </View>
            <View>
              <Text> {paciente.birthday} </Text>
            </View>
          </View>
        );
      }
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
    {seleccionarPaciente(props)}
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
