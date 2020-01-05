import {
  PRINT,
  PRINT_CLEAN
} from '../actions/types';

const INITIAL_STATE = {
  print: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRINT:
      return { ...state };
    case PRINT_CLEAN:
      return { ...state, ...INITIAL_STATE };
    default:
    return { ...state };
  }
};
