export const notaPreQuirurgica = `
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
        }
        .align-right {
            text-align: right;
            align-content: right;
        }

  			.align-left {
            text-align: left;
            align-content: left;
        }
        .align-up {
          vertical-align: text-top;
        }
        .ticket {
            width: 100%;
            max-width: 100%;
        }
        .bigText {
          font-size:24px;
        }
        .midText {
          font-size:18px;
        }
        .text16 {
          font-size:16px;
        }
        .text10 {
          font-size:10px;
        }
        .smlText {
          font-size:12px;
        }
        img {
            width: 100;
  					max-width: 100px;
        }
        .hrslColor {
          background-color: #63C0B9;
        }
        .white {
          color: white;
        }
        .pad0 {
          padding: 0;
        }
        .pad10 {
          padding-left: 10px;
          padding-right: 10px;
          font-size: 15px;
        }
        .container{
          border: 5px solid;
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
        p.sml {
          padding-left: 10px;
          padding-right: 10px;
          font-size: 10px;
          line-height: 5px;
          margin-top: 0px;
          margin-bottom: 0px;
  			}
  			p.datos {
          padding-left: 10px;
          padding-right: 10px;
          font-size: 17px;
          line-height: 10px;
          margin-top: 5px;
          margin-bottom: 10px;
  			}
        p.datos1 {
          padding-left: 10px;
          padding-right: 10px;
          font-size: 17px;
          line-height: 15px;
          margin-top: 10px;
          margin-bottom: 20px;
  			}
        p.datos2 {
          padding-left: 10px;
          padding-right: 10px;
          font-size: 17px;
          line-height: 10px;
          margin-top: 5px;
          margin-bottom: 10px;
  			}
        p.datos3 {
          text-align:justify;
          padding-left: 10px;
          padding-right: 10px;
          font-size: 15px;
          line-height: 20px;
          margin-top: 15px;
          margin-bottom: 15px;
  			}
        td,
        th,
        tr,
        table {
            border: 1px solid #000;
            border-collapse: collapse;
            /*word-break: break-all;*/
        }
        table.fill {
          width: 100%;
        }

      </style>
    </head>
    <body>
  		<div class="row">
  			<div class="column1 align-left" style="background-color:#fff;">
          <img src="../img/logoCompleto.jpeg" alt="Logotipo" style="max-width:100%; height:auto;"/>
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
        <div class="centrado white">*</div>
        <div class="centrado"><b class="bigText">NOTA POST-QUIRÚRGICA</b></div>
        <div class="container">
          <p class="align-left datos"><b>Nombre:</b> _____________________________________________ <b>Edad:</b> _________<b> Sexo:</b> _________</p>
          <p class="align-left datos"><b>Fecha:</b> ___/___/___<b class="white smlText">*</b><b>Hora:</b> ______<b class="white smlText">*</b><b>Servicio:</b> ______________<b class="white smlText">*</b><b>Habitación No.</b> ________<b class="white smlText">*</b><b>N° Exp.</b> ________</p>
        </div>
        <div class="centrado white">*</div>
        <table class="fill bigText">
          <thead>
            <tr bgcolor="#63C0B9" class="white" height="25">
              <th colspan="4" class="midText">REPORTE FINAL DE LA CIRUGÍA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10">Diagnóstico Prequirúrgico:</td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10">Diagnóstico Postquirúrgico:</td>
            </tr>
            <tr>
              <td colspan="3" width="60%" height="20" class="text16 align-up pad10">Cirugía realizada:</td>
              <td colspan="1" width="40%" height="20" class="text16 align-up pad10">Tiempo Quirúrgico:</td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10">Complicaciones:</td>
            </tr>
            <tr>
              <td colspan="1" width="35%" height="60" class="text16 align-up pad10">Sangrado aproximado:<br><b class="white smlText">***</b>___________ ml</td>
              <td colspan="3" width="65%" height="60" class="text16 align-up pad10">Recuento de gasas realizado por: ________________________________<br>&#9675; Completo &#9675; Incompleto &#9675; No se realizó,  Motivo por lo que no se realizó:</td>
            </tr>
            <tr>
              <td colspan="1" width="35%" height="20" class="text16 align-up pad10">Solicitud de histopatológico &#9675; Si &#9675; No</td>
              <td colspan="3" width="65%" height="20" class="text16 align-up pad10">Resultado:</td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10">Estado del paciente al salir de cirugía:<b class="white smlText">******</b>&#9675; Bueno<b class="white smlText">******</b>&#9675; Regular<b class="white smlText">******</b>&#9675; Malo</td>
            </tr>
            <tr>
              <td colspan="2" width="50%" height="20" class="text16 align-up pad10">Pronóstico</td>
              <td colspan="2" width="50%" height="20" class="text16 align-up pad10">Destino al salir de Quirófano:</td>
            </tr>
          </tbody>
          <thead>
            <tr bgcolor="#63C0B9" class="white" height="25">
              <th colspan="4" class="midText">INTEGRANTES DEL EQUIPO QUIRÚRGICO</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"><b class="white smlText">*********</b>Cirujano:</td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"><b class="white smlText">**</b>Primer ayudante:</td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10">Segundo ayudante:</td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"><b class="white smlText">*****</b>Intrumentista:</td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"><b class="white smlText">********</b>Circulante:</td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"><b class="white smlText">****</b>Anestesiólogo:</td>
            </tr>
          </tbody>
        </table>
        <table class="fill bigText">
          <thead>
            <tr bgcolor="#63C0B9" class="white" height="25">
              <th colspan="4" class="midText">DESCRIPCIÓN DE LA TÉCNICA Y HALLAZGOS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"></td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"></td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"></td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"></td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"></td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"></td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"></td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"></td>
            </tr>
            <tr>
              <td colspan="4" height="20" class="text16 align-up pad10"></td>
            </tr>
            <tr>
              <td colspan="3" width="55%" height="20" class="text16 align-up pad10"></td>
              <td rowspan="3" colspan="1" width="45%" height="20" class="text12 centrado pad10"><br>____________________________________________<br>Nombre, Cédula y Firma del Médico Responsable</td>
            </tr>
            <tr>
              <td colspan="3" width="55%" height="20" class="text16 align-up pad10"></td>
            </tr>
            <tr>
              <td colspan="3" width="55%" height="20" class="text16 align-up pad10"></td>
            </tr>
          </tbody>
        </table>
        <p class="align-right smlText">*Expediente Clínico Conforme a la Norma Oficial Mexicana NOM-004-SSA3-2012</p>
      </div>
    </body>
  </html>
`;
