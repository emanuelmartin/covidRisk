import { logoCompleto } from './logoCompleto';

export let registroIngresoEgreso = `
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
        .smlText {
          font-size:12px;
        }
        img {
            width: 100;
            max-width: 500px;
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
        .container{
          border: 5px solid;
        }
        .font12{
          font-size: 12px;
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
      </style>
    </head>
    <body>
      <div></div>
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
        <div class="centrado white">**************</div>
        <div class="centrado">
           <b class="bigText">REGISTRO DE INGRESO Y EGRESO HOSPITALARIO</b>
        </div>
        <div class="container">
          <div class="centrado midText">DATOS DE INGRESO DEL PACIENTE</div>
          <p class="align-right datos1"><b>N° de Expediente:</b> _______________</p>
          <p class="align-left datos"><b>Fecha de Ingreso:</b> _______/_______/_______<b class="white smlText">*********</b><b>Hora de Ingreso:</b> ________________________</p>
          <p class="align-left sml"><b class="white">********************</b>Día<b class="white">*******</b>Mes<b class="white">******</b>Año</p>
          <p class="align-left datos"><b>Nombre:</b> ________________________/________________________/________________________</p>
          <p class="align-left sml"><b class="white">*********************</b>Nombre(s)<b class="white">********************</b>Apellido Paterno<b class="white">******************</b>Apellido Materno</p>
          <p class="align-left datos"><b>Edad:</b> ________________<b class="white smlText">***</b><b>Ocupación:</b> __________________<b class="white smlText">***</b><b>Estado Civil:</b> _________________</p>
          <p class="align-left datos"><b>Escolaridad:</b> ______________<b class="white smlText">***</b><b>Lugar y Fecha de Nacimiento:</b> ______________________________</p>
          <p class="align-left datos"><b>Derivado por el Médico:</b> ______________________<b class="white smlText">*</b><b>Paciente esporádico:</b> _____<b class="white smlText">*</b><b>Parte Médico:</b><a class="font12"> Si</a>__<a class="font12"> No</a>__</p>
          <p class="align-left datos"><b>Derechohabiente de:</b> _______________<b class="white smlText">***</b><b>(Aseguradora) ¿Cuál?:</b> ____________________________</p>
          <p class="align-left datos"><b>Domicilio:</b> ____________________<b class="white smlText">**</b><b>Municipio:</b> _________________<b class="white smlText">**</b><b>Estado:</b> ________________</p>
          <p class="align-left datos"><b>Colonia:</b> __________________________<b class="white smlText">**</b><b>CP:</b> ____________<b class="white smlText">**</b><b>Teléfono:</b> _____________________</p>
          <p class="align-left datos"><b>Nombre del Esposo:</b> ________________________________________________________________</p>
          <p class="align-left datos"><b>Nombre de la Madre (si es menor):</b> ____________________________________________________</p>
          <p class="align-left datos"><b>Nombre del Padre (si es menor):</b> ______________________________________________________</p>
          <p class="align-left datos"><b>Servicio al que ingresa:</b> _________________________<b class="white smlText">***</b><b>Habitación N°:</b> _____________________<br class="datos"></p>
          <p class="align-left datos"><b>Impresión Diagnóstica:</b> _____________________________________________________________</p>
          <p class="align-left datos"><b class="white smlText">************************</b> _____________________________________________________________</p>
          <p class="centrado datos1">__________________________________________<br><b>Nombre y Firma / Huella del Paciente o Titular</b></p>
        </div>
        <div class="centrado white">**************</div>
        <div class="centrado midText">FAMILIAR RESPONSABLE</div>
        <p class="align-left datos2"><b>Nombre:</b> _______________________________________<b class="white smlText">***</b><b>Relación:</b> ____________________</p>
        <p class="align-left datos2"><b>Domicilio:</b> ______________________________________<b class="white smlText">***</b><b>Teléfono:</b> ____________________</p>
        <p class="centrado datos1">________________________________<br><b>Firma o huella digital</b></p>
        <div class="container">
          <div class="centrado midText">DATOS AL EGRESO DEL PACIENTE</div>
          <p class="align-left datos"><b>Fecha de Egreso:</b> _______/_______/_______<b class="white smlText">*****</b><b>Motivo del Egreso:</b> ____________________________</p>
          <p class="align-left sml"><b class="white">**********************</b>Día<b class="white">*******</b>Mes<b class="white">******</b>Año</p>
          <p class="align-left datos"><b>Cirugía:</b><a class="font12"> (Si) (No) </a><b class="white smlText">****</b><b>Corta Estancia:</b><a class="font12"> (Si) (No)</a><b class="white smlText">******</b><b>Tipo de cirguía:</b> _______________________________</p>
          <p class="align-left datos"><b>Re-intervención quirúrgica:</b><a class="font12"> (Si) (No) </a><b class="white smlText">******</b><b>Tipo de cirguía:</b> _____________________________________</p>
          <p class="align-left datos"><b>Infección Hospitalaria:</b><a class="font12"> (Si) (No) </a><b class="white smlText">********</b><b>Tipo de infección:</b> _____________________________________</p>
          <p class="align-left datos"><b>Diagnóstico de Egreso:</b><b class="white smlText">**</b><b>Principal:</b> _________________________________________<b class="white smlText">**</b><b>CIE-10</b><b class="white smlText">**</b>______</p>
          <p class="align-left datos"><b class="white smlText">*************************</b><b>Secundario:</b> _______________________________________<b class="white smlText">**</b><b>CIE-10</b><b class="white smlText">**</b>______</p>
          <p class="align-left datos"><b>Servicio de egreso:</b> ___________________________</p>
          <p class="centrado datos1">____________________________________________<br><b>Nombre, Cédula y Firma del Médico a cargo del Egreso</b></p>
        </div>
      </div>
    </body>
  </html>
`;
