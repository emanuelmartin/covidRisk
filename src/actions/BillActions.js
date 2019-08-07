import Parse from 'parse/react-native';
import { ADD_BILL } from './types';

export const addBill = ({ patient, bill }) => {
    return async (dispatch) => {
      dispatch({ type: ADD_BILL });

      const parseObject = Parse.Object.extend('Bill');
      const cuenta = new parseObject();
      cuenta.set('Paciente', patient);
      cuenta.set('Cuenta', bill);
      cuenta.save().then(
      (result) => {
        //dispatch({ type: UPDATE_ITEM_SUCCES, print: value });
        console.log('Bill created', result);
      });
    };
  };
