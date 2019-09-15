import Parse from 'parse/react-native';
import { ADD_BILL, ADD_BILL_SUCCES, ADD_BILL_FAIL, ADD_RESTART_STATE } from './types';

export const addBill = ({ patient, bill }) => {
    return async (dispatch) => {
      dispatch({ type: ADD_BILL });

      const parseObject = Parse.Object.extend('Bill');
      const cuenta = new parseObject();

      const pacientPointer = {
        __type: 'Pointer',
        className: 'Patient',
        objectId: patient
      };

      cuenta.set('Paciente', pacientPointer);
      cuenta.set('Cuenta', bill);
      cuenta.set('Pagada', false);
      cuenta.set('Abono', 0);
      
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
