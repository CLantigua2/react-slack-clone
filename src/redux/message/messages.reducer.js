import {
  GET_MESSAGES_SUCCESS,
  ADDING_MESSAGES_SUCCESS
} from "./messages.types";

const initState = {
  messages: [],
  individualMessage: null
};

export const messagesReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: action.payload
      };
    case ADDING_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: [...state.messages]
      };
    default:
      return state;
  }
};
