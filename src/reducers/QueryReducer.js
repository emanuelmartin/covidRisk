import {
  DB_QUERY,
  DB_QUERY_RESULTS
} from '../actions/types';

const INITIAL_STATE = {
  text: '',
  dataSource: ''
}

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case DB_QUERY:
      return { ...state, text: action.payload };
    case DB_QUERY_RESULTS:
      return { ...state, dataSource: action.payload };
    default:
      return { state };
    }
  }
