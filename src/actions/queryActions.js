import Parse from 'parse/react-native';
import moment from 'moment-timezone';
import {
  DB_QUERY,
  DB_QUERY_RESULTS,
  DB_QUERY_NO_RESULTS,
  DB_QUERY_ERROR,
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

export const queryAttach = ({ object, constrain, text }) => {
  return async (dispatch) => {
    dispatch({ type: DB_QUERY, payload: text });

    if (constrain.length <= 0) {
      dispatch({
        type: DB_QUERY_ERROR,
        payload: '',
        error: 'Requiere al menos un elemento de búsqueda'
      });
    } else {
      let jsonArray = [];
      const query = [];
      let mainQuery = null;
      constrain.forEach((element, index) => {
        query[index] = new Parse.Query(object);
        if (element.type === 'get') {
          query[index].get(element.text);
        } else {
          query[index][element.type](element.variable, element.text);
        }
      });

      if (query.length === 1) {
        mainQuery = query[0];
      } else if (query.length > 1) {
        if (constrain[1].bool === 'or') {
          mainQuery = Parse.Query.or(query[0], query[1]);
        } else if (constrain[1].bool === 'and') {
          mainQuery = Parse.Query.and(query[0], query[1]);
        }
      }

      if (query.length > 2) {
        for (let i = 2; i < query.length; i++) {
          if (constrain[i].bool === 'or') {
            mainQuery = Parse.Query.or(mainQuery, query[i]);
          } else if (constrain[1].bool === 'and') {
            mainQuery = Parse.Query.and(mainQuery, query[i]);
          }
        }
      }

      mainQuery.find().then((results) => {
        for (let i = 0; i < results.length; i++) {
           jsonArray.push(results[i].toJSON());
        }
        if (jsonArray.length > 0) {
          if (jsonArray.length === 1) {
            const array = jsonArray;
            jsonArray = array[0];
          }
          console.log(jsonArray);
          dispatch({ type: DB_QUERY_RESULTS, payload: jsonArray, name: object });
        } else {
          dispatch({ type: DB_QUERY_NO_RESULTS, name: object });
        }
      });
    }
  };
};

export const multiQuery = (array, text) => {
  const jsonArray = [];
  const allQuery = new Promise((resolve) => {
    array.forEach((newElement, index) => {
      const parseObject = Parse.Object.extend(newElement.object);
      const query = new Parse.Query(parseObject);
      if (newElement.type === 'get') {
        query.get(text);
      } else {
        query[newElement.type](newElement.variable, text);
      }
      query.find().then((results) => {
        for (let i = 0; i < results.length; i++) {
          jsonArray.push(results[i].toJSON());
          jsonArray[jsonArray.length - 1].class = results[0].className;
        }
        if (index === array.length - 1) resolve();
      });
    });
  });
  return async (dispatch) => {
    dispatch({ type: DB_QUERY, payload: text });

    if (text === '') {
      dispatch({ type: DB_QUERY_RESULTS, name: 'multiQry', payload: '' });
    } else {
        allQuery.then(() => {
          if (jsonArray.length > 0) {
            dispatch({
              type: DB_QUERY_RESULTS,
              payload: jsonArray,
              name: 'multiQry',
              loading: false });
          } else {
            console.log(jsonArray);
            dispatch({ type: DB_QUERY_NO_RESULTS, name: 'multiQry' });
          }
        }).catch(console.log('Función Fallida'));
    }
  };
};

export const multiWrite = (clase, acciones) => {
  let jsonArray = [];
  const user = Parse.User.current();
  return async (dispatch) => {
    const timeZone = moment.tz.guess(true);
    const momento = moment().tz(timeZone).format();
    const ParseObject = Parse.Object.extend(clase);
    const parseObject = new ParseObject();
    acciones.forEach((elemento) => {
      console.log(elemento)

      if (elemento.tipo === 'pointer') {
        elemento.valor = {
        __type: 'Pointer',
        className: elemento.pointerTo,
        objectId: elemento.valor.toString()
        };
      }
        parseObject[elemento.accion](elemento.variable, elemento.valor);
    })
      parseObject.set('momento', momento)
      parseObject.set('ingresadoPor', user)
        parseObject.save().then((results) => {
        jsonArray = results.toJSON();
          dispatch({ type: WRITE_SUCCESS, name: clase, payload: jsonArray });
    });
}
}

export const writeFunc = (clase, tipo, propiedadConsulta, consulta, accion, propiedadAgregar, valor) => {
  let jsonArray = [];
  const user = Parse.User.current();
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

export const deleteFunc = (clase, tipo, propiedadConsulta, consulta, propiedadEliminar) => {
  const user = Parse.User.current();
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
