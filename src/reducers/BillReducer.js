import { ADD_BILL, ADD_BILL_SUCCES, ADD_BILL_FAIL, ADD_RESTART_STATE } from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  succes: false
};


export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case ADD_BILL:
      return { ...state, loading: true };
    case ADD_BILL_SUCCES:
      return { ...state, loading: false, succes: true };
    case ADD_BILL_FAIL:
      return { ...state, loading: false, error: 'Cannot update bill' };
    case ADD_RESTART_STATE:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
