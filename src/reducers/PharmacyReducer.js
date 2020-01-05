import {
  PHARMACY_LOADING,
  PHARMACY_SUCCESS,
  PHARMACY_ERROR,
  PHARMACY_RESTART
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  error: '',
  success: false
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case PHARMACY_LOADING:
      return { ...state, loading: true };
    case PHARMACY_SUCCESS:
      return { ...state, loading: false, succesBill: true };
    case PHARMACY_ERROR:
      return { ...state, loading: false, error: 'Error: Intente nuevamente.' };
    case PHARMACY_RESTART:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
