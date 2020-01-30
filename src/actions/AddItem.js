import Parse from 'parse/react-native';

import {
  ITEM_CHANGED,
  ADD_ITEM_SUCCES,
  ADD_ITEM_FAIL,
  ADD_ITEM,
  ITEM_ALREADY_EXIST,
  CODE_ALREADY_EXIST,
  INVENTORY_REQUEST,
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCES,
  UPDATE_ITEM_FAIL,
  ITEM_NOT_EXIST,
  SET_ITEM_CODE,
  ACCEPT_ITEM_ADDED
} from './types';

export const itemChanged = ({ variable, text }) => {
  return async (dispatch) => {
    dispatch({
    type: ITEM_CHANGED,
    variable,
    payload: text });
  }
};

export const setItemCode = (codeBar, codeType) => ({
    type: SET_ITEM_CODE,
    payload: { codeBar, codeType }
  });

export const addItem = ({
  codigo,
  tipoCodigo,
  nombre,
  formula,
  laboratorio,
  presentacion,
  contenido,
  stock,
  precioPublico,
  precioPaciente,
  precioSeguro,
  iva,
  proveedor,
  costo,
  clave_SAT,
  tipo,
  incluye,
  codigoProveedor,
  umc,
  umv,
  cantidadUMC
}) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM });
    console.log('tipo', tipo);
    let exist = false;
    const Item = Parse.Object.extend('Inventario');
    const checkItem = new Parse.Query(Item);

    if ((typeof codigo !== 'undefined' && typeof tipoCodigo !== 'undefined') &&
        (codigo !== '' && tipoCodigo !== '')) {
      checkItem.equalTo('codigo', codigo);
      const results = await checkItem.find();

      // Do something with the returned Parse.Object values
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        if (object.get('tipoCodigo') === tipoCodigo) {
          dispatch({ type: CODE_ALREADY_EXIST });
          exist = true;
        }
      }
    } else {
      checkItem.equalTo('nombre', nombre.toString());
      const results = await checkItem.find();
      // Do something with the returned Parse.Object values
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        if (object.get('tipo') === tipo.toString()) {
          dispatch({ type: ITEM_ALREADY_EXIST });
          exist = true;
        }
      }
    }

    if (!exist) {
      const item = new Item();
      item.set('codigo', codigo);
      item.set('nombre', nombre);
      item.set('formula', formula);
      item.set('laboratorio', laboratorio);
      item.set('presentacion', presentacion);
      item.set('contenido', contenido);
      item.set('codigoProveedor', codigoProveedor);
      item.set('umc', umc);
      item.set('umv', umv);
      item.set('cantidadUMC', cantidadUMC);

      costo = (parseFloat(costo) / parseInt(cantidadUMC));

      if (stock === '') {
        item.set('0');
      } else { item.set('stock', parseInt(stock, 10)); }
      item.set('tipoCodigo', tipoCodigo);
      item.set('tipo', tipo);

      if (tipo !== 'cafeteria') {
        item.set('precioPublico', parseFloat(precioPublico));
        item.set('precioPaciente', parseFloat(precioPaciente));
        item.set('precioSeguro', parseFloat(precioSeguro));
      } else {
        item.set('precioPublico', parseFloat(precioPublico.toFixed(2)));
        item.set('precioPaciente', parseFloat(precioPublico.toFixed(2)));
        item.set('precioSeguro', parseFloat(precioPublico.toFixed(2)));
      }
      if (tipo === 'paquete quirúrgico') {
        item.set('incluye', incluye);
      }
      item.set('iva', iva);
      item.set('proveedor', proveedor);
      if (costo === '') {
        item.set('0');
      } else { item.set('costo', parseInt(costo, 10)); }
      item.set('clave_SAT', clave_SAT);
      item.save()
        .then(
        (result) => {
          dispatch({ type: ADD_ITEM_SUCCES });
          console.log('Comment created', result);
        },
        (error) => {
          dispatch({ type: ADD_ITEM_FAIL });
          console.error('Error while creating Comment: ', error);
        }
      );
    }
  };
};

export const addService = ({
  nombre,
  precioSeguro,
  precioPublico,
  iva,
  tipo,
  tipoCobro
}) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM });
    console.log('tipo', tipo);
    let exist = false;
    const Item = Parse.Object.extend('Servicios');
    const checkItem = new Parse.Query(Item);

    checkItem.equalTo('nombre', nombre.toString());
    const results = await checkItem.find();
    // Do something with the returned Parse.Object values
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      if (object.get('tipo') === tipo.toString()) {
        dispatch({ type: ITEM_ALREADY_EXIST });
        exist = true;
      }
    }

    if (!exist) {
      const item = new Item();
      item.set('nombre', nombre);
      item.set('precioSeguro', parseFloat(precioSeguro));
      item.set('precioPublico', parseFloat(precioPublico));
      item.set('iva', parseInt(iva,10));
      item.set('tipo', tipo);
      item.set('tipoCobro', tipoCobro);

      item.save()
        .then(
        (result) => {
          dispatch({ type: ADD_ITEM_SUCCES });
          console.log('Comment created', result);
        },
        (error) => {
          dispatch({ type: ADD_ITEM_FAIL });
          console.error('Error while creating Comment: ', error);
        }
      );
    }
  };
};

export const acceptItemAded = () => ({
  type: ACCEPT_ITEM_ADDED
});

export const inventoryRequest = (data) => ({
    type: INVENTORY_REQUEST,
    payload: data
  });

export const updateItem = ({ item, variable, value }) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_ITEM });

    const Item = Parse.Object.extend('Inventario');
    const checkItem = new Parse.Query(Item);
    let index = -1;

    if ((typeof item.codigo !== 'undefined' && typeof item.tipoCodigo !== 'undefined') &&
        (item.codigo !== '' && item.tipoCodigo !== '')) {
      checkItem.equalTo('codigo', item.codigo.toString());
      const results = await checkItem.find();

      // Do something with the returned Parse.Object values
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        if (object.get('tipoCodigo') === item.tipoCodigo.toString()) {
          index = i;
        }
      }
      if (index !== -1) {
        results[index].set(variable, parseFloat(value));
        results[index].save()
          .then(
          () => {
            dispatch({ type: UPDATE_ITEM_SUCCES });
          },
          () => {
            dispatch({ type: UPDATE_ITEM_FAIL });
          }
        );
      } else {
        dispatch({ type: ITEM_NOT_EXIST });
      }
    } else {
      checkItem.equalTo('nombre', item.nombre.toString());
      const results = await checkItem.find();
      // Do something with the returned Parse.Object values
      for (let i = 0; i < results.length; i++) {
        const object = results[i];
        if (object.get('tipo') === item.tipo.toString()) {
          index = i;
        }
      }
      if (index !== -1) {
        results[index].set(variable, parseInt(value, 10));
        results[index].save()
          .then(
          (result) => {
            dispatch({ type: UPDATE_ITEM_SUCCES });
            console.log('Comment created', result);
          },
          (error) => {
            dispatch({ type: UPDATE_ITEM_FAIL });
            console.error('Error while creating Comment: ', error);
          }
        );
      } else {
        dispatch({ type: ITEM_NOT_EXIST });
      }
    }
  };
};
