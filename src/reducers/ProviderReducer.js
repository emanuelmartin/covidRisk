import {
  PROVIDERFORM_UPDATE,
  PROVIDER_CREATE,
  PROVIDER_CREATE_SUCCESS,
  PROVIDER_CREATE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  nombre: '',
  razonSocial: '',
  rfc: '',
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
  password: '',
  religion: '',
  etnia: '',
  idioma: 'Español',
  aseguradora: '',
  tipoSeguro: '',
  vigenciaSeguro: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PROVIDERFORM_UPDATE:
      return { ...state, [action.field]: action.payload };
    case PROVIDER_CREATE:
        return { ...state, loading: true, error: '' };
    default:
      return state;
    case PROVIDER_CREATE_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, loggedIn: true, loading: false };
    case PROVIDER_CREATE_FAIL:
      return { ...state, error: 'Error al iniciar sesión', password: '', loading: false };
  }
};
