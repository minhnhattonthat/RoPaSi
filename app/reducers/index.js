import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import themeReducer from './themeReducer';
import optionsReducer from './optionsReducer';

export default combineReducers({
  counter: counterReducer,
  theme: themeReducer,
  options: optionsReducer,
});
