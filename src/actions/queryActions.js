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

export const cleanImpresiones = () => {
  return async (dispatch) =>
  dispatch({ type: DB_QUERY_RESULTS, payload: null, name: Impresiones, loading: false });
};

export const queryFunc = ({ type, object, variable, text, include, limit }) => {
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

    console.log('LIMIT', limit);
    if(limit!==null && limit!==undefined && limit!==0){
      query.limit(limit);
    }

    query.find().then((results) => {
        for (let i = 0; i < results.length; i++) {
           jsonArray.push(results[i].toJSON());
        }
        if (text === 'Habitación' || text === 'cafeteria') {
          dispatch({ type: DB_QUERY, payload: '' });
        }
        if (jsonArray.length > 0) {
          if (jsonArray.length === 1) {
            const array = jsonArray;
            jsonArray = array[0];
          }
          dispatch({ type: DB_QUERY_RESULTS, payload: jsonArray, name: object, loading: false });
        } else {
          dispatch({ type: DB_QUERY_NO_RESULTS, name: object });
        }
      });
    }
  };
};

export const queryPointer = ({ type, object, variable, text, pointer, regex }) => {
  const objectID = [];
  const jsonArray = [];

  return async (dispatch) => {
    dispatch({ type: DB_QUERY, payload: text });

    if (text === '' && type !== 'exists') {
      dispatch({ type: DB_QUERY_RESULTS, payload: '' });
    } else {
      const parseObject = Parse.Object.extend(object);
      const query = new Parse.Query(parseObject);

      if (type === 'get') {
        query.get(text);
      } else if (type === 'matches') {
        query.matches(variable, text, regex);
      } else if (type === 'exists') {
        query.exists(variable);
      } else {
        query[type](variable, text);
      }

      query.find().then((results) => {
        for (let i = 0; i < results.length; i++) {
           objectID.push(results[i].id);
        }
        const parsePointer = Parse.Object.extend(pointer.object);
        const queryPtr = new Parse.Query(parsePointer);
        queryPtr.containedIn(pointer.variable, objectID);
        queryPtr.include(pointer.variable);
        queryPtr.find().then((resultPointers) => {
          for (let i = 0; i < resultPointers.length; i++) {
             jsonArray.push(resultPointers[i].toJSON());
          }
          if (jsonArray.length > 0) {
            dispatch({ type: DB_QUERY_RESULTS, payload: jsonArray, name: object, loading: false });
          } else {
            dispatch({ type: DB_QUERY_NO_RESULTS, name: object });
          }
        });
      });
    }
  };
};

export const queryIngreso = ({ object, type, variable, text, regex }) => {
  const patientID = [];
  const ingresoID = [];
  let jsonArray = [];

  return async (dispatch) => {
    dispatch({ type: DB_QUERY, payload: text });
    if (text === '' && type !== 'exists') {
      dispatch({ type: DB_QUERY_RESULTS, payload: '' });
    } else {
      const parseObject = Parse.Object.extend('IngresosActivos');
      const query = new Parse.Query(parseObject);
      query.equalTo('Alta', false);
      query.include('paciente');
      query.find().then((results) => {
        for (let i = 0; i < results.length; i++) {
           patientID.push(results[i].get('paciente').id);
           ingresoID.push(results[i].id)
        }
        const parseObject1 = Parse.Object.extend(object);
        const query1 = new Parse.Query(parseObject1);

        if (type === 'get') {
          query1.get(text);
        } else if (type === 'matches') {
          query1.matches(variable, text, regex);
        } else if (type === 'exists') {
          query1.exists(variable);
        } else {
          query1[type](variable, text);
        }
        const query2 = new Parse.Query(object);
        query2.containedIn('objectId', patientID);
        const mainQuery = Parse.Query.and(query1, query2);
        mainQuery.find().then((results) => {
          for (let i = 0; i < results.length; i++) {
             for (let j = 0; j < patientID.length; j++) {
               if (results[i].id === patientID[j]) {
                 results[i].set('ingresoId', ingresoID[j]);
               }
             }
             jsonArray.push(results[i].toJSON());
          }
          if (jsonArray.length > 0) {
            if (jsonArray.length === 1) {
              const array = jsonArray;
              jsonArray = array[0];
            }
            dispatch({ type: DB_QUERY_RESULTS, payload: jsonArray, name: object, loading: false });
          } else {
            dispatch({ type: DB_QUERY_NO_RESULTS, name: object, loading: false });
          }
        });
      });
    }
  };
};

export const queryAttach = ({ object, constrain, text }) => {
  return async (dispatch) => {
    dispatch({ type: DB_QUERY, payload: text, loading: true });

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
        } else if (element.type === 'doesNotExist') {
          query[index].doesNotExist(element.variable);
        } else if (element.type === 'matches') {
            query[index].matches(element.variable, element.text, element.regex);
        } else {
          query[index][element.type](element.variable, element.text);
        }
        if (element.include !== null &&
          element.include !== undefined &&
          element.include !== '') {
            query[index].include(element.include);
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
          dispatch({ type: DB_QUERY_RESULTS, payload: jsonArray, name: object, loading: false });
        } else {
          dispatch({ type: DB_QUERY_NO_RESULTS, name: object, loading: false });
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
      } else if (newElement.type === 'matches') {
        query.matches(newElement.variable, text, newElement.regex);
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
        query.get(results[0].id.toString()).then((query) => {
          query[accion](propiedadAgregar, valor);
          query.save().then((results) => {
            jsonArray = results.toJSON();
            dispatch({ type: WRITE_SUCCESS, name: clase, payload: jsonArray });
          });
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
    query.get(results[0].id.toString()).then((query) => {
      query.unset(propiedadEliminar);
      query.save();
      query.save().then(() => dispatch({ type: DELETE_SUCCESS, action: clase }));
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

export const cleanFunc = (variable) => ({
  type: DB_CLEAN, action: { name: variable }
});
