import {
  PLAY_AS_MAN,
  PLAY_AS_COM,
  GAME_MODE_3,
  GAME_MODE_5,
} from '../actions/type';

const initialState = {
  mode: GAME_MODE_3,
  player: PLAY_AS_MAN,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GAME_MODE_3:
    case GAME_MODE_5:
      return {
        ...state,
        mode: action.type,
      };
    case PLAY_AS_MAN:
    case PLAY_AS_COM:
      return {
        ...state,
        player: action.type,
      };
    default:
      return state;
  }
}
