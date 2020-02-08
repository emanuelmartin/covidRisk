import { logoCompleto } from './logoCompleto';

export const indicacionesMedicas = `
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
        .text14 {
          font-size:14px;
        }
        .text10 {
          font-size:10px;
        }
        .smlText {
          font-size:12px;
        }
        img {
            width: 100%;
  					max-width: 100%;
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
          font-size: 15px;
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
          <img src="data:image/png;base64,${logoCompleto}" alt="Logotipo" style="width:auto;height:90px;"/>
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
        <div class="centrado"><b class="bigText">INDICACIONES MÉDICAS</b></div>
        <div class="container">
          <p class="align-left datos"><b>Nombre:</b> _________________________________________________ <b>Edad:</b> _________<b> Sexo:</b> _________</p>
          <p class="align-left datos"><b>Fecha:</b> ___/___/___<b class="white smlText">*</b><b>Hora:</b> ______<b class="white smlText">*</b><b>Servicio:</b> ______________<b class="white smlText">*</b><b>Habitación No.</b> ________<b class="white smlText">*</b><b>N° Exp.</b> ________</p>
        </div>
        <div class="centrado white">*</div>
        <table class="fill bigText">
          <thead>
            <tr bgcolor="#63C0B9" class="white" height="30">
              <th colspan="3" class="text14">Especificar Actividad, Procedimientos, Medicamentos, Dosis, Vía de Administración y Periodicidad<br>
                  Nombre, Cédula y Firma del Médico</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width="20%" height="25" class="midText centrado">Fecha y Hora</td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
          </tbody>
        </table>
        <div class="centrado white">*</div>
        <p class="align-right smlText">*Expediente Clínico Conforme a la Norma Oficial Mexicana NOM-004-SSA3-2012</p>
      </div>

      <div class="row">
  			<div class="column1 align-left" style="background-color:#fff;">
          <img src="data:image/png;base64,${logoCompleto}" alt="Logotipo" style="width:auto;height:90px;"/>
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
        <div class="centrado"><b class="bigText">INDICACIONES MÉDICAS</b></div>
        <div class="container">
          <p class="align-left datos"><b>Nombre:</b> _____________________________________________ <b>Edad:</b> _________<b> Sexo:</b> _________</p>
          <p class="align-left datos"><b>Fecha:</b> ___/___/___<b class="white smlText">*</b><b>Hora:</b> ______<b class="white smlText">*</b><b>Servicio:</b> ______________<b class="white smlText">*</b><b>Habitación No.</b> ________<b class="white smlText">*</b><b>N° Exp.</b> ________</p>
        </div>
        <div class="centrado white">*</div>
        <table class="fill bigText">
          <thead>
            <tr bgcolor="#63C0B9" class="white" height="30">
              <th colspan="3" class="text14">Especificar Actividad, Procedimientos, Medicamentos, Dosis, Vía de Administración y Periodicidad<br>
                  Nombre, Cédula y Firma del Médico</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td width="20%" height="25" class="midText centrado">Fecha y Hora</td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
            <tr>
              <td width="20%" height="25" class="midText centrado"></td>
              <td colspan="2" width="80%" height="25" class="pad10"></td>
            </tr>
          </tbody>
        </table>
        <div class="centrado white">*</div>
        <p class="align-right smlText">*Expediente Clínico Conforme a la Norma Oficial Mexicana NOM-004-SSA3-2012</p>
      </div>
    </body>
  </html>
`;
