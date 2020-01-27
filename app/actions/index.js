import {
  WIN_INCREASE,
  LOSE_INCREASE,
  DRAW_INCREASE,
  RESET,
  THEME_DARK_TOGGLE,
  THEME_LIGHT_TOGGLE,
} from './type';

export const winIncrease = () => ({ type: WIN_INCREASE });
export const loseIncrease = () => ({ type: LOSE_INCREASE });
export const drawIncrease = () => ({ type: DRAW_INCREASE });
export const reset = () => ({ type: RESET });

export const themeDarkToggle = () => ({ type: THEME_DARK_TOGGLE });
export const themeLightToggle = () => ({ type: THEME_LIGHT_TOGGLE });
