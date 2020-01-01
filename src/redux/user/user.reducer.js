import {
  FETCH_CURRENT_USER_START,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILED,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILED
} from "./user.types";

const initState = {
  currentUser: null,
  isFetching: false,
  errorMessage: ""
};

export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_USER_START:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_CURRENT_USER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentUser: action.payload,
        errorMessage: ""
      };
    case FETCH_CURRENT_USER_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    case SIGN_OUT_START:
      return {
        ...state,
        isFetching: true,
        errorMessage: ""
      };
    case SIGN_OUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: "",
        currentUser: null
      };
    case SIGN_OUT_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
