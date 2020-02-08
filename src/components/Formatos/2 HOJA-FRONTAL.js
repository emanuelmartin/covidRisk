import { logoCompleto } from './logoCompleto';

export const hojaFrontal = `
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
            max-width: 500px;
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
          font-size: 15px;
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
        <p class="centrado hrslColor">
           <b class="bigText">HOJA FRONTAL DEL EXPEDIENTE CLÍNICO</b>
        </p>
        <p class="align-left datos">
           <b>NOMBRE DEL PACIENTE:</b> _______________________________________________________________<br class="datos">
           <b>EDAD:</b>_____________________________________ <b>SEXO:</b>___________________________________<br class="datos">
           <b>HABITACION:</b>______________ <b>N° DE EXPEDIENTE:</b>______________ <b>N° DE PACIENTE:</b>______________<br class="datos">
           <b>DIAGNOSTICO DE INGRESO:</b> ____________________________________________________________<br class="datos">
           <b>TRATAMIENTO PROPUESTO:</b> ____________________________________________________________<br class="datos">
           <b>MEDICO TRATANTE:</b> __________________________________________________________________
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
