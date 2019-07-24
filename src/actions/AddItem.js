import Parse from 'parse/react-native';

import {
  CODE_CHANGED,
  NAME_CHANGED,
  PRESENTATION_CHANGED,
  PUBLIC_PRICE_CHANGED,
  PACIENT_PRICE_CHANGED,
  ASSURANCE_PRICE_CHANGED,
  ADD_ITEM_SUCCES,
  ADD_ITEM_FAIL,
  ADD_ITEM,
  ITEM_ALREADY_EXIST,
  INVENTORY_REQUEST
} from './types';

export const codeChanged = (text) => ({
    type: CODE_CHANGED,
    payload: text
  });

export const nameChanged = (text) => ({
    type: NAME_CHANGED,
    payload: text
  });

export const presentationChanged = (text) => ({
    type: PRESENTATION_CHANGED,
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

export const addItem = ({
  code,
  name,
  presentation,
  publicPrice,
  pacientPrice,
  assurancePrice
}) => {
  return async (dispatch) => {
    dispatch({ type: ADD_ITEM });

    let exist = false;

    const Item = Parse.Object.extend('Farmacia');
    const checkItem = new Parse.Query(Item);
    checkItem.equalTo('name', name);
    const results = await checkItem.find();
    //const results = checkItem.find();

    // Do something with the returned Parse.Object values
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      if (object.get('presentation') === presentation) {
        dispatch({ type: ITEM_ALREADY_EXIST });
        exist = true;
      }
    }

    if (!exist) {
      const item = new Item();
      item.set('code', code);
      item.set('name', name);
      item.set('presentation', presentation);
      item.set('publicPrice', publicPrice);
      item.set('pacientPrice', pacientPrice);
      item.set('assurancePrice', assurancePrice);
      item.set('stock', 0);
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

export const inventoryRequest = (data) => ({
    type: INVENTORY_REQUEST,
    payload: data
  });
