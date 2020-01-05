import {
  PATIENTFORM_UPDATE,
  PATIENT_CREATE,
  PATIENT_CREATE_SUCCESS,
  PATIENT_CREATE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
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
    case PATIENTFORM_UPDATE:
      return { ...state, [action.field]: action.payload };
    case PATIENT_CREATE:
        return { ...state, loading: true, error: '' };
    default:
      return state;
    case PATIENT_CREATE_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload, loggedIn: true, loading: false };
    case PATIENT_CREATE_FAIL:
      return { ...state, error: 'Error al iniciar sesión', password: '', loading: false };
  }
};
