import {
  SIGNUPFORM_UPDATE,
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  lastName1: '',
  lastName2: '',
  names: '',
  phone: '',
  shift: '',
  curp: '',
  birthState: '',
  birthday: '',
  cedule: '',
  nationality: '',
  sex: '',
  prof: '',
  edited: false,
  valid: false,
  username: '',
  password: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUPFORM_UPDATE:
      return { ...state, [action.field]: action.payload };
    case USER_CREATE:
        return { ...state, loading: true, error: '' };
    default:
      return state;
    case USER_CREATE_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, loggedIn: true, loading: false };
    case USER_CREATE_FAIL:
      return { ...state, error: 'Error al iniciar sesión', password: '', loading: false };
  }
};
