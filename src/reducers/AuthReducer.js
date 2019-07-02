import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  ACTIVE_SESSION,
  NO_SESSION,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  loggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, loggedIn: true };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Error al iniciar sesión', password: '', loading: false };
    case ACTIVE_SESSION:
      return { ...state, loggedIn: true, user: action.payload };
    case NO_SESSION:
      return { ...state, loggedIn: false };
    case LOGOUT_USER:
      return { ...state, loading: true, error: '' };
    case LOGOUT_USER_SUCCESS:
      return { ...state, loggedIn: false, loading: false };
    default:
      return state;
  }
};
