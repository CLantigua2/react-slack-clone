import { PROGRESS } from "./progress.types";

export const moveProgress = percent => dispatch =>
  dispatch({
    type: PROGRESS,
    payload: percent
  });
