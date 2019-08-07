import { ADD_BILL } from '../actions/types';

const INITIAL_STATE = {
  loading: false
};


export default (state = INITIAL_STATE, action) => {
  console.log(action);

  switch (action.type) {
    case ADD_BILL:
      return { ...state, loading: true };
    default:
      return state;
  }
};
