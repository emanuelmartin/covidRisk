import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  StyleSheet,
  NativeModules,
  Platform,
  Text,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { printHTMLReducer } from '../actions';


import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';

class RNPrintExample extends Component {
  state = {
    selectedPrinter: null
  }

  // @NOTE iOS Only
  selectPrinter = async () => {
    const selectedPrinter = await RNPrint.selectPrinter()
    this.setState({ selectedPrinter })
  }

  // @NOTE iOS Only
  silentPrint = async () => {
    if (!this.state.selectedPrinter) {
      alert('Must Select Printer First')
    }

    const jobName = await RNPrint.print({
      printerURL: this.state.selectedPrinter.url,
      html: '<h1>Silent Print</h1>'
    })

  }

  async printPDF() {
    let options = {
     html: '<h1>PDF TEST</h1>',
     fileName: 'test',
     directory: 'Documents',
   };

   let file = await RNHTMLtoPDF.convert(options)
    console.log(file.filePath);

    await RNPrint.print({ filePath: file.filePath })
  }

  async printRemotePDF() {
    await RNPrint.print({ filePath: 'https://graduateland.com/api/v2/users/jesper/cv' })
  }

  customOptions = () => {
    return (
      <View>
        {this.state.selectedPrinter &&
          <View>
            <Text>{`Selected Printer Name: ${this.state.selectedPrinter.name}`}</Text>
            <Text>{`Selected Printer URI: ${this.state.selectedPrinter.url}`}</Text>
          </View>
        }
      <Button onPress={this.selectPrinter} title="Select Printer" />
      <Button onPress={this.silentPrint} title="Silent Print" />
    </View>

    )
  }

  render() {
    const fecha = {dia: '9', mes: 'septiembre', ano: '2019' };
    const paciente = { lastName1: 'Martín', lastName2: 'Alcalá', names: 'Héctor Emanuel', age: '23', sex: 'Masculino', street: 'Gonzalo Curiel', city: 'Tepatitlán de Morelos', numExt: '483', cp: '47650', birthState: 'Jalisco', colonia: 'El Pipón' }
    const medico = { names: 'Juan José', lastName1: 'Esquivias', lastName2: 'Gómez' };
    const domicilio = { street: 'Gonzalo Curiel', city: 'Tepatitlán de Morelos', numExt: '483', cp: '47650', birthState: 'Jalisco', colonia: 'El Pipón' }
    const type = 'consentimientoHospitalización';
    const props = { paciente, fecha, type, medico, domicilio };
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && this.customOptions()}
        <Button onPress={() => this.props.printHTMLReducer(props)} title="Print HTML" />
        <Button onPress={this.printPDF} title="Print PDF" />
        <Button onPress={this.printRemotePDF} title="Print Remote PDF" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


const mapStateToProps = () => {
const a = 'a'
 return { a };
};

export default connect(
  mapStateToProps,
  { printHTMLReducer })(RNPrintExample);
