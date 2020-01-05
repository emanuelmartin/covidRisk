import React, { Component } from 'react';
import QRCode from 'react-native-qrcode-svg';

export default class qrGen extends Component {
  //Simple usage, defaults for all but the value
  render() {
    const logoFromFile = require('./img/LogoVerde.png');
    return (
      <QRCode
        value="{caja: cafe, fecha: 22/09/2019, ID:asd2qfA}"
        logo={logoFromFile}
        color='#646569'
        logoBackgroundColor='white'
      />
    );
  }
}
