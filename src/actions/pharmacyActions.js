import Parse from 'parse/react-native';
import {
  PHARMACY_LOADING,
  PHARMACY_SUCCESS,
  PHARMACY_ERROR,
  PHARMACY_RESTART
} from './types';

export const restart = () => {
  return async (dispatch) => {
    dispatch({ type: PHARMACY_RESTART });
  };
};

export const devolver = ({ paciente, ingreso, productos }) => {
  return async (dispatch) => {
    dispatch({ type: PHARMACY_LOADING });
    let pacientePointer = null;
    let ingresoPointer = null;
    if (paciente !== false) {
      pacientePointer = {
        __type: 'Pointer',
        className: 'Patient',
        objectId: paciente.objectId
      };
      ingresoPointer = {
        __type: 'Pointer',
        className: 'IngresosActivos',
        objectId: ingreso
      };
    }

    const objects = [];
    const ParseInventario = Parse.Object.extend('Inventario');
    const parseObject = Parse.Object.extend('Cuenta');
    const cuenta = new parseObject();
    const autor = Parse.User.current();

    let total = 0;
    let cant = 0;
    productos.forEach((producto) => {
      if (producto.stock !== undefined) {
        const ParseProduct = new ParseInventario();
        ParseProduct.set('objectId', producto.objectId);
        ParseProduct.increment('stock', (parseInt(producto.cantidad, 10)));
        objects.push(ParseProduct);
      }

      if (isNaN(parseFloat(producto.cantidad)) || producto.cantidad <= 0) {
        cant = 0;
      } else { cant = producto.cantidad; }
      total = producto.precioNeto * (1 + (producto.iva / 100)) * cant;
    });

    if (pacientePointer !== null) {
      cuenta.set('paciente', pacientePointer);
      cuenta.set('ingresoPaciente', ingresoPointer);
      cuenta.set('cuenta', { Type: 'devolucion', farmacia: productos });
      cuenta.set('pagada', false);
      cuenta.set('abonado', 0);
      cuenta.set('estado', { devolucion: 'abonado' });
      cuenta.set('finalizado', true);
      cuenta.set('autor', autor);
      objects.push(cuenta);
    }

    Parse.Object.saveAll(objects).then(() => {
      dispatch({ type: PHARMACY_SUCCESS });
    });
  };
};

export const consumoInterno = ({ area, productos }) => {
  return async (dispatch) => {
    dispatch({ type: PHARMACY_LOADING });

    const objects = [];
    const ParseInventario = Parse.Object.extend('Inventario');
    const parseObject = Parse.Object.extend('ConsumoInterno');
    const cuenta = new parseObject();
    const autor = Parse.User.current();

    productos.forEach((producto) => {
      if (producto.stock !== undefined) {
        const ParseProduct = new ParseInventario();
        ParseProduct.set('objectId', producto.objectId);
        ParseProduct.increment('stock', -(parseInt(producto.cantidad, 10)));
        objects.push(ParseProduct);
      }
    });

    cuenta.set('pedido', { area, farmacia: productos });
    cuenta.set('estado', 'pendiente');
    cuenta.set('finalizado', false);
    cuenta.set('autor', autor);
    objects.push(cuenta);

    Parse.Object.saveAll(objects).then(() => {
      dispatch({ type: PHARMACY_SUCCESS });
    });
  };
};

export const salidaExtraordinaria = ({ motivo, productos }) => {
  return async (dispatch) => {
    dispatch({ type: PHARMACY_LOADING });

    const objects = [];
    const ParseInventario = Parse.Object.extend('Inventario');
    const parseObject = Parse.Object.extend('SalidaExtraordinaria');
    const cuenta = new parseObject();
    const autor = Parse.User.current();

    productos.forEach((producto) => {
      if (producto.stock !== undefined) {
        const ParseProduct = new ParseInventario();
        ParseProduct.set('objectId', producto.objectId);
        ParseProduct.increment('stock', -(parseInt(producto.cantidad, 10)));
        objects.push(ParseProduct);
      }
    });

    cuenta.set('salida', { motivo, farmacia: productos });
    cuenta.set('estado', 'pendiente');
    cuenta.set('finalizado', false);
    cuenta.set('autor', autor);
    objects.push(cuenta);

    Parse.Object.saveAll(objects).then(() => {
      dispatch({ type: PHARMACY_SUCCESS });
    });
  };
};
