import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SignupFormReducer from './SignupFormReducer';
import PatientFormReducer from './PatientFormReducer';
import EmployeeReducer from './EmployeeReducer';
import ItemReducer from './ItemReducer';
import QueryReducer from './QueryReducer';

export default combineReducers({
  auth: AuthReducer,
  signupForm: SignupFormReducer,
  employees: EmployeeReducer,
  patientForm: PatientFormReducer,
  item: ItemReducer,
  query: QueryReducer
});
