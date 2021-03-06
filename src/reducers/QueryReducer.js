import {
  DB_QUERY,
  DB_QUERY_RESULTS,
  DB_QUERY_NO_RESULTS,
  DB_QUERY_ERROR,
  DB_CLEAN,
  WRITE_SUCCESS,
  DELETE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  text: '',
  Patient: '',
  Proveedor: '',
  User: '',
  Bill: '',
  BancoSangre: '',
  Inventario: '',
  Servicios: '',
  multiQry: '',
  loading: false,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case DB_QUERY:
      return { ...state, text: action.payload, loading: true };
    case DB_QUERY_RESULTS:
      return { ...state, [action.name]: action.payload, loading: false };
    case DB_QUERY_NO_RESULTS:
      return { ...state, [action.name]: 'Failed', loading: false };
    case DB_QUERY_ERROR:
      return { ...state, loading: false, error: action.error };
    case DB_CLEAN:
      return { ...state, ...INITIAL_STATE };
    case WRITE_SUCCESS: {
      console.log(action.payload);
      return { ...state, [action.name]: action.payload }; }
      case DELETE_SUCCESS: {
        console.log(action);
        return { ...state }; }
    default:
      return { ...state, ...INITIAL_STATE };
    }
  };
