import {
  DB_QUERY,
  DB_QUERY_RESULTS,
  DB_CLEAN,
  WRITE_SUCCESS,
  DELETE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  text: '',
  Patient: '',
  User: '',
  Farmacia: '',
  Bill: '',
  BancoSangre: '',
  Cafeteria: '',
  Laboratory: '',
  Rehabilitacion: '',
  Tomografia: '',
  RayosX: ''
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case DB_QUERY:
      return { ...state, text: action.payload };
    case DB_QUERY_RESULTS:
      return { ...state, [action.name]: action.payload };
    case DB_CLEAN:
      return { ...state, ...INITIAL_STATE };
    case WRITE_SUCCESS: {
      console.log(action)
      return { ...state }; }
      case DELETE_SUCCESS: {
        console.log(action)
        return { ...state }; }
    default:
      return { state };
    }
  };
