import Parse from 'parse/react-native';
import {
  DB_QUERY,
  DB_QUERY_RESULTS,
  DB_QUERY_NO_RESULTS,
  DB_CLEAN,
  WRITE_SUCCESS,
  DELETE_SUCCESS,
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
      include.map((item) => query.include(item));
    }

      if (type === 'get') {
        query.get(text);
      } else {
      query[type](variable, text);
    }
    query.find().then((results) => {
        for (let i = 0; i < results.length; i++) {
           jsonArray.push(results[i].toJSON());
        }
      if (text === 'Habitación') text = '';
      if (jsonArray.length > 0) {
        if (jsonArray.length === 1) {
          const array = jsonArray;
          jsonArray = array[0];
        }
        console.log(jsonArray);
        dispatch({ type: DB_QUERY_RESULTS, payload: jsonArray, name: object, loading: false });
      } else {
        dispatch({ type: DB_QUERY_NO_RESULTS, name: object });
      }
      });
    }
  };
};

export const multiQuery = (array, text) => {
  return async (dispatch) => {
    dispatch({ type: DB_QUERY, payload: text });

    if (text === '') {
      dispatch({ type: DB_QUERY_RESULTS, name: 'multiQry', payload: '' });
    } else {
      let query = null;
      const promises = [];
      const jsonArray = [];

      array.forEach((newElement) => {
        query = new Parse.Query(newElement.object);

        if (newElement.type === 'get') {
          query.get(text);
        } else {
          query[newElement.type](newElement.variable, text);
        }
        promises.push(query.find());
      });

      Promise.all(promises).then(results => {
        results.forEach(result => {
          for (let i = 0; i < result.length; i++) {
            jsonArray.push(result[i].toJSON());
          }
        });
      }).then(() => {
        if (jsonArray.length > 0) {
          console.log(jsonArray[0]);
          dispatch({
            type: DB_QUERY_RESULTS,
            payload: jsonArray,
            name: 'multiQry',
            loading: false });
        } else {
          dispatch({ type: DB_QUERY_NO_RESULTS, name: 'multiQry' });
        }
      });
    }
  };
};

export const writeFunc = (clase, tipo, propiedadConsulta, consulta, accion, propiedadAgregar, valor, user) => {
  let jsonArray = [];
  return async (dispatch) => {
    const parseObject = Parse.Object.extend(clase);
    const query = new Parse.Query(parseObject);
    if (tipo === 'get') {
      query.get(consulta.toString()).then((query) => {
        query[accion](propiedadAgregar, valor);
        query.save().then((results) => {
        jsonArray = results.toJSON();
          dispatch({ type: WRITE_SUCCESS, name: clase, payload: jsonArray });
        });
    });
    } else {
        query[tipo](propiedadConsulta, consulta.toString());
        const results = await query.find();
        console.log(results);
        query.get(results[0].id.toString()).then((query) => {
          query[accion](propiedadAgregar, valor);
          query.save().then((results) => {
            jsonArray = results.toJSON();
            dispatch({ type: WRITE_SUCCESS, name: clase, payload: jsonArray });
          });
          console.log(clase, tipo, propiedadConsulta, consulta, propiedadAgregar, valor);
      });
    }

    const pointerUsuario = {
      __type: 'Pointer',
     className: '_User',
     objectId: user.id
    };

    const DataLog = Parse.Object.extend('dataLog');
    const dataLog = new DataLog();
    dataLog.set('tipo', 'escritura');
    dataLog.set('usuario', pointerUsuario);
    dataLog.save();
  };
};

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
    console.log(results);
    query.get(results[0].id.toString()).then((query) => {
      query.unset(propiedadEliminar);
      query.save();
      query.save().then(() => dispatch({ type: DELETE_SUCCESS, action: clase }));
      console.log(query.id);
      console.log(clase, tipo, propiedadConsulta, consulta, propiedadEliminar);
    });
  }

    const pointerUsuario = {
    __type: 'Pointer',
   className: '_User',
   objectId: user.id
  };

    const pointerObjeto = {
    __type: 'Pointer',
   className: clase,
   objectId: this.state.queryID
  };

    const DataLog = Parse.Object.extend('dataLog');
    const dataLog = new DataLog();
    dataLog.set('tipo', 'eliminar');
    dataLog.set('usuario', pointerUsuario);
    dataLog.set('objeto', pointerObjeto);
    dataLog.save();
  };
};

export const cleanFunc = () => ({
  type: DB_CLEAN
});
