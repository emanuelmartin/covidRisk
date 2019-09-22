import {
  ADD_BILL,
  ADD_BILL_SUCCES,
  ADD_BILL_FAIL,
  ADD_RESTART_STATE,
  PAYMENT,
  PAYMENT_SUCCES,
  PAYMENT_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  succesBill: false,
  succesPay: false
};


export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case ADD_BILL:
      return { ...state, loading: true };
    case ADD_BILL_SUCCES:
      return { ...state, loading: false, succesBill: true };
    case ADD_BILL_FAIL:
      return { ...state, loading: false, error: 'Error al añadir cuenta' };
    case PAYMENT:
      return { ...state, loading: true };
    case PAYMENT_SUCCES:
      return { ...state, loading: false, succesPay: true };
    case PAYMENT_FAIL:
      return { ...state, loading: false, error: 'Pago no pudo ser procesado' };
    case ADD_RESTART_STATE:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
