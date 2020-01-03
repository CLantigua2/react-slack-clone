import { PROGRESS } from "./progress.types";

const initState = {
  progress: 0
};

export const progressReducer = (state = initState, action) => {
  switch (action.type) {
    case PROGRESS:
      return {
        progress: action.payload
      };
    default:
      return state;
  }
};
