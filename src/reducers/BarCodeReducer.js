import {
  UPDATE_BAR_CODE,
  CLEAN_BAR_CODE
} from '../actions/types';

const INITIAL_STATE = {
  barCode: '',
  barType: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case UPDATE_BAR_CODE:
      return {
        ...state,
        barCode: action.barCode,
        barType: action.barType,
        pageRequest: action.pageRequest
      };
    case CLEAN_BAR_CODE:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};
