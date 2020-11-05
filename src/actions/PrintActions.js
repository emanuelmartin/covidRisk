import React from 'react';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import { Alert, Platform } from 'react-native';

import {
  PRINT,
  PRINT_CLEAN
} from './types';

import {
  registroIngresoEgreso,
  hojaFrontal,
  notaMedica,
  notaEvolucionClinica,
  notaPreAnestesica,
  notaPreQuirurgica,
  notaPostQuirurgica,
  indicacionesMedicas,
  logoCompleto,
  logo
} from '../components/Formatos';

export const printHTMLReducer = (info, type, reimprimir) => {
  function imprimirFormato() {
    console.log('info1', info)
    return new Promise((resolve, reject, ) => {
      const { paciente, fecha, medico, habitacion, folio, caja, recibido, lista, ingreso, autor, retiro, descuento, tipoDescuento } = info;
      let listData = []
      if(type==='ticketVenta'){
       listData = lista.farmacia.concat(lista.imagen).concat(lista.laboratorio).concat(lista.rehabilitacion).concat(lista.otros);
      }
      const edad = '23';
      let html = '';

      let table = '';
      let subtotal = 0;
      let impuestos = 0;


      switch (type) {
        case ('Consentimiento de hospitalización'):
          RNPrint.print({
            html: `<html><head><meta http-equiv=Content-Type content="text/html; charset=UTF-8"><style type="text/css"><!--span.cls_004{font-family:Arial,serif;font-size:16.0px;color:rgb(0,0,0);font-weight:bold;font-style:italic;text-decoration: none}div.cls_004{font-family:Arial,serif;font-size:16.0px;color:rgb(0,0,0);font-weight:bold;font-style:italic;text-decoration: none}span.cls_008{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}div.cls_008{font-family:Arial,serif;font-size:12.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}span.cls_010{font-family:Arial,serif;font-size:16.0px;color:rgb(0,175,239);font-weight:normal;font-style:normal;text-decoration: none}div.cls_010{font-family:Arial,serif;font-size:16.0px;color:rgb(0,175,239);font-weight:normal;font-style:normal;text-decoration: none}span.cls_007{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}div.cls_007{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}span.cls_006{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}div.cls_006{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}span.cls_013{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: underline}div.cls_013{font-family:Arial,serif;font-size:10.0px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}span.cls_009{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}div.cls_009{font-family:Arial,serif;font-size:8.1px;color:rgb(0,0,0);font-weight:normal;font-style:normal;text-decoration: none}span.cls_012{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}div.cls_012{font-family:Arial,serif;font-size:14.1px;color:rgb(0,0,0);font-weight:bold;font-style:normal;text-decoration: none}--></style><script type="text/javascript" src="203674ea-e583-11e9-9d71-0cc47a792c0a_id_203674ea-e583-11e9-9d71-0cc47a792c0a_files/wz_jsgraphics.js"></script></head><body><div style="position:absolute;left:50%;margin-left:-306px;top:0px;width:612px;height:792px;border-style:outset;overflow:hidden"><div style="position:absolute;left:0px;top:0px"><img src="203674ea-e583-11e9-9d71-0cc47a792c0a_id_203674ea-e583-11e9-9d71-0cc47a792c0a_files/background1.jpg" width=612 height=792></div><div style="position:absolute;left:138.50px;top:91.34px" class="cls_004"><span class="cls_004">CARTA DE CONSENTIMIENTO INFORMADO</span></div><div style="position:absolute;left:173.66px;top:136.34px" class="cls_008"><span class="cls_008">Hospitalización  </span><span class="cls_010">  O</span></div><div style="position:absolute;left:314.45px;top:136.34px" class="cls_008"><span class="cls_008">Procedimientos  </span><span class="cls_010">  O</span></div><div style="position:absolute;left:246.89px;top:184.10px" class="cls_007"><span class="cls_007">Tepatitlán de Morelos, Jalisco a ${fecha.dia} de ${fecha.mes} del ${fecha.ano} </span></div><div style="position:absolute;left:36.00px;top:220.46px" class="cls_006"><span class="cls_006">Yo: ${paciente.lastName1} ${paciente.lastName2} ${paciente.names} de ${edad} años de edad, de sexo ${paciente.sex} </div><div style="position:absolute;left:62.78px;top:232.10px" class="cls_009"></div><div style="position:absolute;left:36.00px;top:252.65px" class="cls_006"><span class="cls_006">Con domicilio en: </span><span class="cls_007"> ${paciente.street}</span></div><div style="position:absolute;left:347.67px;top:252.65px" class="cls_007"><span class="cls_007"> ${paciente.numExt} </span></div><div style="position:absolute;left:397.66px;top:252.65px" class="cls_007"><span class="cls_007"> ${paciente.colonia} </span></div><div style="position:absolute;left:209.57px;top:264.29px" class="cls_009"><span class="cls_009">Calle</span></div><div style="position:absolute;left:363.32px;top:264.29px" class="cls_009"><span class="cls_009">No.</span></div><div style="position:absolute;left:469.30px;top:264.29px" class="cls_009"><span class="cls_009">Colonia</span></div><div style="position:absolute;left:36.00px;top:282.77px" class="cls_009"><span class="cls_009"> ${paciente.cp} </span></div><div style="position:absolute;left:102.78px;top:282.77px" class="cls_009"><span class="cls_009"> ${paciente.city} </span></div><div style="position:absolute;left:274.08px;top:282.77px" class="cls_009"><span class="cls_009"> ${paciente.birthState} </span></div><div style="position:absolute;left:398.47px;top:282.77px" class="cls_009"><span class="cls_009"> ${paciente.phone} </span></div><div style="position:absolute;left:53.88px;top:291.89px" class="cls_009"><span class="cls_009">C.P.</span></div><div style="position:absolute;left:158.23px;top:291.89px" class="cls_009"><span class="cls_009">Municipio.</span></div><div style="position:absolute;left:312.29px;top:291.89px" class="cls_009"><span class="cls_009">Estado</span></div><div style="position:absolute;left:468.31px;top:291.89px" class="cls_009"><span class="cls_009">Teléfono</span></div><div style="position:absolute;left:36.00px;top:300.89px" class="cls_006"><span class="cls_006">Paciente  </span><span class="cls_008">O</span><span class="cls_006">  Familiar Responsable </span><span class="cls_008">O</span><span class="cls_009">    de: ____________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:323.93px" class="cls_006"><span class="cls_006">Identificándome con</span><span class="cls_009">___________________________________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:335.45px" class="cls_006"><span class="cls_006">Declaro:</span></div><div style="position:absolute;left:36.00px;top:347.09px" class="cls_007"><span class="cls_007">Que el Dr. (a) ${medico.names} ${medico.lastName1} ${medico.lastName2}, me ha explicado que es conveniente me (le)</span></div><div style="position:absolute;left:36.00px;top:370.13px" class="cls_007"><span class="cls_007">realicen los procedimientos que a continuación se señalan: __________________________________________________</span></div><div style="position:absolute;left:36.00px;top:393.05px" class="cls_007"><span class="cls_007">Así mismo, me ha informado en lenguaje claro y sencillo, que todo acto médico, diagnóstico o terapéutico, sea o no</span></div><div style="position:absolute;left:36.00px;top:404.57px" class="cls_007"><span class="cls_007">quirúrgico, lleva implícito un riesgo de complicaciones menores o mayores e incluso de mortalidad, que pueden derivarse</span></div><div style="position:absolute;left:36.00px;top:416.09px" class="cls_007"><span class="cls_007">del estado previo del paciente y/o de efectos adversos impredecibles de los medicamentos que se administran, las cuales</span></div><div style="position:absolute;left:36.00px;top:427.63px" class="cls_007"><span class="cls_007">pueden requerir tratamientos complementarios que podrían prolongar la estancia hospitalaria, tales como:</span></div><div style="position:absolute;left:36.00px;top:450.67px" class="cls_007"><span class="cls_007">1.- ______________________________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:473.59px" class="cls_007"><span class="cls_007">2- _______________________________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:496.63px" class="cls_007"><span class="cls_007">3.- ______________________________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:519.67px" class="cls_007"><span class="cls_007">En particular manifiesto que me ha informado al respecto de los beneficios esperados y de los riesgos del procedimiento</span></div><div style="position:absolute;left:36.00px;top:531.07px" class="cls_007"><span class="cls_007">en cuestión, así como de los riesgos correlativos a mi (su) caso, de aceptar la hospitalización propuesta, por lo que,</span></div><div style="position:absolute;left:36.00px;top:542.59px" class="cls_007"><span class="cls_007">conocedor  del  contenido  y  alcance  legal  de  este  documento,  bajo  protesta  de  decir  verdad  de  que  he  sido</span></div><div style="position:absolute;left:36.00px;top:554.11px" class="cls_007"><span class="cls_007">satisfactoriamente informado, por lo que autorizo al personal de este hospital para que lleve a cabo el plan propuesto y/o</span></div><div style="position:absolute;left:36.00px;top:565.63px" class="cls_007"><span class="cls_007">la Hospitalización.</span></div><div style="position:absolute;left:36.00px;top:577.15px" class="cls_007"><span class="cls_007">De igual forma autorizo al personal de este hospital para que lleve a cabo los procedimientos médico-quirúrgicos, de</span></div><div style="position:absolute;left:36.00px;top:588.55px" class="cls_007"><span class="cls_007">diagnóstico o terapéuticos necesarios de acuerdo a mis (sus) condiciones de salud, así como la aplicación de las medidas</span></div><div style="position:absolute;left:36.00px;top:600.10px" class="cls_007"><span class="cls_007">que se requieran por alguna situación no sospechada de contingencias y urgencias derivadas del acto autorizado,</span></div><div style="position:absolute;left:36.00px;top:611.62px" class="cls_007"><span class="cls_007">atendiendo al principio de libertad prescriptiva.</span></div><div style="position:absolute;left:36.00px;top:623.14px" class="cls_007"><span class="cls_007">Atendiendo al principio de confidencialidad, designo a _____________________________________________________</span></div><div style="position:absolute;left:36.00px;top:634.66px" class="cls_007"><span class="cls_007">para que solo él (ella) reciba información sobre mi estado de salud, diagnóstico, tratamiento y/o pronóstico.</span></div><div style="position:absolute;left:36.00px;top:669.10px" class="cls_007"><span class="cls_007">_____________________________________</span></div><div style="position:absolute;left:319.25px;top:669.10px" class="cls_007"><span class="cls_007">______________________________________________</span></div><div style="position:absolute;left:58.32px;top:680.62px" class="cls_009"><span class="cls_009">NOMBRE, FIRMA Y CÉDULA DEL MEDICO</span></div><div style="position:absolute;left:328.05px;top:678.70px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL PACIENTE O REPRESENTANTE LEGAL</span></div><div style="position:absolute;left:36.00px;top:712.78px" class="cls_007"><span class="cls_007">_____________________________________</span></div><div style="position:absolute;left:319.25px;top:712.78px" class="cls_007"><span class="cls_007">______________________________________________</span></div><div style="position:absolute;left:67.22px;top:724.30px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL TESTIGO (1)</span></div><div style="position:absolute;left:377.40px;top:724.30px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL TESTIGO (2)</span></div></div><div style="position:absolute;left:50%;margin-left:-306px;top:802px;width:612px;height:792px;border-style:outset;overflow:hidden"><div style="position:absolute;left:0px;top:0px"><img src="203674ea-e583-11e9-9d71-0cc47a792c0a_id_203674ea-e583-11e9-9d71-0cc47a792c0a_files/background2.jpg" width=612 height=792></div><div style="position:absolute;left:81.26px;top:107.54px" class="cls_012"><span class="cls_012">CARTA DE RENUNCIA A SEGUIR RECIBIENDO ATENCION MÉDICA</span></div><div style="position:absolute;left:246.89px;top:156.50px" class="cls_007"><span class="cls_007">Tepatitlán de Morelos, Jalisco a _____de _______________del 20_____</span></div><div style="position:absolute;left:36.00px;top:204.38px" class="cls_006"><span class="cls_006">Yo:</span><span class="cls_007"> ______________</span></div><div style="position:absolute;left:140.94px;top:204.38px" class="cls_007"><span class="cls_007">_________________</span></div><div style="position:absolute;left:243.77px;top:204.38px" class="cls_007"><span class="cls_007">_________________ </span><span class="cls_006">de </span><span class="cls_007">______</span><span class="cls_006">años de edad, de sexo _____________</span></div><div style="position:absolute;left:62.78px;top:216.02px" class="cls_009"><span class="cls_009">Apellido Paterno</span></div><div style="position:absolute;left:156.93px;top:216.02px" class="cls_009"><span class="cls_009">Apellido Materno</span></div><div style="position:absolute;left:272.55px;top:214.10px" class="cls_009"><span class="cls_009">Nombre (s)</span></div><div style="position:absolute;left:36.00px;top:236.54px" class="cls_006"><span class="cls_006">Con domicilio en: </span><span class="cls_007">_______________________________________</span></div><div style="position:absolute;left:347.67px;top:236.54px" class="cls_007"><span class="cls_007">_______</span></div><div style="position:absolute;left:394.90px;top:236.54px" class="cls_007"><span class="cls_007">________________________________</span></div><div style="position:absolute;left:209.57px;top:248.21px" class="cls_009"><span class="cls_009">Calle</span></div><div style="position:absolute;left:361.16px;top:248.21px" class="cls_009"><span class="cls_009">No.</span></div><div style="position:absolute;left:460.23px;top:248.21px" class="cls_009"><span class="cls_009">Colonia</span></div><div style="position:absolute;left:36.00px;top:266.57px" class="cls_009"><span class="cls_009">____________</span></div><div style="position:absolute;left:102.78px;top:266.57px" class="cls_009"><span class="cls_009">____________________________________</span></div><div style="position:absolute;left:274.08px;top:266.57px" class="cls_009"><span class="cls_009">_________________________</span></div><div style="position:absolute;left:398.47px;top:266.57px" class="cls_009"><span class="cls_009">_______________________________________</span></div><div style="position:absolute;left:53.88px;top:275.81px" class="cls_009"><span class="cls_009">C.P.</span></div><div style="position:absolute;left:158.23px;top:275.81px" class="cls_009"><span class="cls_009">Municipio.</span></div><div style="position:absolute;left:312.11px;top:275.81px" class="cls_009"><span class="cls_009">Estado</span></div><div style="position:absolute;left:459.55px;top:275.81px" class="cls_009"><span class="cls_009">Teléfono</span></div><div style="position:absolute;left:36.00px;top:312.53px" class="cls_006"><span class="cls_006">En mi carácter de</span><span class="cls_007">: _________________________    </span><span class="cls_006">Identificándome con: </span><span class="cls_007">___________________________________</span></div><div style="position:absolute;left:129.38px;top:322.13px" class="cls_009"><span class="cls_009">Paciente o Familiar responsable de:</span></div><div style="position:absolute;left:36.00px;top:344.69px" class="cls_006"><span class="cls_006">Declaro:</span></div><div style="position:absolute;left:36.00px;top:367.85px" class="cls_007"><span class="cls_007">Que es mi libre decisión renunciar a seguir recibiendo la atención médica de que he sido objeto en esta institución</span></div><div style="position:absolute;left:36.00px;top:379.25px" class="cls_007"><span class="cls_007">hospitalaria, a pesar de la información que he recibido por parte del Dr:</span></div><div style="position:absolute;left:36.00px;top:402.29px" class="cls_007"><span class="cls_007">_________________________________________________________________________________________________</span></div><div style="position:absolute;left:36.00px;top:413.81px" class="cls_007"><span class="cls_007">Sobre su importancia para mi salud y los riesgos de dicha renuncia. Así mismo libero de toda responsabilidad sobre esta</span></div><div style="position:absolute;left:36.00px;top:425.23px" class="cls_007"><span class="cls_007">decisión al </span><span class="cls_006">Hospital Real San Lucas.</span></div><div style="position:absolute;left:36.00px;top:505.87px" class="cls_007"><span class="cls_007">____________________________________</span></div><div style="position:absolute;left:319.25px;top:505.87px" class="cls_007"><span class="cls_007">______________________________________________</span></div><div style="position:absolute;left:58.32px;top:517.27px" class="cls_009"><span class="cls_009">NOMBRE, FIRMA Y CÉDULA DEL MEDICO</span></div><div style="position:absolute;left:328.05px;top:515.35px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL PACIENTE O REPRESENTANTE LEGAL</span></div><div style="position:absolute;left:36.00px;top:595.54px" class="cls_007"><span class="cls_007">____________________________________</span></div><div style="position:absolute;left:319.25px;top:595.54px" class="cls_007"><span class="cls_007">______________________________________________</span></div><div style="position:absolute;left:65.06px;top:607.06px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL TESTIGO (1)</span></div><div style="position:absolute;left:375.10px;top:607.06px" class="cls_009"><span class="cls_009">NOMBRE Y FIRMA DEL TESTIGO (2)</span></div></div></body></html>`
          }).then(() => resolve());
          break;
          case ('ticketCorte'):
          console.log('corte')
          console.log('autor', autor)
          console.log('caja', caja.nombre)
            html = `
            <!doctype html>
            <html>
              <head>
                <style type="text/css">
                  * {
                      font-size: 12px;
                      font-family: 'Times New Roman';
                  }

                  td,
                  th,
                  tr,
                  table {
                      border: 2px solid #646569;
                      border-collapse: collapse;
                      word-break: break-all;
                  }

                  td.cantidad,
                  th.cantidad {
                      padding: 2px;
                      width: 100px;
                      max-width: 100px;
                      word-break: break-all;
                  }

                  td.descripcion,
                  th.descripcion {
                      padding: 2px;
                      width: 400px;
                      max-width: 400px;
                      word-break: break-all;
                  }

                  td.precio,
                  th.precio {
                    padding: 2px;
                    width: 200px;
                    max-width: 200px;
                    word-break: break-all;
                  }

                  td.total,
                  th.total {
                    padding: 2px;
                    width: 200px;
                    max-width: 200px;
                    word-break: break-all;
                  }

                  td.table2,
                  th.table2 {
                      width: 10%;
                      max-width: 10%;
                      word-break: break-all;
                  }

                  .centrado {
                      text-align: center;
                      align-content: center;
                  }

                  .align-right {
                      text-align: right;
                      align-content: right;
                  }

                  .align-left {
                      text-align: left;
                      align-content: left;
                  }

                  .ticket {
                      width: 100%;
                      max-width: 100%;
                  }

                  .bigText {
                    font-size:24px;
                  }

                  img {
                      width: 100;
                      max-width: 100px;
                  }

                  img.qr {
                    width : 100;
                    height: auto;
                    margin-left: auto;
                    margin-right: auto;
                    display: block;
                  }

                  table.style1 {
                    border-collapse: collapse;
                    width: 100%;
                    float: left
                  }

                  td, th {
                    border: 1px solid #000;
                    text-align: center;
                    padding: 5px;
                  }

                  tr.style1:nth-child(odd) {
                    background-color: #63C0B9;
                    border: 1px solid #000;
                  }

                  .hrslColor {
                    background-color: #63C0B9;
                  }

                  /* Create two equal columns that floats next to each other */
                  div.column1 {
                    float: left;
                    width: 20%;
                  }
                  div.column2 {
                    float: left;
                    width: 40%;
                  }
                  div.column3 {
                    float: right;
                    width: 30%;
                  }

                  /* Clear floats after the columns */
                  .row:after {
                    width: 500;
                    max-width: 500px;
                    content: "";
                    display: table;
                    clear: both;
                  }

                  p.datos {
                    padding: 2px;
                  }

                  br.datos {
                    content: "";
                    margin: 2em;
                    display: block;
                    font-size: 20%;
                  }

                </style>
              </head>
              <body>
                <div class="row">
                  <div class="column1" style="background-color:#fff;">
                    <img src="data:image/png;base64, ${logoCompleto} alt="Logotipo"/>
                  </div>
                  <div class="column2" style="background-color:#fff;">
                    <p>
                    Hospital Real San Lucas S.A. de C.V.<br class="datos">
                    Av. Luis Donaldo Colosio no. 863 <br class="datos">
                    C.P. 47670, Col. La Gloria<br class="datos">
                    RFC: HRS1605113C7
                    </p>
                  </div>
                  <div class="column3" style="background-color:#fff;">
                    <table class="style1">
                      <tr class="style1">
                        <th class="title">Folio</th>
                      </tr>
                      <tr class="style1">
                        <td class="style1">${caja.folioCorte}</td>
                      </tr>
                      <tr class="style1">
                        <th class="title">Fecha y Hora</th>
                      </tr>
                      <tr class="style1">
                        <td class="style1">${fecha.dia} ${fecha.hora}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="ticket">
                  <p class="centrado">
                     <b class="bigText">Corte de caja</b>
                  </p>
                  <table style="width: 100%">

                    <tbody>
                    `;

            html += '</tbody></table><p class="align-rigth"><b>Realizado por: </b>';
            html += autor.names;
            html += ' ';
            html += autor.lastName1;
            html += ' ';
            html += autor.lastName2;
            html += '<p class="align-rigth"><b>Caja: </b>';
            html += caja.nombre;
            html += '<p class="align-rigth"><b>Monto retirado:</b> $';
            html += retiro.toFixed(2);
            html += '<p class="align-rigth"><b>Monto restante:</b> $';
            html += caja.efectivo.toFixed(2);
            html +=`</p></div></body></html>`;
            RNPrint.print({ html }).then(() => resolve());
            break;
        case ('ticketVenta'):
          html = `
          <!doctype html>
          <html>
            <head>
              <style type="text/css">
                * {
                    font-size: 12px;
                    font-family: 'Times New Roman';
                }

                td,
                th,
                tr,
                table {
                    border: 2px solid #646569;
                    border-collapse: collapse;
                    word-break: break-all;
                }

                td.cantidad,
                th.cantidad {
                    padding: 2px;
                    width: 100px;
                    max-width: 100px;
                    word-break: break-all;
                }

                td.descripcion,
                th.descripcion {
                    padding: 2px;
                    width: 400px;
                    max-width: 400px;
                    word-break: break-all;
                }

                td.precio,
                th.precio {
                  padding: 2px;
                  width: 200px;
                  max-width: 200px;
                  word-break: break-all;
                }

                td.total,
                th.total {
                  padding: 2px;
                  width: 200px;
                  max-width: 200px;
                  word-break: break-all;
                }

                td.table2,
                th.table2 {
                    width: 10%;
                    max-width: 10%;
                    word-break: break-all;
                }

                .centrado {
                    text-align: center;
                    align-content: center;
                }

                .align-right {
                    text-align: right;
                    align-content: right;
                }

          			.align-left {
                    text-align: left;
                    align-content: left;
                }

                .ticket {
                    width: 100%;
                    max-width: 100%;
                }

                .bigText {
                  font-size:24px;
                }

                img {
                    width: 100;
          					max-width: 100px;
                }

                img.qr {
                  width : 100;
                  height: auto;
                  margin-left: auto;
                  margin-right: auto;
                  display: block;
                }

          			table.style1 {
          			  border-collapse: collapse;
          			  width: 100%;
          				float: left
          			}

          			td, th {
          			  border: 1px solid #000;
          			  text-align: center;
          			  padding: 5px;
          			}

          			tr.style1:nth-child(odd) {
          			  background-color: #63C0B9;
          				border: 1px solid #000;
          			}

                .hrslColor {
                  background-color: #63C0B9;
                }

          			/* Create two equal columns that floats next to each other */
          			div.column1 {
          			  float: left;
          			  width: 20%;
          			}
          			div.column2 {
          			  float: left;
          			  width: 40%;
          			}
          			div.column3 {
          			  float: right;
          			  width: 30%;
          			}

          			/* Clear floats after the columns */
          			.row:after {
          				width: 500;
          				max-width: 500px;
          			  content: "";
          			  display: table;
          			  clear: both;
          			}

          			p.datos {
          				padding: 2px;
          			}

          			br.datos {
          			  content: "";
          			  margin: 2em;
          			  display: block;
          			  font-size: 20%;
          			}

              </style>
            </head>
            <body>
          		<div class="row">
          			<div class="column1" style="background-color:#fff;">
          				<img src="data:image/png;base64, ${logoCompleto} alt="Logotipo"/>
          			</div>
          			<div class="column2" style="background-color:#fff;">
          				<p>
                  Hospital Real San Lucas S.A. de C.V.<br class="datos">
                  Av. Luis Donaldo Colosio no. 863 <br class="datos">
                  C.P. 47670, Col. La Gloria<br class="datos">
                  RFC: HRS1605113C7
          				</p>
          			</div>
          			<div class="column3" style="background-color:#fff;">
          				<table class="style1">
          					<tr class="style1">
          						<th class="title">Folio</th>
          					</tr>
          					<tr class="style1">
          						<td class="style1">${folio}</td>
          					</tr>
          					<tr class="style1">
          						<th class="title">Fecha y Hora</th>
          					</tr>
          					<tr class="style1">
          						<td class="style1">${fecha.dia} ${fecha.hora}</td>
          					</tr>
          				</table>
          			</div>
          		</div>
              <div class="ticket">
                <p class="centrado">
                   <b class="bigText">Nota de venta</b>
                </p>
                <table style="width: 100%">
                  <thead>
                    <tr class="hrslColor">
                      <th class="style1">Cantidad</th>
                      <th class="style1">Descripción</th>
                      <th class="style1">P.U.</th>
                      <th class="style1">Importe</th>
                    </tr>
                  </thead>
                  <tbody>
                  `;
          table = '';
          subtotal = 0;
          impuestos = 0;
          console.log('lista', listData)
          listData.forEach((producto) => {
            console.log('1',producto);
            if (producto) {
            let price = 0;
            console.log('2',producto);
            console.log('Entre')
            if (producto.tipo === 'paquete quirúrgico') {
              producto.incluye.forEach((subproducto) => {
                table += '<tr><td class="cantidad">';
                table += subproducto.cantidad;
                table += '</td><td class="descripcion align-left">';
                table += subproducto.nombre;
                table += '</td><td class="precio">$';
                if(producto.precio!==null && producto.precio!==undefined){ price = subproducto.precio.toFixed(2); }
                else { price = subproducto.precioPublico.toFixed(2); }
                table += price;
                table += '</td><td class="total">$';
                table += (subproducto.cantidad * price).toFixed(2);
                table += '</td></tr>';
                subtotal += (subproducto.cantidad * price);
                impuestos += subproducto.cantidad * price * (subproducto.iva / 100);
              });
            } else {
                table += '<tr><td class="cantidad">';
                table += producto.cantidad;
                table += '</td><td class="descripcion align-left">';
                table += producto.nombre;
                table += '</td><td class="precio">$';
                if(producto.precio!==null && producto.precio!==undefined){ price = producto.precio.toFixed(2); }
                else { price = producto.precioPublico.toFixed(2); }
                table += price;
                table += '</td><td class="total">$';
                table += (producto.cantidad * price).toFixed(2);
                table += '</td></tr>';
                subtotal += (producto.cantidad * price);
                if(producto.iva!==null || producto.iva !== undefined){
                    impuestos += producto.cantidad * price * (producto.iva / 100);
                }
              }
            }
          });

          html += table;
          html += '</tbody></table><p class="align-rigth"><b>Subtotal:</b> $';
          html += subtotal.toFixed(2);
          html += '<p class="align-rigth"><b>IVA:</b> $';
          html += impuestos.toFixed(2);
          html += '<p class="align-rigth"><b>Total:</b> $';
          const total = subtotal + impuestos;
          html += (total).toFixed(2);
          if (descuento > 0.5) {
          html += '<p class="align-rigth"><b>Descuento de '
          html += tipoDescuento
          html +=':</b> $';
          html += (descuento);
          html += '<p class="align-rigth"><b>Pagado:</b> $';
          html += (total - descuento).toFixed(2);
        }
          html +=`</p></div></body></html>`;
          RNPrint.print({ html }).then(() => resolve());
          break;
        case ('detailBill'):
          html = `
          <!doctype html>
          <html>
            <head>
              <style type="text/css">
                * {
                    font-size: 12px;
                    font-family: 'Times New Roman';
                }

                td,
                th,
                tr,
                table {
                    border: 2px solid #646569;
                    border-collapse: collapse;
                    word-break: break-all;
                }

                td.cantidad,
                th.cantidad {
                    padding: 2px;
                    width: 100px;
                    max-width: 100px;
                    word-break: break-all;
                }

                td.descripcion,
                th.descripcion {
                    padding: 2px;
                    width: 400px;
                    max-width: 400px;
                    word-break: break-all;
                }

                td.precio,
                th.precio {
                  padding: 2px;
                  width: 200px;
                  max-width: 200px;
                  word-break: break-all;
                }

                td.total,
                th.total {
                  padding: 2px;
                  width: 200px;
                  max-width: 200px;
                  word-break: break-all;
                }

                td.table2,
                th.table2 {
                    width: 10%;
                    max-width: 10%;
                    word-break: break-all;
                }

                .centrado {
                    text-align: center;
                    align-content: center;
                }

                .align-right {
                    text-align: right;
                    align-content: right;
                }

                .align-left {
                    text-align: left;
                    align-content: left;
                }

                .ticket {
                    width: 100%;
                    max-width: 100%;
                }

                .bigText {
                  font-size:24px;
                }

                img {
                    width: 100;
                    max-width: 100px;
                }

                img.qr {
                  width : 100;
                  height: auto;
                  margin-left: auto;
                  margin-right: auto;
                  display: block;
                }

                table.style1 {
                  border-collapse: collapse;
                  width: 100%;
                  float: left
                }

                td, th {
                  border: 1px solid #000;
                  text-align: center;
                  padding: 5px;
                }

                tr.style1:nth-child(odd) {
                  background-color: #63C0B9;
                  border: 1px solid #000;
                }

                .hrslColor {
                  background-color: #63C0B9;
                }

                /* Create two equal columns that floats next to each other */
                div.column1 {
                  float: left;
                  width: 20%;
                }
                div.column2 {
                  float: left;
                  width: 40%;
                }
                div.column3 {
                  float: right;
                  width: 30%;
                }

                /* Clear floats after the columns */
                .row:after {
                  width: 500;
                  max-width: 500px;
                  content: "";
                  display: table;
                  clear: both;
                }

                p.datos {
                  padding: 2px;
                }

                br.datos {
                  content: "";
                  margin: 2em;
                  display: block;
                  font-size: 20%;
                }

              </style>
            </head>
            <body>
              <div class="row">
                <div class="column1" style="background-color:#fff;">
                  <img src="data:image/png;base64,${logo}"/>
                </div>
                <div class="column2" style="background-color:#fff;">
                  <p>
                    Hospital Real San Lucas S.A. de C.V.<br class="datos">
                    Av. Luis Donaldo Colosio #863 <br class="datos">
                    C.P. 47670, Col. La Gloria<br class="datos">
                    RFC: HRS1605113C7
                  </p>
                </div>
                <div class="column3" style="background-color:#fff;">
                  <table class="style1">
                    <tr class="style1">
                      <th class="title">Fecha y Hora</th>
                    </tr>
                    <tr class="style1">
                      <td class="style1">${fecha.dia} ${fecha.hora}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="ticket">
                <p class="centrado">
                   <b class="bigText">Cuenta Detallada</b>
                </p>
                <p class="align-left datos">
                   <b>Paciente:</b>${paciente.lastName1} ${paciente.lastName2} ${paciente.names}<br class="datos">
                </p>
                <p><b class="midText">Farmacia</b></p>
                <table style="width: 100%">
                  <thead>
                    <tr class="hrslColor">
                      <th class="style1">Cant.</th>
                      <th class="style1">Descripción</th>
                      <th class="style1">P.U.</th>
                      <th class="style1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
            `;

            table = '';
            subtotal = 0;
            impuestos = 0;
            console.log('lista',lista)
            lista.Farmacia.forEach((producto) => {
              let price = 0;
              console.log(producto);
              table += '<tr><td class="cantidad">';
              table += producto.cant;
              table += '</td><td class="descripcion align-left">';
              table += producto.nombre;
              table += '</td><td class="precio">$';
              if(producto.precio!==null && producto.precio!==undefined){ price = producto.precio.toFixed(2); }
              else { price = producto.precioPublico.toFixed(2); }
              table += price;
              table += '</td><td class="total">$';
              table += (producto.cant * price).toFixed(2);
              table += '</td></tr>';
              subtotal += (producto.cant * price);
              if(producto.iva!==null || producto.iva !== undefined){
                  impuestos += producto.cant * price * (producto.iva/100);
              }
            });

            html += table;
            html += `
              </tbody>
                </table>
                <p><b class="midText">Estudios</b></p>
                <table style="width: 100%">
                  <thead class="hrslColor">
                    <tr>
                      <th class="style1">Cant.</th>
                      <th class="style1">Descripción</th>
                      <th class="style1">P.U.</th>
                      <th class="style1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                `;

              table = '';
              lista.Estudios.forEach((producto) => {
                console.log('CHECK', producto);
                let price = 0;
                console.log(producto);
                table += '<tr><td class="cantidad">';
                table += producto.cant;
                table += '</td><td class="descripcion align-left">';
                table += producto.nombre;
                table += '</td><td class="precio">$';
                if(producto.precio!==null && producto.precio!==undefined){ price = producto.precio.toFixed(2); }
                else { price = producto.precioPublico.toFixed(2); }
                table += price;
                table += '</td><td class="total">$';
                table += (producto.cant * price).toFixed(2);
                table += '</td></tr>';
                subtotal += (producto.cant * price);
                if(producto.iva!==null || producto.iva !== undefined){
                    impuestos += producto.cant * price * (producto.iva/100);
                }
              });

              html += table;
              html += `
                </tbody>
                  </table>
                  <p><b class="midText">Cargos administrativos</b></p>
                  <table style="width: 100%">
                    <thead class="hrslColor">
                      <tr>
                        <th class="style1">Cant.</th>
                        <th class="style1">Descripción</th>
                        <th class="style1">P.U.</th>
                        <th class="style1">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                `;
                table = '';
                lista.Administrativos.forEach((producto) => {
                  console.log('CHECK', producto);
                  let price = 0;
                  console.log(producto);
                  table += '<tr><td class="cantidad">';
                  table += producto.cant;
                  table += '</td><td class="descripcion align-left">';
                  table += producto.nombre;
                  table += '</td><td class="precio">$';
                  if(producto.precio!==null && producto.precio!==undefined){ price = producto.precio.toFixed(2); }
                  else { price = producto.precioPublico.toFixed(2); }
                  table += price;
                  table += '</td><td class="total">$';
                  table += (producto.cant * price).toFixed(2);
                  table += '</td></tr>';
                  subtotal += (producto.cant * price);
                  if(producto.iva!==null || producto.iva !== undefined){
                    impuestos += producto.cant * price * (producto.iva/100)
                  }
                });

                html += table;
                /*html += `
                  </tbody>
                    </table>
                    <p><b class="midText">Cirugia</b></p>
                    <table style="width: 100%">
                      <thead class="hrslColor">
                        <tr>
                          <th class="style1">Cant.</th>
                          <th class="style1">Descripción</th>
                          <th class="style1">P.U.</th>
                          <th class="style1">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                  `;

                  table = '';
                  lista.Cirugia.forEach((producto) => {
                    console.log('CHECK', producto);
                    let price = 0;
                    console.log(producto);
                    table += '<tr><td class="cantidad">';
                    table += producto.cantidad;
                    table += '</td><td class="descripcion align-left">';
                    table += producto.nombre;
                    table += '</td><td class="precio">$';
                    if(producto.precio!==null && producto.precio!==undefined){ price = producto.precio.toFixed(2); }
                    else { price = producto.precioPublico.toFixed(2); }
                    table += price;
                    table += '</td><td class="total">$';
                    table += (producto.cantidad * price).toFixed(2);
                    table += '</td></tr>';
                    subtotal += (producto.cantidad * price);
                    if(producto.iva!==null || producto.iva !== undefined){
                        impuestos += producto.cantidad * price * (producto.iva/100)
                    }
                  });

                  html += table; */
                  html += `
                            </tbody>
                          </table>
                          <p class="align-right"><b>Subtotal:</b> $${subtotal.toFixed(2)}</p>
                          <p class="align-right"><b>IVA:</b> $${impuestos.toFixed(2)}</p>
                          <p class="align-right"><b>Total:</b> $${(subtotal+impuestos).toFixed(2)}</p>
                        </div>
                      </body>
                    </html>
                  `;
          RNPrint.print({ html }).then(() => resolve());
          break;
        case ('resumeBill'):
          html = `
          <!doctype html>
          <html>
            <head>
              <style type="text/css">
                * {
                    font-size: 12px;
                    font-family: 'Times New Roman';
                }

                td,
                th,
                tr,
                table {
                    border: 2px solid #646569;
                    border-collapse: collapse;
                    word-break: break-all;
                }

                td.cantidad,
                th.cantidad {
                    padding: 2px;
                    width: 100px;
                    max-width: 100px;
                    word-break: break-all;
                }

                td.descripcion,
                th.descripcion {
                    padding: 2px;
                    width: 400px;
                    max-width: 400px;
                    word-break: break-all;
                }

                td.precio,
                th.precio {
                  padding: 2px;
                  width: 200px;
                  max-width: 200px;
                  word-break: break-all;
                }

                td.total,
                th.total {
                  padding: 2px;
                  width: 200px;
                  max-width: 200px;
                  word-break: break-all;
                }

                td.table2,
                th.table2 {
                    width: 10%;
                    max-width: 10%;
                    word-break: break-all;
                }

                .centrado {
                    text-align: center;
                    align-content: center;
                }

                .align-right {
                    text-align: right;
                    align-content: right;
                }

                .align-left {
                    text-align: left;
                    align-content: left;
                }

                .ticket {
                    width: 100%;
                    max-width: 100%;
                }

                .bigText {
                  font-size:24px;
                }

                img {
                    width: 100;
                    max-width: 100px;
                }

                img.qr {
                  width : 100;
                  height: auto;
                  margin-left: auto;
                  margin-right: auto;
                  display: block;
                }

                table.style1 {
                  border-collapse: collapse;
                  width: 100%;
                  float: left
                }

                td, th {
                  border: 1px solid #000;
                  text-align: center;
                  padding: 5px;
                }

                tr.style1:nth-child(odd) {
                  background-color: #63C0B9;
                  border: 1px solid #000;
                }

                .hrslColor {
                  background-color: #63C0B9;
                }

                /* Create two equal columns that floats next to each other */
                div.column1 {
                  float: left;
                  width: 20%;
                }
                div.column2 {
                  float: left;
                  width: 40%;
                }
                div.column3 {
                  float: right;
                  width: 30%;
                }

                /* Clear floats after the columns */
                .row:after {
                  width: 500;
                  max-width: 500px;
                  content: "";
                  display: table;
                  clear: both;
                }

                p.datos {
                  padding: 2px;
                }

                br.datos {
                  content: "";
                  margin: 2em;
                  display: block;
                  font-size: 20%;
                }

              </style>
            </head>
            <body>
              <div class="row">
                <div class="column1" style="background-color:#fff;">
                  <img src="data:image/png;base64,${logo}"/>
                </div>
                <div class="column2" style="background-color:#fff;">
                  <p>
                    Hospital Real San Lucas S.A. de C.V.<br class="datos">
                    Av. Luis Donaldo Colosio no. 863 <br class="datos">
                    C.P. 47670, Col. La Gloria<br class="datos">
                    RFC: HRS1605113C7
                  </p>
                </div>
                <div class="column3" style="background-color:#fff;">
                  <table class="style1">
                    <tr class="style1">
                      <th class="title">Fecha y Hora</th>
                    </tr>
                    <tr class="style1">
                      <td class="style1">${fecha.dia} ${fecha.hora}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="ticket">
                <p class="centrado">
                   <b class="bigText">Resumen Cuenta</b>
                </p>
                <p class="align-left datos">
                   <b>Paciente:</b>${paciente.lastName1} ${paciente.lastName2} ${paciente.names}<br class="datos">
                </p>
                <table style="width: 100%">
                  <thead>
                    <tr class="hrslColor">
                      <th class="style1">Descripción</th>
                      <th class="style1">Importe</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="descripcion align-left">Farmacia</td>
                      <td class="total">$${lista.totalFarmacia.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class="descripcion align-left">Estudios</td>
                      <td class="total">$${lista.totalEstudios.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class="descripcion align-left">Hospitalización</td>
                      <td class="total">$${lista.totalHospitalizacion.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td class="descripcion align-left">Cirugía</td>
                      <td class="total">$${lista.totalCirugia.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
                <p class="align-right"><b>Total:</b>$${(lista.totalFarmacia+lista.totalEstudios+lista.totalHospitalizacion+lista.totalCirugia).toFixed(2)}</p>
              </div>
            </body>
          </html>
          `;
          RNPrint.print({ html }).then(() => resolve());
          break;
        case ('abonoCuenta'):
          html = `
          <!doctype html>
          <html>
            <head>
              <style type="text/css">
                * {
                    font-size: 14px;
                    font-family: 'Times New Roman';
                }

                td,
                th,
                tr,
                table {
                    border: 2px solid #646569;
                    border-collapse: collapse;
                    word-break: break-all;
                }

                td.cantidad,
                th.cantidad {
                    padding: 2px;
                    width: 100px;
                    max-width: 100px;
                    word-break: break-all;
                }

                td.descripcion,
                th.descripcion {
                    padding: 2px;
                    width: 400px;
                    max-width: 400px;
                    word-break: break-all;
                }

                td.precio,
                th.precio {
                  padding: 2px;
                  width: 200px;
                  max-width: 200px;
                  word-break: break-all;
                }

                td.total,
                th.total {
                  padding: 2px;
                  width: 200px;
                  max-width: 200px;
                  word-break: break-all;
                }

                td.table2,
                th.table2 {
                    width: 10%;
                    max-width: 10%;
                    word-break: break-all;
                }

                .centrado {
                    text-align: center;
                    align-content: center;
                }

                .align-right {
                    text-align: right;
                    align-content: right;
                }

                .align-left {
                    text-align: left;
                    align-content: left;
                }

                .ticket {
                    width: 100%;
                    max-width: 100%;
                }

                .bigText {
                  font-size:30px;
                }

                img {
                    width: 100;
                    max-width: 100px;
                }

                img.qr {
                  width : 100;
                  height: auto;
                  margin-left: auto;
                  margin-right: auto;
                  display: block;
                }

                table.style1 {
                  border-collapse: collapse;
                  width: 100%;
                  float: left
                }

                td, th {
                  border: 1px solid #000;
                  text-align: center;
                  padding: 5px;
                }

                tr.style1:nth-child(odd) {
                  background-color: #63C0B9;
                  border: 1px solid #000;
                }

                .hrslColor {
                  background-color: #63C0B9;
                }

                /* Create two equal columns that floats next to each other */
                div.column1 {
                  float: left;
                  width: 20%;
                }
                div.column2 {
                  float: left;
                  width: 40%;
                }
                div.column3 {
                  float: right;
                  width: 30%;
                }

                /* Clear floats after the columns */
                .row:after {
                  width: 500;
                  max-width: 500px;
                  content: "";
                  display: table;
                  clear: both;
                }

                p.datos {
                  padding: 2px;
                }

                br.datos {
                  content: "";
                  margin: 2em;
                  display: block;
                  font-size: 20%;
                }

              </style>
            </head>
            <body>
              <div class="row">
                <div class="column1" style="background-color:#fff;">
                  <img src="data:image/png;base64,${logo}"/>
                </div>
                <div class="column2" style="background-color:#fff;">
                  <p>
                  Hospital Real San Lucas S.A. de C.V.<br class="datos">
                  Av. Luis Donaldo Colosio no. 863 <br class="datos">
                  C.P. 47670, Col. La Gloria<br class="datos">
                  RFC: HRS1605113C7
                  </p>
                </div>
                <div class="column3" style="background-color:#fff;">
                  <table class="style1">
                    <tr class="style1">
                      <th class="title">Folio</th>
                    </tr>
                    <tr class="style1">
                      <td class="style1">${folio}</td>
                    </tr>
                    <tr class="style1">
                      <th class="title">Fecha y Hora</th>
                    </tr>
                    <tr class="style1">
                      <td class="style1">${fecha.dia} ${fecha.hora}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div class="ticket">
                <p class="centrado">
                   <b class="bigText">Comprobante de Pago Parcial</b>
                </p>
                <p class="align-left datos">
                   <b>Paciente:</b> ${ingreso.paciente.lastName1} ${ingreso.paciente.lastName2} ${ingreso.paciente.names}<br class="datos">
                   <b>Ingreso:</b> ${ingreso.objectId}<br class="datos">
                   <b>Fecha de ingreso:</b> ${ingreso.createdAt}
                </p>
                <table>
                  <thead>
                    <tr class="hrslColor">
                      <th class="style1">Cantidad</th>
                      <th class="style1">Descripción</th>
                      <th class="style1">Tipo de Pago</th>
                      <th class="style1">Importe</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="cantidad">1</td>
                      <td class="descripcion align-left">Abono a cuenta de paciente</td>
                      <td class="precio">Efectivo</td>
                      <td class="total">$${recibido}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </body>
          </html>
          `;
          RNPrint.print({ html }).then(() => resolve());
          break;
        case ('Frontal Expediente Clinico'):
          html = `
          <html>
            <head>
              <style type="text/css">
                * {
                    font-size: 12px;
                    font-family: 'Times New Roman';
                }
                .centrado {
                    text-align: center;
                    align-content: center;
                    color: white;
                }
                .align-right {
                    text-align: right;
                    align-content: right;
                }
          			.align-left {
                    text-align: left;
                    align-content: left;
                }
                .ticket {
                    width: 100%;
                    max-width: 100%;
                }
                .bigText {
                  font-size:24px;
                }
                img {
                    width: 100;
          					max-width: 100px;
                }
                img.qr {
                  width : 100;
                  height: auto;
                  margin-left: auto;
                  margin-right: auto;
                  display: block;
                }
                .hrslColor {
                  background-color: #63C0B9;
                }

          			/* Create two equal columns that floats next to each other */
          			div.column1 {
          			  float: left;
          			  width: 50%;
          			}
          			div.column2 {
          			  float: right;
          			  width: 50%;
          			}
                p.title {
                  font-size: 17px;
                }
          			p.datos {
          				padding: 5px;
                  font-size: 17px;
          			}
          			br.datos {
          			  content: "";
          			  margin: 2em;
          			  display: block;
          			  font-size: 20%;
          			}
                ul.padding {
                  padding: 0;
                }
              </style>
            </head>
            <body>
              <div>
              </div>
          		<div class="row">
          			<div class="column1 align-left" style="background-color:#fff;">
                  <img src="data:image/png;base64, ${logoCompleto} alt="Logotipo" style="max-width:100%; height:auto;"/>
          			</div>
          			<div class="column2 align-right" style="background-color:#fff;">
          				<p class="title">
          					Av. Luis Donaldo Colosio #836, Tepatitlán, Jal.<br class="datos">
          					Teléfonos: 378 688 18 (29, 30, 31, 32)<br class="datos">
          					www.hospitalreansanlucas.com.mx
          				</p>
          			</div>
              </div>

              <div class="ticket">
                <p class="centrado hrslColor">
                   <b class="bigText">HOJA FRONTAL DEL EXPEDIENTE CLÍNICO</b>
                </p>
          			<p class="align-left datos">
                   <b>NOMBRE DEL PACIENTE:</b> `;
            if (paciente.names!==undefined && paciente.lastName1!==undefined && paciente.lastName2!==undefined){
              html += paciente.lastName1 + ' ' + paciente.lastName2 + ' ' + paciente.names;
            } else { html += `_________________________________________________________`; }
            html += '<br class="datos"><b>EDAD:</b>';

            if (paciente.birthday!==undefined){ html += '___________________________________ <b>SEXO:</b>'; }
            else { html += '___________________________________ <b>SEXO:</b>'; }

            if (paciente.sex === 'M') {
              html += 'Masculino';
            }
            else if (paciente.sex === 'M') {
              html += 'Femenino';
            }
            else { html += `_______________________________`; }
            html += '<br class="datos"><b>HABITACION: </b>';

            if (habitacion.ID!==undefined && habitacion.tipoHabitacion!==undefined) {
              html += habitacion.tipoHabitacion + ' ' + habitacion.ID;
            }
            else { html += '__________________________'; }
            html += '<b>N° DE EXPEDIENTE:</b>';
            /*
            if (ingreso.objectId !== undefined){
              html += ingreso.objectId;
            }
            else {
              html += '__________________________';
            }*/
            html += '__________________________<b>N° DE PACIENTE: </b>';

            if (paciente.objectId !== undefined) {
              html += paciente.objectId;
            } else {
              html += '_____________';
            }
            html += `<br class="datos">
              <b>DIAGNOSTICO DE INGRESO:</b> _______________________________________________________<b><br class="datos">
              <b>TRATAMIENTO PROPUESTO:</b> ______________________________________________________________________________<b><br class="datos">
              <b>MEDICO TRATANTE:</b>
            `;

            if(medico.names!==undefined && medico.lastName1!==undefined && medico.lastName2!==undefined) {
              html += medico.lastName1 + ' ' + medico.lastName2 + ' ' + medico.names;
            } else { html += '______________________________________________________________________________________'; }
            html += `<b>
                </p>
                <p class="centrado hrslColor">
                   <b class="bigText">ORDEN DEL EXPEDIENTE CLINICO</b>
                </p>
                <p class="align-left datos">
                   <b>1. REGISTRO DE INGRESO Y EGRESO HOSPITALARIO</b><br class="datos">
                   <b>2. HOJA FRONTAL DEL EXPEDIENTE CLÍNICO.</b><br class="datos">
                   <b>3. NOTA MÉDICA DE INGRESO / URGENCIAS.</b><br class="datos">
                   <b>4. HISTORIA CLÍNICA.</b><br class="datos">
                   <b>5. NOTAS MÉDICAS:</b>
                   <ul><li type="square"><b>(NOTAS DE EVOLUCIÓN, NOTA DE INTERCONSULTA, NOTA PRE-QUIRÚRGICA, NOTA PRE-ANESTÉSICA, NOTA POST-QUIRÚRGICA, NOTA POST-ANESTÉSICA, PARTOGRAMA, NOTA DE TRASLADO).</b></li></ul>
                   <b>6. NOTA DE ALTA.</b><br class="datos">
                   <b>7. INDICACIONES MÉDICAS.</b><br class="datos">
                   <b>8. NOTAS DE ENFERMERÍA.</b><br class="datos">
                   <b>9. ESTUDIOS DE LABORATORIO Y GABINETE.</b><br class="datos">
                   <b>10. TRANSFUSIÓN SANGUÍNEA Y HEMOCOMPONENTES.</b><br class="datos">
                   <b>11. AVISO DE PRIVACIDAD.</b><br class="datos">
                   <b>12. CONSENTIMIENTOS INFORMADOS (HOSPITALIZACIÓN Y PROCEDIMIENTOS QUIRÚRGICOS).</b><br class="datos">
                   <b>13. HOJA DE ALTA VOLUNTARIA.</b><br class="datos">
                   <b>14. PARTE MÉDICO DE LESIONES.</b><br class="datos">
                   <b>15. CERTIFICADO DE DEFUNCIÓN O MUERTE FETAL.</b><br class="datos">
                   <b>16. ANEXOS.</b>
                </p>
                <p class="align-left datos">
                  <b>Expediente Clínico Conforme a la Norma Oficial Mexicana NOM-004-SSA3-2012.</b><br class="datos">
                  <ul>
                    <li type="circle"><b>Mantener el orden de todos los formatos previamente indicados, y en orden cronológico, de lo más reciente a lo más antiguo (Notas Médicas, de Enfermería, Indicaciones, Paraclínicos, Consentimientos, etc).</b></li>
                    <li type="circle"><b>Deberá estar escrito de manera legible, evitando omisiones, abreviaturas médicas o epónimos.</b></li>
                    <li type="circle"><b>Todo Procedimiento a realizar requiere de un Consentimiento Informado, incluyendo la Hospitalización.</b></li>
                    <li type="circle"><b>Todo procedimiento o indicación debe consignarse por escrito, legible, con fecha y hora de realización.</b></li>
                  </ul>
                </p>
              </div>
            </body>
          </html>
            `;
          RNPrint.print({ html }).then(() => resolve());
          break;
        case ('registroIngresoEgreso'):
          RNPrint.print({ html: registroIngresoEgreso }).then(() => resolve());
          break;
        case ('hojaFrontal'):
          RNPrint.print({ html: hojaFrontal }).then(() => resolve());
          break;
        case ('notaMedica'):
          RNPrint.print({ html: notaMedica }).then(() => resolve());
          break;
        case ('notaEvolucionClinica'):
          RNPrint.print({ html: notaEvolucionClinica }).then(() => resolve());
          break;
        case ('notaPreAnestesica'):
          RNPrint.print({ html: notaPreAnestesica }).then(() => resolve());
          break;
        case ('notaPreQuirurgica'):
          RNPrint.print({ html: notaPreQuirurgica }).then(() => resolve());
          break;
        case ('notaPostQuirurgica'):
          RNPrint.print({ html: notaPostQuirurgica }).then(() => resolve());
          break;
        case ('indicacionesMedicas'):
          RNPrint.print({ html: indicacionesMedicas }).then(() => resolve());
          break;
        default:
          break;
        }
      });
    }

    function alertImprimir() {
      return new Promise((resolve, reject) => {
        Alert.alert(
          'Listo',
          `Imprimiendo ${type}`,
          [
            { text: 'Imprimir', onPress: () => imprimirFormato().then(() => resolve()) },
          ],
        );
      });
    }

    function alertRemprimir() {
      return new Promise((resolve, reject) => {
        Alert.alert(
          'Listo',
          `Imprimiendo ${type}`,
          [
            { text: 'Remprimir', onPress: () => imprimirFormato().then(() => resolve()) },
            { text: 'Cancelar' },
          ],
        );
      });
    }

function printIos() {
  if (reimprimir) alertImprimir().then(() => alertRemprimir());
  else alertImprimir();
}

function printAndroid() {
  if (reimprimir) {
    alertRemprimir();
    alertImprimir();
  } else alertImprimir();
}

  return (dispatch) => {


    return new Promise((resolve, reject) => {
    dispatch({ type: PRINT, format: type });
    console.log(info);
    console.log(Platform.select);
      if (Platform.OS === 'ios') printIos();
      if (Platform.OS === 'android') printAndroid();
    }
  );
};
};

export const printClean = () => ({
  type: PRINT_CLEAN
});
