import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import themeReducers from './themeReducers';

export default combineReducers({
  counter: counterReducer,
  theme: themeReducers,
});
