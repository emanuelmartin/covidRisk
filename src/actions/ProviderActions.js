import Parse from 'parse/react-native';

import {
  PROVIDERFORM_UPDATE,
  PROVIDER_CREATE,
  PROVIDER_CREATE_SUCCESS,
  PROVIDER_CREATE_FAIL
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

  let regEx = /[A-Z]{4}[0-9]{6}[A-Z]{6}[0-9]{2}/;

  valid = regEx.test(formatted);

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

              let regEx = /^[A-zÀ-ú]{3,20}$/i;

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
    val = value + '/';
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

const Proveedor = Parse.Object.extend('Proveedor');
const proveedor = new Proveedor();

export const providerUpdate = ({ prop, value, type, limit, edited }) => {
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
    default: obj = { val: value, clean: value, valid: value, formatted: value };
  }

  return (dispatch) => {
  if (true) {
    proveedor.set(prop, obj.clean);
    console.log(proveedor);
  }

  dispatch({ type: PROVIDERFORM_UPDATE,
    field: prop,
    payload: { toShow: obj.formatted, toStore: obj.clean, valid: obj.valid, edited } });
  };
};

export const providerCreate = () => {
  return (dispatch) => {
    dispatch({ type: PROVIDER_CREATE });

  proveedor.save()
    .then(proveedor => {
      dispatch( { type: PROVIDER_CREATE_SUCCESS, payload: proveedor })
    })
    .catch(error => {
      dispatch( { type: PROVIDER_CREATE_FAIL, payload: error })
    });
  };
};
