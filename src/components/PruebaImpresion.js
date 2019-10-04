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

  async printHTML() {
    const fecha = {dia: '9', mes: 'septiembre', ano: '2019'};
    const paciente = { apellidoPaterno: '     Martín     ', apellidoMaterno: '     Alcalá     ', nombres: 'Héctor Emanuel', edad: '23', sexo: 'Masculino' }
    await RNPrint.print({
      html: `<html><head><meta http-equiv=Content-Type content="text/html; charset=UTF-8"><style type="text/css"><!--span.cls_004{font-family:Arial,serif;font-size:16.0px;color:rgb(0,0,0);font-weight:bold;font-style:italic;text-decoration: none}div.cls_004{font-family:Arial,serif;font-size:16.0px;color:rgb(0,0,0);font-weight:bold;font-style:italic;text-decoration: none}span.cls_008{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}div.cls_008{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}span.cls_010{font-family:Arial,serif;font-size:16.0px;color:rgb(0,175,239);font-weight:normal;font-style:normal;text-decoration: none}div.cls_010{font-family:Arial,serif;font-size:16.0px;color:rgb(0,175,239);font-weight:normal;font-style:normal;text-decoration: none}span.cls_007{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}div.cls_007{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}span.cls_006{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}div.cls_006{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}span.cls_013{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: underline}div.cls_013{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}span.cls_009{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}div.cls_009{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}span.cls_012{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}div.cls_012{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}--></style><script type="text/javascript" src="203674ea-e583-11e9-9d71-0cc47a792c0a_id_203674ea-e583-11e9-9d71-0cc47a792c0a_files/wz_jsgraphics.js"></script></head><body><div style="position:absolute;left:50%;margin-left:-306px;top:0px;width:612px;height:792px;border-style:outset;overflow:hidden"><div style="position:absolute;left:0px;top:0px"><img src="203674ea-e583-11e9-9d71-0cc47a792c0a_id_203674ea-e583-11e9-9d71-0cc47a792c0a_files/background1.jpg" width=612 height=792></div><div style="position:absolute;left:138.50px;top:91.34px" class="cls_004"><span class="cls_004">CARTA DE CONSENTIMIENTO INFORMADO</span></div><div style="position:absolute;left:173.66px;top:136.34px" class="cls_008"><span class="cls_008">Hospitalización  </span><span class="cls_010">  O</span></div><div style="position:absolute;left:314.45px;top:136.34px" class="cls_008"><span class="cls_008">Procedimientos  </span><span class="cls_010">  O</span></div><div style="position:absolute;left:246.89px;top:184.10px" class="cls_007"><span class="cls_007">Tepatitlán de Morelos, Jalisco a ${fecha.dia} de ${fecha.mes} del ${fecha.ano} </span></div><div style="position:absolute;left:36.00px;top:220.46px" class="cls_006"><span class="cls_006">Yo: </span><span class="cls_007"> ${paciente.apellidoPaterno} </span></div><div style="position:absolute;left:140.94px;top:220.46px" class="cls_007"><span class="cls_007"> ${paciente.apellidoMaterno} </span></div><div style="position:absolute;left:243.77px;top:220.46px" class="cls_007"><span class="cls_007"> ${paciente.nombres} </span><span class="cls_006">de </span><span class="cls_007"> ${paciente.edad} </span><span class="cls_006">años de edad, de sexo </span><span class="cls_013"> ${paciente.sexo} </span></div><div style="position:absolute;left:62.78px;top:232.10px" class="cls_009"><span class="cls_009">Apellido Paterno</span></div><div style="position:absolute;left:156.93px;top:232.10px" class="cls_009"><span class="cls_009">Apellido Materno</span></div><div style="position:absolute;left:272.55px;top:230.18px" class="cls_009"><span class="cls_009">Nombre (s)</span></div><div style="position:absolute;left:36.00px;top:252.65px" class="cls_006"><span class="cls_006">Con domicilio en: </span><span class="cls_007">_______________________________________</span></div><div style="position:absolute;left:347.67px;top:252.65px" class="cls_007"><span class="cls_007">_______</span></div><div style="position:absolute;left:397.66px;top:252.65px" class="cls_007"><span class="cls_007">_______________________________</span></div><div style="position:absolute;left:209.57px;top:264.29px" class="cls_009"><span class="cls_009">Calle</span></div><div style="position:absolute;left:363.32px;top:264.29px" class="cls_009"><span class="cls_009">No.</span></div><div style="position:absolute;left:469.30px;top:264.29px" class="cls_009"><span class="cls_009">Colonia</span></div><div style="position:absolute;left:36.00px;top:282.77px" class="cls_009"><span class="cls_009">____________</span></div><div style="position:absolute;left:102.78px;top:282.77px" class="cls_009"><span class="cls_009">____________________________________</span></div><div style="position:absolute;left:274.08px;top:282.77px" class="cls_009"><span class="cls_009">_________________________</span></div><div style="position:absolute;left:398.47px;top:282.77px" class="cls_009"><span class="cls_009">_______________________________________</span></div><div style="position:absolute;left:53.88px;top:291.89px" class="cls_009"><span class="cls_009">C.P.</span></div><div style="position:absolute;left:158.23px;top:291.89px" class="cls_009"><span class="cls_009">Municipio.</span></div><div style="position:absolute;left:312.29px;top:291.89px" class="cls_009"><span class="cls_009">Estado</span></div><div style="position:absolute;left:468.31px;top:291.89px" class="cls_009"><span class="cls_009">Teléfono</span></div><div style="position:absolute;left:36.00px;top:300.89px" class="cls_006"><span class="cls_006">Paciente  </span><span class="cls_008">O</span><span class="cls_006">  Familiar Responsable </span><span class="cls_008">O</span><span class="cls_009">    de: ____________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:323.93px" class="cls_006"><span class="cls_006">Identificándome con</span><span class="cls_009">___________________________________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:335.45px" class="cls_006"><span class="cls_006">Declaro:</span></div><div style="position:absolute;left:36.00px;top:347.09px" class="cls_007"><span class="cls_007">Que el Dr. (a) _________________________________________________, me ha explicado que es conveniente me (le)</span></div><div style="position:absolute;left:36.00px;top:370.13px" class="cls_007"><span class="cls_007">realicen los procedimientos que a continuación se señalan: __________________________________________________</span></div><div style="position:absolute;left:36.00px;top:393.05px" class="cls_007"><span class="cls_007">Así mismo, me ha informado en lenguaje claro y sencillo, que todo acto médico, diagnóstico o terapéutico, sea o no</span></div><div style="position:absolute;left:36.00px;top:404.57px" class="cls_007"><span class="cls_007">quirúrgico, lleva implícito un riesgo de complicaciones menores o mayores e incluso de mortalidad, que pueden derivarse</span></div><div style="position:absolute;left:36.00px;top:416.09px" class="cls_007"><span class="cls_007">del estado previo del paciente y/o de efectos adversos impredecibles de los medicamentos que se administran, las cuales</span></div><div style="position:absolute;left:36.00px;top:427.63px" class="cls_007"><span class="cls_007">pueden requerir tratamientos complementarios que podrían prolongar la estancia hospitalaria, tales como:</span></div><div style="position:absolute;left:36.00px;top:450.67px" class="cls_007"><span class="cls_007">1.- ______________________________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:473.59px" class="cls_007"><span class="cls_007">2- _______________________________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:496.63px" class="cls_007"><span class="cls_007">3.- ______________________________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:519.67px" class="cls_007"><span class="cls_007">En particular manifiesto que me ha informado al respecto de los beneficios esperados y de los riesgos del procedimiento</span></div><div style="position:absolute;left:36.00px;top:531.07px" class="cls_007"><span class="cls_007">en cuestión, así como de los riesgos correlativos a mi (su) caso, de aceptar la hospitalización propuesta, por lo que,</span></div><div style="position:absolute;left:36.00px;top:542.59px" class="cls_007"><span class="cls_007">conocedor  del  contenido  y  alcance  legal  de  este  documento,  bajo  protesta  de  decir  verdad  de  que  he  sido</span></div><div style="position:absolute;left:36.00px;top:554.11px" class="cls_007"><span class="cls_007">satisfactoriamente informado, por lo que autorizo al personal de este hospital para que lleve a cabo el plan propuesto y/o</span></div><div style="position:absolute;left:36.00px;top:565.63px" class="cls_007"><span class="cls_007">la Hospitalización.</span></div><div style="position:absolute;left:36.00px;top:577.15px" class="cls_007"><span class="cls_007">De igual forma autorizo al personal de este hospital para que lleve a cabo los procedimientos médico-quirúrgicos, de</span></div><div style="position:absolute;left:36.00px;top:588.55px" class="cls_007"><span class="cls_007">diagnóstico o terapéuticos necesarios de acuerdo a mis (sus) condiciones de salud, así como la aplicación de las medidas</span></div><div style="position:absolute;left:36.00px;top:600.10px" class="cls_007"><span class="cls_007">que se requieran por alguna situación no sospechada de contingencias y urgencias derivadas del acto autorizado,</span></div><div style="position:absolute;left:36.00px;top:611.62px" class="cls_007"><span class="cls_007">atendiendo al principio de libertad prescriptiva.</span></div><div style="position:absolute;left:36.00px;top:623.14px" class="cls_007"><span class="cls_007">Atendiendo al principio de confidencialidad, designo a _____________________________________________________</span></div><div style="position:absolute;left:36.00px;top:634.66px" class="cls_007"><span class="cls_007">para que solo él (ella) reciba información sobre mi estado de salud, diagnóstico, tratamiento y/o pronóstico.</span></div><div style="position:absolute;left:36.00px;top:669.10px" class="cls_007"><span class="cls_007">_____________________________________</span></div><div style="position:absolute;left:319.25px;top:669.10px" class="cls_007"><span class="cls_007">______________________________________________</span></div><div style="position:absolute;left:58.32px;top:680.62px" class="cls_009"><span class="cls_009">NOMBRE, FIRMA Y CÉDULA DEL MEDICO</span></div><div style="position:absolute;left:328.05px;top:678.70px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL PACIENTE O REPRESENTANTE LEGAL</span></div><div style="position:absolute;left:36.00px;top:712.78px" class="cls_007"><span class="cls_007">_____________________________________</span></div><div style="position:absolute;left:319.25px;top:712.78px" class="cls_007"><span class="cls_007">______________________________________________</span></div><div style="position:absolute;left:67.22px;top:724.30px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL TESTIGO (1)</span></div><div style="position:absolute;left:377.40px;top:724.30px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL TESTIGO (2)</span></div></div><div style="position:absolute;left:50%;margin-left:-306px;top:802px;width:612px;height:792px;border-style:outset;overflow:hidden"><div style="position:absolute;left:0px;top:0px"><img src="203674ea-e583-11e9-9d71-0cc47a792c0a_id_203674ea-e583-11e9-9d71-0cc47a792c0a_files/background2.jpg" width=612 height=792></div><div style="position:absolute;left:81.26px;top:107.54px" class="cls_012"><span class="cls_012">CARTA DE RENUNCIA A SEGUIR RECIBIENDO ATENCION MÉDICA</span></div><div style="position:absolute;left:246.89px;top:156.50px" class="cls_007"><span class="cls_007">Tepatitlán de Morelos, Jalisco a _____de _______________del 20_____</span></div><div style="position:absolute;left:36.00px;top:204.38px" class="cls_006"><span class="cls_006">Yo:</span><span class="cls_007"> ______________</span></div><div style="position:absolute;left:140.94px;top:204.38px" class="cls_007"><span class="cls_007">_________________</span></div><div style="position:absolute;left:243.77px;top:204.38px" class="cls_007"><span class="cls_007">_________________ </span><span class="cls_006">de </span><span class="cls_007">______</span><span class="cls_006">años de edad, de sexo _____________</span></div><div style="position:absolute;left:62.78px;top:216.02px" class="cls_009"><span class="cls_009">Apellido Paterno</span></div><div style="position:absolute;left:156.93px;top:216.02px" class="cls_009"><span class="cls_009">Apellido Materno</span></div><div style="position:absolute;left:272.55px;top:214.10px" class="cls_009"><span class="cls_009">Nombre (s)</span></div><div style="position:absolute;left:36.00px;top:236.54px" class="cls_006"><span class="cls_006">Con domicilio en: </span><span class="cls_007">_______________________________________</span></div><div style="position:absolute;left:347.67px;top:236.54px" class="cls_007"><span class="cls_007">_______</span></div><div style="position:absolute;left:394.90px;top:236.54px" class="cls_007"><span class="cls_007">________________________________</span></div><div style="position:absolute;left:209.57px;top:248.21px" class="cls_009"><span class="cls_009">Calle</span></div><div style="position:absolute;left:361.16px;top:248.21px" class="cls_009"><span class="cls_009">No.</span></div><div style="position:absolute;left:460.23px;top:248.21px" class="cls_009"><span class="cls_009">Colonia</span></div><div style="position:absolute;left:36.00px;top:266.57px" class="cls_009"><span class="cls_009">____________</span></div><div style="position:absolute;left:102.78px;top:266.57px" class="cls_009"><span class="cls_009">____________________________________</span></div><div style="position:absolute;left:274.08px;top:266.57px" class="cls_009"><span class="cls_009">_________________________</span></div><div style="position:absolute;left:398.47px;top:266.57px" class="cls_009"><span class="cls_009">_______________________________________</span></div><div style="position:absolute;left:53.88px;top:275.81px" class="cls_009"><span class="cls_009">C.P.</span></div><div style="position:absolute;left:158.23px;top:275.81px" class="cls_009"><span class="cls_009">Municipio.</span></div><div style="position:absolute;left:312.11px;top:275.81px" class="cls_009"><span class="cls_009">Estado</span></div><div style="position:absolute;left:459.55px;top:275.81px" class="cls_009"><span class="cls_009">Teléfono</span></div><div style="position:absolute;left:36.00px;top:312.53px" class="cls_006"><span class="cls_006">En mi carácter de</span><span class="cls_007">: _________________________    </span><span class="cls_006">Identificándome con: </span><span class="cls_007">___________________________________</span></div><div style="position:absolute;left:129.38px;top:322.13px" class="cls_009"><span class="cls_009">Paciente o Familiar responsable de:</span></div><div style="position:absolute;left:36.00px;top:344.69px" class="cls_006"><span class="cls_006">Declaro:</span></div><div style="position:absolute;left:36.00px;top:367.85px" class="cls_007"><span class="cls_007">Que es mi libre decisión renunciar a seguir recibiendo la atención médica de que he sido objeto en esta institución</span></div><div style="position:absolute;left:36.00px;top:379.25px" class="cls_007"><span class="cls_007">hospitalaria, a pesar de la información que he recibido por parte del Dr:</span></div><div style="position:absolute;left:36.00px;top:402.29px" class="cls_007"><span class="cls_007">_________________________________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:413.81px" class="cls_007"><span class="cls_007">Sobre su importancia para mi salud y los riesgos de dicha renuncia. Así mismo libero de toda responsabilidad sobre esta</span></div><div style="position:absolute;left:36.00px;top:425.23px" class="cls_007"><span class="cls_007">decisión al </span><span class="cls_006">Hospital Real San Lucas.</span></div><div style="position:absolute;left:36.00px;top:505.87px" class="cls_007"><span class="cls_007">____________________________________</span></div><div style="position:absolute;left:319.25px;top:505.87px" class="cls_007"><span class="cls_007">______________________________________________</span></div><div style="position:absolute;left:58.32px;top:517.27px" class="cls_009"><span class="cls_009">NOMBRE, FIRMA Y CÉDULA DEL MEDICO</span></div><div style="position:absolute;left:328.05px;top:515.35px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL PACIENTE O REPRESENTANTE LEGAL</span></div><div style="position:absolute;left:36.00px;top:595.54px" class="cls_007"><span class="cls_007">____________________________________</span></div><div style="position:absolute;left:319.25px;top:595.54px" class="cls_007"><span class="cls_007">______________________________________________</span></div><div style="position:absolute;left:65.06px;top:607.06px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL TESTIGO (1)</span></div><div style="position:absolute;left:375.10px;top:607.06px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL TESTIGO (2)</span></div></div></body></html>`
    });
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
    const fecha = {dia: '9', mes: 'septiembre', ano: '2019'};
    const paciente = { apellidoPaterno: '     Martín     ', apellidoMaterno: '     Alcalá     ', nombres: 'Héctor Emanuel', edad: '23', sexo: 'Masculino' }
    const props = { paciente, fecha };
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && this.customOptions()}
        <Button onPress={() => this.props.printHTMLReducer(props, 'consentimiento')} title="Print HTML" />
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
