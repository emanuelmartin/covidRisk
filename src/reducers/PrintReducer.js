import {
  PRINT
} from '../actions/types';

export default ( ...state, action) => {
  switch (action.type) {
    case PRINT:
      return { ...state };
  }
};
