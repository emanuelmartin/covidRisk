import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default store;
