import Parse from 'parse/react-native';

import {
  DB_QUERY,
  DB_QUERY_RESULTS,
  DB_CLEAN,
  SEARCHING,
  WRITE_SUCCESS,
  DELETE_SUCCESS
} from './types';

export const queryFunc = ({ type, object, variable, text }) => {
  return async (dispatch) => {
    dispatch({ type: DB_QUERY, payload: text });

    if (text === '') {
      dispatch({ type: DB_QUERY_RESULTS, payload: '' });
    } else {
    const parseObject = Parse.Object.extend(object);
    const query = new Parse.Query(parseObject);
    let jsonArray = [];
    query[type](variable, text);
    query.find().then((results) => {
        for (let i = 0; i < results.length; i++) {
           jsonArray.push(results[i].toJSON());
        }
      if (text === 'Habitación') text = '';
      console.log(jsonArray);
      dispatch({ type: DB_QUERY_RESULTS, payload: jsonArray, name: object });
          });
    }
  };
};

export const writeFunc = (clase, tipo, propiedadConsulta, consulta, propiedadAgregar, valor) => {
  return async (dispatch) => {
    const parseObject = Parse.Object.extend(clase);
    const query = new Parse.Query(parseObject);
    if (tipo === 'get') {
      query.get(consulta.toString()).then((query) => {
        query.set(propiedadAgregar, valor)
        query.save().then(() => dispatch({ type: WRITE_SUCCESS, action: clase }));
    });
} else {
    query[tipo](propiedadConsulta, consulta.toString());
    const results = await query.find();
    console.log(results)
    query.get(results[0].id.toString()).then((query) => {
      query.set(propiedadAgregar, valor)
      query.save().then(() => dispatch({ type: WRITE_SUCCESS, action: clase }));
      console.log(clase, tipo, propiedadConsulta, consulta, propiedadAgregar, valor);
  }); }
  }
}

export const deleteFunc = (clase, tipo, propiedadConsulta, consulta, propiedadEliminar) => {
return async (dispatch) => {
  const parseObject = Parse.Object.extend(clase);
  const query = new Parse.Query(parseObject);
  if (tipo === 'get') {
    query.get(consulta).then((query) => {
      query.unset(propiedadEliminar)
      query.save().then(() => dispatch({ type: DELETE_SUCCESS, action: clase }));
  });
} else {
  query[tipo](propiedadConsulta, consulta.toString());
  const results = await query.find();
  console.log(results)
  query.get(results[0].id.toString()).then((query) => {
    query.unset(propiedadEliminar)
    query.save().then(() => dispatch({ type: DELETE_SUCCESS, action: clase }));
    console.log(clase, tipo, propiedadConsulta, consulta, propiedadEliminar);
  }); }
}
}

export const cleanFunc = () => ({
  type: DB_CLEAN
});
