import {
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE
} from "./user.types";

const initState = {
  currentUser: null,
  errorMessage: ""
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        errorMessage: ""
      };
    case GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        errorMessage: "",
        currentUser: null
      };
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
