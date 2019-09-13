import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card, CardSection } from '../common';

export default class DetalleActivo extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
    title: navigation.getParam('item').names
    };
  };

  renderItem(item) {
    console.log(item);
  }

  render() {
    const { navigation } = this.props;
    let data = navigation.getParam('item');
    console.log(data);
    const { tipo, paciente, tipoMedico, medico, habitacion, estadoActual } = data

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
  }
}
