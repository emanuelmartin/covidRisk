import Parse from 'parse/react-native';
import Alert from 'react-native'

import {
  SIGNUPFORM_UPDATE,
  USER_CREATE,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL
} from './types';

let val = '';
let obj = {};
let formatted = '';
let clean = '';
let valid = false;

function toUpperCase(input) {
  const upper = input.split('').map((e) => e.charCodeAt(0) > 96 && e.charCodeAt(0) < 123 ? String.fromCharCode(e.charCodeAt(0) - 32) : e);

  return upper.join('');
}

function formatCurp(value) {
 val = value.replace(/\s/g, '')
              .substring(0, 18)
              .trim();

  let valUp = val;

  const regEx = /[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9]{2}/i;

  valid = regEx.test(valUp);

 if (valid) { valUp = val.toUpperCase(); }

 formatted = clean = valUp;
  obj = { formatted, clean, valid }
  return obj;
}

function formatOneWord(value) {
 val = value.replace(/ .*/, '')
              .toLowerCase()
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .toString()
              .trim();

              let regEx = /^\s*(?:\b[a-zA-Z]+\b\s*)+(?=[:-])/;

              valid = regEx.test(formatted);

              formatted = clean = val;
               obj = { formatted, clean, valid }
               return obj;
}

function formatFirstCap(value) {
 val = value.toLowerCase()
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')

              let regEx = /^[A-zÀ-ú]{3,20} ?[A-zÀ-ú]{3,20}$/i;

              valid = regEx.test(formatted);

              formatted = clean = val;
               obj = { formatted, clean, valid }
               return obj;
}

function formatDate(value) {
  val = value;

  if (value.length === 2 || value.length === 5) {
    val = value + '-';
  }
  val = val.substring(0, 10)
    .trim();

    let regEx = /^(0[1-9]|1\d|2\d|3[01])\-(0[1-9]|1[0-2])\-(19|20)\d{2}$/

    valid = regEx.test(formatted);

    formatted = clean = val;
     obj = { formatted, clean, valid }
     return obj;
}

function formatNumbers(value, limit) {
  val = value.replace(/\D/g, '')
              .substring(0, limit)
              .trim();

  return val;
}

function formatPhone(value) {
  // NNN-NNN-NNNN

  const splitter = /.{1,3}/g;
  let number = value.substring(0, 10);
  number = number.substring(0, 7).match(splitter).join('-') + number.substring(7);
  formatted = number;

  if (formatted.length === 13) {
    formatted = formatted.substring(0, 12)
     .trim();

     clean = formatted.replace(/-/g, '');

     valid = false;
     let regEx = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;

   valid = regEx.test(formatted);
}
  obj = { clean, formatted, valid };
  return obj;
}

function formatSex(value) {
  val = value.toUpperCase().trim();
  valid = false;
  if (val === 'M' || val === 'F') {
    valid = true;
  }
formatted = clean = val;
  obj = { clean, formatted, valid };
  return obj;
}

function formatCedule(value) {
  val = value.substring(0, 8);
  valid = false;
  let regEx = /^[0-9]{8}$/;

valid = regEx.test(formatted);
formatted = clean = val;
  obj = { clean, formatted, valid };
  return obj;
}

function formatString(value) {
  valid = false;
  let regEx = /^\d+(\.\d+)?$/

valid = regEx.test(formatted);
formatted = clean = value;
  obj = { clean, formatted, valid };
  return obj;
}

function formatEmail(value){

}

function formatUsername(value) {
  clean = formatted = value;
  valid = true;
  obj = { clean, formatted, valid };
  return obj;
}

function formatPassword(value) {
  clean = formatted = value;
  valid = true;
  obj = { clean, formatted, valid };
  return obj;
}

export const signupUpdate = ({ prop, value, type, limit, edited }) => {
  switch (type) {
    case 'curp': obj = formatCurp(value); break;
    case 'oneWord': obj = formatOneWord(value); break;
    case 'firstCap': obj = formatFirstCap(value); break;
    case 'date': obj = formatDate(value); break;
    case 'numbers': obj = formatNumbers(value, limit); break;
    case 'phone' : obj = formatPhone(value); break;
    case 'sex': obj = formatSex(value); break;
    case 'cedule': obj = formatCedule(value); break;
    case 'string': obj = formatString(value); break;
    case 'username': obj = formatUsername(value); break;
    case 'password': obj = formatPassword(value); break;
    default: obj = { val: value };
  }

  return (dispatch) => {
  if (obj.valid) {
    user.set(prop, obj.clean);
    console.log(user);
  }

  dispatch({ type: SIGNUPFORM_UPDATE,
    field: prop,
    payload: { toShow: obj.formatted, toStore: obj.clean, valid: obj.valid, edited } });
  };
};

export const userCreate = (props) => {

  const user = new Parse.User();

  user.set('type', 'paciente');
  user.set('curp', props.curp);
  user.set('lastName1', props.lastName1);
  user.set('lastName2', props.lastName2);
  user.set('names', props.names);
  user.set('birthday', props.birthday);
  user.set('sex', props.sex);
  user.set('nationality', props.nationality);
  user.set('birthState', props.birthState);
  user.set('cp', props.cp);
  user.set('street', props.street);
  user.set('extNum', props.extNum);
  user.set('intNum', props.intNum);
  user.set('colonia', props.colonia);
  user.set('locality', props.locality);
  user.set('city', props.city);
  user.set('state', props.state);
  user.set('phone', props.phone);
  user.set('email', props.email);
  user.set('bloodType', props.bloodType);
  user.set('emergencyLastName', props.emergencyLastName);
  user.set('emergencyFirstName', props.emergencyFirstName);
  user.set('emergencyPartner', props.emergencyPartner);
  user.set('emergencyPhone', props.emergencyPhone);
  user.set('username', props.username);
  user.set('password', props.password2);
  user.set('cargo', props.cargo);
  user.set('master', props.master);
  user.set('submaster', props.submaster);
  user.set('estadoCivil', props.estadoCivil);
  user.set('religion', props.religion);
  user.set('etnia', props.etnia);
  user.set('idioma', props.idioma);
  user.set('asegurado', props.asegurado);
  user.set('aseguradora', props.aseguradora);
  user.set('tipoSeguro', props.tipoSeguro);
  user.set('vigenciaSeguro', props.vigenciaSeguro);


  return (dispatch) => {
    return new Promise((resolve, reject) => {
    dispatch({ type: USER_CREATE });

  user.signUp()
    .then(newUser => {
      resolve(newUser);
      dispatch({ type: USER_CREATE_SUCCESS, payload: newUser })
    })
    .catch(error => {
      reject(error);
      console.log(error.message)
      dispatch({ type: USER_CREATE_FAIL, payload: error })
    });
  });
};
};
