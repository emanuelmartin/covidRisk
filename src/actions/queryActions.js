import Parse from 'parse/react-native';

import {
  DB_QUERY,
  DB_QUERY_RESULTS
} from './types';

export const queryFunc = ({ type, object, variable, text }) => {
  return async (dispatch) => {
    dispatch({ type: DB_QUERY, payload: text })

    const parseObject = Parse.Object.extend(object);
    const query = new Parse.Query(parseObject);
    let jsonArray = [];
    query[type](variable, text);
    query.find().then((results) => {


      if (text === '') {
        dispatch({ type: DB_QUERY_RESULTS, payload: '' });
      }
      else {
        for (let i = 0; i < results.length; i++) {
           jsonArray.push(results[i].toJSON());
        }
      console.log(jsonArray);
      dispatch({ type: DB_QUERY_RESULTS, payload: jsonArray });
    }
    });

  }
}
