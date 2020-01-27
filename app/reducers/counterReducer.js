import {
  WIN_INCREASE,
  LOSE_INCREASE,
  DRAW_INCREASE,
  RESET,
} from '../actions/type';

const initialState = {
  winCount: 0,
  loseCount: 0,
  drawCount: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case WIN_INCREASE:
      state.winCount += 1;
      break;
    case LOSE_INCREASE:
      state.loseCount += 1;
      break;
    case DRAW_INCREASE:
      state.drawCount += 1;
      break;
    case RESET:
      state = initialState;
      break;
    default:
      break;
  }
  return state;
}
