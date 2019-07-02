import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SignupFormReducer from './SignupFormReducer';
import EmployeeReducer from './EmployeeReducer';

export default combineReducers({
  auth: AuthReducer,
  signupForm: SignupFormReducer,
  employees: EmployeeReducer
});
