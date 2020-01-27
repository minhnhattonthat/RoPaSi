import { THEME_DARK_TOGGLE, THEME_LIGHT_TOGGLE } from '../actions/type';

const initialState = 'light';

export default function(state = initialState, action) {
  switch (action.type) {
    case THEME_DARK_TOGGLE:
      state = 'dark';
      break;
    case THEME_LIGHT_TOGGLE:
      state = 'light';
      break;
    default:
      break;
  }
  return state;
}
