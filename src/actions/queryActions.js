import Parse from 'parse/react-native';

import {
  DB_QUERY,
  DB_QUERY_RESULTS,
  DB_CLEAN,
  SEARCHING
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
      console.log(jsonArray);
      dispatch({ type: DB_QUERY_RESULTS, payload: jsonArray, name: object });
          });
    }
  };
};

export const cleanFunc = () => ({
  type: DB_CLEAN
});
