import {
  FETCHING_MESSAGES_START,
  FETCHING_MESSAGES_SUCCESS,
  FETCHING_MESSAGES_FAILED,
  ADDING_MESSAGES_START,
  ADDING_MESSAGES_SUCCESS,
  ADDING_MESSAGES_FAILED
} from "./messages.types";

const initState = {
  messages: [],
  messages_fetch_loading: false,
  messages_fetch_error: "",
  messages_adding_loading: false,
  messages_adding_error: "",
  individualMessage: null
};

export const messagesReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCHING_MESSAGES_START:
      return {
        ...state,
        messages_fetch_loading: true
      };
    case FETCHING_MESSAGES_SUCCESS:
      return {
        ...state,
        messages_fetch_loading: false,
        messages: action.payload,
        messages_fetch_error: ""
      };
    case FETCHING_MESSAGES_FAILED:
      return {
        ...state,
        messages_fetch_loading: false,
        messages_fetch_error: action.payload
      };
    case ADDING_MESSAGES_START:
      return {
        ...state,
        messages_adding_loading: true
      };
    case ADDING_MESSAGES_SUCCESS:
      return {
        ...state,
        messages_adding_loading: false,
        messages: [...state.messages, action.payload],
        messages_adding_error: ""
      };
    case ADDING_MESSAGES_FAILED:
      return {
        ...state,
        messages_adding_error: action.payload,
        messages_adding_loading: false
      };
    default:
      return state;
  }
};
