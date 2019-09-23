import {
  PROVIDERFORM_UPDATE,
  PROVIDER_CREATE,
  PROVIDER_CREATE_SUCCESS,
  PROVIDER_CREATE_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  edited: false,
  valid: false,
  tipoProveedor: '',
  tipoProducto: '',
  nombre: '',
  razonSocial: '',
  rfc: '',
  CP: '',
  street: '',
  extNum: '',
  intNum: '',
  colonia: '',
  locality: '',
  city: '',
  estado: '',
  nombreContacto: '',
  email: '',
  phone: '',
  username: '',
  password: '',
  password2: '',
  tipoPago: '',
  condicionesPago: '',
  beneficiarioCheque: '',
  titularCuenta: '',
  numeroCuenta: '',
  bancoCuenta: '',
  clabeCuenta: '',
  referenciaCuenta: ''
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
