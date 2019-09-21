import Parse from 'parse/react-native';

import {
  DB_QUERY,
  DB_QUERY_RESULTS,
  DB_CLEAN,
  SEARCHING,
  WRITE_SUCCESS,
  DELETE_SUCCESS
} from './types';

export const queryFunc = ({ type, object, variable, text, include }) => {
  return async (dispatch) => {
    dispatch({ type: DB_QUERY, payload: text });

    if (text === '') {
      dispatch({ type: DB_QUERY_RESULTS, payload: '' });
    } else {
    const parseObject = Parse.Object.extend(object);
    const query = new Parse.Query(parseObject);
    let jsonArray = [];
    if (include) {
    include.map((item) => query.include(item)) }
    
    if (type === 'get') {
      query.get(text);
    } else {
    query[type](variable, text); }
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

export const writeFunc = (clase, tipo, propiedadConsulta, consulta, propiedadAgregar, valor, user) => {
  return async (dispatch) => {
    const parseObject = Parse.Object.extend(clase);
    const query = new Parse.Query(parseObject);
    if (tipo === 'get') {
      query.get(consulta.toString()).then((query) => {
        query.set(propiedadAgregar, valor)
        query.save().then((query) => dispatch({ type: WRITE_SUCCESS, name: clase, payload: query }));
    });
} else {
    query[tipo](propiedadConsulta, consulta.toString());
    const results = await query.find();
    console.log(results)
    query.get(results[0].id.toString()).then((query) => {
      query.set(propiedadAgregar, valor)
      query.save().then((query) => dispatch({ type: WRITE_SUCCESS, name: clase, payload: query }));
      console.log(clase, tipo, propiedadConsulta, consulta, propiedadAgregar, valor);
  }); }

  const pointerUsuario = {
  __type: 'Pointer',
 className: '_User',
 objectId: user.id
  }

  const DataLog = Parse.Object.extend('dataLog')
  const dataLog = new DataLog();
  dataLog.set('tipo', 'escritura')
  dataLog.set('usuario', pointerUsuario)
  dataLog.save();
  }
}

export const deleteFunc = (clase, tipo, propiedadConsulta, consulta, propiedadEliminar, user) => {
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
    query.save()
    query.save().then(() => dispatch({ type: DELETE_SUCCESS, action: clase }));
    console.log(query.id)
    console.log(clase, tipo, propiedadConsulta, consulta, propiedadEliminar);
  }); }

  const pointerUsuario = {
  __type: 'Pointer',
 className: '_User',
 objectId: user.id
  }

  const pointerObjeto = {
  __type: 'Pointer',
 className: clase,
 objectId: this.state.queryID
  }

  const DataLog = Parse.Object.extend('dataLog')
  const dataLog = new DataLog();
  dataLog.set('tipo', 'eliminar')
  dataLog.set('usuario', pointerUsuario)
  dataLog.set('objeto', pointerObjeto)
  dataLog.save();

}
}

export const cleanFunc = () => ({
  type: DB_CLEAN
});
