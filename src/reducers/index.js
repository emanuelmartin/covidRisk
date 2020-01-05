import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SignupFormReducer from './SignupFormReducer';
import PatientFormReducer from './PatientFormReducer';
import EmployeeReducer from './EmployeeReducer';
import ItemReducer from './ItemReducer';
import QueryReducer from './QueryReducer';
import BillReducer from './BillReducer';
import BarCodeReducer from './BarCodeReducer';
import ProviderReducer from './ProviderReducer';
import PrintReducer from './PrintReducer';
import PharmacyReducer from './PharmacyReducer';

export default combineReducers({
  auth: AuthReducer,
  signupForm: SignupFormReducer,
  employees: EmployeeReducer,
  patientForm: PatientFormReducer,
  item: ItemReducer,
  query: QueryReducer,
  bill: BillReducer,
  barCodeReader: BarCodeReducer,
  providerForm: ProviderReducer,
  printR: PrintReducer,
  pharmacy: PharmacyReducer
});
