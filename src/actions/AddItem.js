import Parse from 'parse/react-native';

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
  INVENTORY_REQUEST,
  UPDATE_ITEM,
  UPDATE_ITEM_SUCCES,
  UPDATE_ITEM_FAIL,
  ITEM_NOT_EXIST,
  SET_ITEM_CODE,
  ACCEPT_ITEM_ADDED
} from './types';

export const codeChanged = (text) => ({
    type: CODE_CHANGED,
    payload: text
  });

export const nameChanged = (text) => ({
    type: NAME_CHANGED,
    payload: text
  });

export const formulaChanged = (text) => ({
    type: FORMULA_CHANGED,
    payload: text
  });

export const laboratoryChanged = (text) => ({
    type: LABORATORY_CHANGED,
    payload: text
  });

export const contentChanged = (text) => ({
    type: CONTENT_CHANGED,
    payload: text
  });

export const presentationChanged = (text) => ({
    type: PRESENTATION_CHANGED,
    payload: text
  });

export const stockChanged = (text) => ({
    type: STOCK_CHANGED,
    payload: text
  });

export const publicPriceChanged = (text) => ({
    type: PUBLIC_PRICE_CHANGED,
    payload: text
  });

export const pacientPriceChanged = (text) => ({
    type: PACIENT_PRICE_CHANGED,
    payload: text
  });

export const assurancePriceChanged = (text) => ({
    type: ASSURANCE_PRICE_CHANGED,
    payload: text
  });

export const setItemCode = (codeBar, codeType) => ({
    type: SET_ITEM_CODE,
    payload: { codeBar, codeType }
  });

export const addItem = ({
  code,
  codeType,
  name,
  formula,
  laboratory,
  presentation,
  content,
  stock,
  publicPrice,
  pacientPrice,
  assurancePrice,
  type
}) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM });

    let exist = false;

    const Item = Parse.Object.extend('Farmacia');
    const checkItem = new Parse.Query(Item);
    checkItem.equalTo('code', code);
    const results = await checkItem.find();

    // Do something with the returned Parse.Object values
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      if (object.get('codeType') === codeType) {
        dispatch({ type: ITEM_ALREADY_EXIST });
        exist = true;
      }
    }

    if (!exist) {
      const item = new Item();
      item.set('code', code);
      item.set('name', name);
      item.set('formula', formula);
      item.set('laboratory', laboratory);
      item.set('presentation', presentation);
      item.set('content', content);
      if (stock === '') {
        item.set('0');
      } else { item.set('stock', parseInt(stock, 10)); }
      item.set('publicPrice', parseInt(publicPrice, 10));
      item.set('pacientPrice', parseInt(pacientPrice, 10));
      item.set('assurancePrice', parseInt(assurancePrice, 10));
      item.set('codeType', codeType);
      item.set('type', type);
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

    let index = -1;

    const Item = Parse.Object.extend('Farmacia');
    const checkItem = new Parse.Query(Item);
    checkItem.equalTo('code', item.code.toString());
    const results = await checkItem.find();

    // Do something with the returned Parse.Object values
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      if (object.get('codeType') === item.codeType.toString()) {
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
  };
};
