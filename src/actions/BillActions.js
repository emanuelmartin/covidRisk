import Parse from 'parse/react-native';
import {
  ADD_BILL,
  ADD_BILL_SUCCES,
  ADD_BILL_FAIL,
  ADD_RESTART_STATE,
  PAYMENT,
  PAYMENT_SUCCES,
  PAYMENT_FAIL,
  CORTE,
  CORTE_SUCCESS
} from './types';

export const addBill = ({
  patient,
  ingreso,
  bill,
  total,
  pendienteFarmacia = false,
  pendienteLaboratorio = false,
  pendienteImagen = false,
  pendienteRehabilitacion = false,
  pacienteExterno,
  medicoSolicitante,
  diagnosticoProbable,
  sellType
}) => {
    return async (dispatch) => {
      dispatch({ type: ADD_BILL });

      const parseObject = Parse.Object.extend('Cuenta');
      const cuenta = new parseObject();
      const autor = Parse.User.current();

      const pacientePointer = {
        __type: 'Pointer',
        className: '_User',
        objectId: patient
      };

      const ingresoPointer = {
        __type: 'Pointer',
        className: 'IngresosActivos',
        objectId: ingreso
      };

      cuenta.set('paciente', pacientePointer)
      cuenta.set('ingresoPaciente', ingresoPointer);
      cuenta.set('cuenta', bill);
      cuenta.set('pagada', false);
      cuenta.set('total', total);
      cuenta.set('abonado', 0);
      cuenta.set('autor', autor);
      cuenta.set('pendienteFarmacia', pendienteFarmacia);
      cuenta.set('pendienteLaboratorio', pendienteLaboratorio);
      cuenta.set('pendienteImagen', pendienteImagen);
      cuenta.set('pendienteRehabilitacion', pendienteRehabilitacion);

      cuenta.save().then(
        (result) => {
          dispatch({ type: ADD_BILL_SUCCES });
          console.log('Bill created', result);
        },
        (error) => {
          dispatch({ type: ADD_BILL_FAIL });
          console.error('Error while creating Bill: ', error);
        }
      );
    };
  };

export const clearBill = () => ({
  type: ADD_RESTART_STATE,
});

export const payment = ({
  pago,
  lista,
  recibido,
  tipoPago,
  tipoVenta,
  pendienteFarmacia = false,
  pendienteLaboratorio = false,
  pendienteImagen = false,
  pendienteRehabilitacion = false,
  pacienteExterno,
  medicoSolicitante,
  diagnosticoProbable,
  sellType,
  paciente,
  bill

}) => {
  return async (dispatch) => {
    dispatch({ type: PAYMENT });
    console.log('paciente',paciente)
    const autor = Parse.User.current();
    const date = new Date();
    const dia = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const caja = lista.Type;
    const { farmacia } = lista;

    let fol = 0;
    let folio = caja.charAt(0).toUpperCase() + '-';
    let folioResult = null;
    const folioObject = Parse.Object.extend('Caja');
    const folioQuery = new Parse.Query(folioObject);
    folioQuery.equalTo('nombre', caja);
    folioQuery.find().then(result => {
      folioResult = result;
      fol = (result[0].toJSON()).folio;
      if (fol < 9) {
        folio += '00000' + (fol + 1);
      } else if (fol < 99) {
        folio += '0000' + (fol + 1);
      } else if (fol < 999) {
        folio += '000' + (fol + 1);
      } else if (fol < 9999) {
        folio += '00' + (fol + 1);
      } else if (fol < 99999) {
        folio += '0' + (fol + 1);
      } else if (fol < 999999) {
        folio += (fol + 1);
      }
    }).then(() => {
      console.log('Paciente', pacienteExterno)
      const parseObject = Parse.Object.extend('Ventas');
      const venta = new parseObject();

        console.log('Medico', medicoSolicitante)

          const pacientePointer = {
          __type: 'Pointer',
          className: '_User',
          objectId: paciente.objectId
        };

        pacienteExterno = true;

        const medicoPointer = {
          __type: 'Pointer',
          className: '_User',
          objectId: medicoSolicitante.objectId
        };

      console.log('Paciente', paciente)

      venta.set('medicoSolicitante', medicoPointer)
      venta.set('paciente', pacientePointer);
      venta.set('cuenta', lista);
      venta.set('subtotal', pago.subtotal);
      venta.set('iva', pago.iva);
      venta.set('abono', 0);
      venta.set('folio', folio);
      venta.set('tipoPago', tipoPago);
      venta.set('tipoVenta', tipoVenta);
      venta.set('autor', autor);
      venta.set('pendienteFarmacia', pendienteFarmacia);
      venta.set('pendienteLaboratorio', pendienteLaboratorio);
      venta.set('pendienteImagen', pendienteImagen);
      venta.set('pendienteRehabilitacion', pendienteRehabilitacion);

      console.log('Venta', venta)
      dispatch({ type: ADD_BILL });

      const parseObject2 = Parse.Object.extend('Cuenta');
      const cuenta = new parseObject2();
      const autor = Parse.User.current();

      let pacienteExterno = false;
      if(sellType === 'Venta al público') {
        const pacientePointer = {
          __type: 'Pointer',
          className: '_User',
          objectId: paciente.objectId
        };

        pacienteExterno = true;

        const medicoPointer = {
          __type: 'Pointer',
          className: '_User',
          objectId: medicoSolicitante.objectId
        };

        cuenta.set('paciente', pacientePointer)
        cuenta.set('medicoSolicitante', medicoPointer)

      } else {
      const pacientePointer = {
        __type: 'Pointer',
        className: '_User',
        objectId: patient
      };
      cuenta.set('paciente', pacientePointer)
    }

      cuenta.set('cuenta', lista);
      cuenta.set('pagada', true);
      cuenta.set('abonado', 0);
      cuenta.set('autor', autor);
      cuenta.set('pendienteFarmacia', pendienteFarmacia);
      cuenta.set('pendienteLaboratorio', pendienteLaboratorio);
      cuenta.set('pendienteImagen', pendienteImagen);
      cuenta.set('pendienteRehabilitacion', pendienteRehabilitacion);
      cuenta.set('pacienteExterno', pacienteExterno)

      cuenta.save();

      venta.save().then((result) => {
        folioQuery.get(folioResult[0].id.toString()).then((resp) => {
          resp.set('folio', fol + 1);
          resp.increment('efectivo', (pago.subtotal + pago.iva));
          resp.save().then(() => {
            const objects = [];
            const ParseObject = Parse.Object.extend('Inventario');
            farmacia.forEach((producto) => {
              const ParseProduct = new ParseObject();
              ParseProduct.set('objectId', producto.objectId);
              ParseProduct.increment('stock', -(parseInt(producto.cantidad, 10)));
              objects.push(ParseProduct);
            });
            Parse.Object.saveAll(objects).then(() => {
              const info = {
                fecha: { dia, hora },
                folio,
                caja,
                recibido: parseFloat(recibido),
                lista
              };
              dispatch({ type: PAYMENT_SUCCES, info });
              dispatch({ type: ADD_BILL_SUCCES });
              console.log('Bill created', result);
            });
          });
        });
      },
      (error) => {
        dispatch({ type: PAYMENT_FAIL });
        console.error('Payment failed: ', error);
        dispatch({ type: ADD_BILL_FAIL });
        console.error('Error while creating Bill: ', error);
      });
  });
};
}

export const partialPayment = (caja, recibido, paciente) => {
  return async (dispatch) => {
    dispatch({ type: PAYMENT });

    const date = new Date();
    const dia = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    let fol = 0;
    let folio = caja.charAt(0).toUpperCase() + '-';
    let folioResult = null;
    const folioObject = Parse.Object.extend('Caja');
    const folioQuery = new Parse.Query(folioObject);
    folioQuery.equalTo('nombre', caja);
    folioQuery.find().then(result => {
      folioResult = result;
      fol = (result[0].toJSON()).folio;
      if (fol < 9) {
        folio += '00000' + (fol + 1);
      } else if (fol < 99) {
        folio += '0000' + (fol + 1);
      } else if (fol < 999) {
        folio += '000' + (fol + 1);
      } else if (fol < 9999) {
        folio += '00' + (fol + 1);
      } else if (fol < 99999) {
        folio += '0' + (fol + 1);
      } else if (fol < 999999) {
        folio += (fol + 1);
      }
    }).then(() => {
      const parseObject = Parse.Object.extend('Ventas');
      const venta = new parseObject();

      venta.set('productos', []);
      venta.set('subtotal', 0);
      venta.set('iva', 0);
      venta.set('abono', recibido);
      venta.set('folio', folio);
      venta.set('tipoPago', 'efectivo');
      venta.set('tipoVenta', 'abonoCuenta');
      venta.save();
    }).then(() => {
        folioQuery.get(folioResult[0].id.toString()).then((resp) => {
          resp.set('folio', fol + 1);
          resp.increment('efectivo', recibido);
          resp.save().then(() => {
            const info = {
              fecha: { dia, hora },
              folio,
              caja,
              recibido: parseFloat(recibido),
              ingreso: paciente
            };
            dispatch({ type: PAYMENT_SUCCES, info });
          });
        });
      },
      (error) => {
        dispatch({ type: PAYMENT_FAIL });
        console.error('Payment failed: ', error);
      });
  };
};

export const corte = (caja, retiro) => {
  const user = Parse.User.current();
  let cajaObject = null;

  console.log('retiro', retiro);
  return async (dispatch) => {
    dispatch({ type: CORTE });

    const ParseObject = Parse.Object.extend('Caja');
    const query = new Parse.Query(ParseObject);
    query.equalTo('nombre', caja);
    query.find().then(result => {
      cajaObject = result;
      query.get(result[0].id.toString()).then((query1) => {
        query1.increment('efectivo', -(retiro));
        query1.save();
      });
    }).then(() => {
      const pointerUsuario = {
        __type: 'Pointer',
       className: '_User',
       objectId: user.id
      };

      const pointerCaja = {
        __type: 'Pointer',
       className: 'Caja',
       objectId: cajaObject[0].id
      };

      const ParseCorte = Parse.Object.extend('CorteCaja');
      const Corte = new ParseCorte();
      Corte.set('caja', pointerCaja);
      Corte.set('usuario', pointerUsuario);
      Corte.set('retiro', retiro);
      Corte.save();
    }).then(() => {
        dispatch({ type: CORTE_SUCCESS });
    });
  };
};
