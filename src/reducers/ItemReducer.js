import {
  ITEM_CHANGED,
  ADD_ITEM_SUCCES,
  ADD_ITEM_FAIL,
  ADD_ITEM,
  ITEM_ALREADY_EXIST,
  CODE_ALREADY_EXIST,
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCES,
  UPDATE_ITEM_FAIL,
  ITEM_NOT_EXIST,
  SET_ITEM_CODE,
  ACCEPT_ITEM_ADDED
 } from '../actions/types';

const INITIAL_STATE = {
  codigo: '',
  tipoCodigo: '',
  nombre: '',
  formula: '',
  laboratorio: '',
  presentacion: '',
  contenido: '',
  stock: '',
  precioPublico: '',
  precioPaciente: '',
  precioSeguro: '',
  iva: '',
  proveedor: '',
  costo: '',
  clave_SAT: '',
  tipo: '',
  tipoCobro: '',
  error: '',
  success: false,
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case ITEM_CHANGED:
      return { ...state, [action.variable]: action.payload };
    case ADD_ITEM:
      return { ...state, ...INITIAL_STATE, loading: true };
    case ADD_ITEM_SUCCES:
      return { ...state, ...INITIAL_STATE, loading: false, success: true };
    case ACCEPT_ITEM_ADDED:
      return { ...state, success: false };
    case ADD_ITEM_FAIL:
      return { ...state, loading: false, error: 'Intente de nuevo' };
    case ITEM_ALREADY_EXIST:
      return { ...state, loading: false, error: 'Producto duplicado' };
    case CODE_ALREADY_EXIST:
      return { ...state, loading: false, error: 'Código duplicado' };
    case UPDATE_ITEM:
      return { ...state, loading: true };
    case UPDATE_ITEM_SUCCES:
      return { ...state, loading: false };
    case UPDATE_ITEM_FAIL:
      return { ...state, loading: false, error: 'Intente de nuevo' };
    case ITEM_NOT_EXIST:
      return { ...state, loading: false, error: 'Producto no existe' };
    case SET_ITEM_CODE:
      return { ...state, codigo: action.payload.codeBar, tipoCodigo: action.payload.codeType };
    default:
      return state;
  }
};
