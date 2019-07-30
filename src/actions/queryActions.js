import Parse from 'parse/react-native';

import {
  DB_QUERY,
  DB_QUERY_RESULTS
} from './types';

export const queryFunc = ({ type, variable, text }) => {
  return async (dispatch) => {
    dispatch({ type: DB_QUERY, payload: text })

    const Patient = Parse.Object.extend('Patient');
    const query = new Parse.Query(Patient);
    query[type](variable, text);
    query.find().then((results) => {
      let jsonArray = [];

      if (!query.length) {
        dispatch({ type: DB_QUERY_RESULTS, payload: '' });
      }

        for (let i = 0; i < results.length; i++) {
           jsonArray.push(results[i].toJSON());
        }
      console.log(jsonArray);
      dispatch({ type: DB_QUERY_RESULTS, payload: jsonArray });
    });

  }
}
