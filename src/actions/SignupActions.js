import Parse from 'parse/react-native';

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

function formatCurp(value) {
 val = value.toUpperCase()
              .replace(/\s/g, '')
              .substring(0, 18)
              .trim();

if (val.length === 18) valid = true;
else valid = false;

 formatted = clean = val;
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
  return val;
}

function formatFirstCap(value) {
 val = value.toLowerCase()
              .split(' ')
              .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
              .join(' ')
  return val;
}

function formatDate(value) {
  val = value;

  if (value.length === 2 || value.length === 5) {
    val = value + '-';
  }
  val = val.substring(0, 10)
    .trim();
  return val;
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
   if (formatted.length === 13) { valid = true; }
  }
  clean = formatted;
  obj = { clean, formatted, valid };
  return obj;
}

const user = new Parse.User();

export const signupUpdate = ({ prop, value, type, limit, edited }) => {
  switch (type) {
    case 'curp': obj = formatCurp(value); break;
    case 'oneWord': obj = formatOneWord(value); break;
    case 'firstCap': obj = formatFirstCap(value); break;
    case 'date': obj = formatDate(value); break;
    case 'numbers': obj = formatNumbers(value, limit); break;
    case 'phone' : obj = formatPhone(value); break;
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

export const userCreate = () => {
  return (dispatch) => {
    dispatch({ type: USER_CREATE });

  user.signUp()
    .then(user => {
      dispatch( { type: USER_CREATE_SUCCESS, payload: user })
    })
    .catch(error => {
      dispatch( { type: USER_CREATE_FAIL, payload: error })
    });
  };
};
