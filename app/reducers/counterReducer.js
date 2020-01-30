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
  highestStreak: 0,
  currentStreak: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case WIN_INCREASE:
      return {
        ...state,
        winCount: state.winCount + 1,
        currentStreak: state.currentStreak + 1,
        highestStreak:
          state.highestStreak < state.currentStreak + 1
            ? state.currentStreak + 1
            : state.highestStreak,
      };
    case LOSE_INCREASE:
      return {
        ...state,
        loseCount: state.loseCount + 1,
        currentStreak: 0,
      };
    case DRAW_INCREASE:
      return {
        ...state,
        drawCount: state.drawCount + 1,
      };
    case RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
