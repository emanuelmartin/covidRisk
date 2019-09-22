import {
  CODE_CHANGED,
  NAME_CHANGED,
  FORMULA_CHANGED,
  LABORATORY_CHANGED,
  PRESENTATION_CHANGED,
  CONTENT_CHANGED,
  STOCK_CHANGED,
  PUBLIC_PRICE_CHANGED,
  PACIENT_PRICE_CHANGED,
  ASSURANCE_PRICE_CHANGED,
  ADD_ITEM_SUCCES,
  ADD_ITEM_FAIL,
  ADD_ITEM,
  ITEM_ALREADY_EXIST,
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCES,
  UPDATE_ITEM_FAIL,
  ITEM_NOT_EXIST,
  SET_ITEM_CODE
 } from '../actions/types';

const INITIAL_STATE = {
  code: '',
  codeType: '',
  name: '',
  formula: '',
  laboratory: '',
  presentation: '',
  content: '',
  stock: '',
  publicPrice: '',
  pacientPrice: '',
  assurancePrice: '',
  error: '',
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case CODE_CHANGED:
      return { ...state, code: action.payload };
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    case FORMULA_CHANGED:
      return { ...state, formula: action.payload };
    case LABORATORY_CHANGED:
      return { ...state, laboratory: action.payload };
    case PRESENTATION_CHANGED:
      return { ...state, presentation: action.payload };
    case CONTENT_CHANGED:
      return { ...state, content: action.payload };
    case STOCK_CHANGED:
      return { ...state, stock: action.payload };
    case PUBLIC_PRICE_CHANGED:
      return { ...state, publicPrice: action.payload };
    case PACIENT_PRICE_CHANGED:
      return { ...state, pacientPrice: action.payload };
    case ASSURANCE_PRICE_CHANGED:
      return { ...state, assurancePrice: action.payload };
    case ADD_ITEM:
      return { ...state, ...INITIAL_STATE, loading: true };
    case ADD_ITEM_SUCCES:
      return { ...state, ...INITIAL_STATE, loading: false };
    case ADD_ITEM_FAIL:
      return { ...state, loading: false, error: 'Intente de nuevo' };
    case ITEM_ALREADY_EXIST:
      return { ...state, loading: false, error: 'Producto ya existe' };
    case UPDATE_ITEM:
      return { ...state, loading: true, error: 'UPDATE_ITEM' };
    case UPDATE_ITEM_SUCCES:
      return { ...state, loading: false, error: action.print };
    case UPDATE_ITEM_FAIL:
      return { ...state, loading: false, error: 'Intente de nuevo' };
    case ITEM_NOT_EXIST:
      return { ...state, loading: false, error: 'Producto no existe' };
    case SET_ITEM_CODE:
      return { ...state, code: action.payload.codeBar, codeType: action.payload.codeType };
    default:
      return state;
  }
};
