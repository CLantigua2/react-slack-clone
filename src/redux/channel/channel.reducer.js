import {
  ADDING_CHANNEL_SUCCESS,
  GET_CHANNEL_SUCCESS,
  GET_INDIVIDUAL_CHANNEL
} from "./channel.types";

const initState = {
  channels: [],
  individual_channel: null
};

export const channelReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_CHANNEL_SUCCESS:
      return {
        ...state,
        channels: action.payload
      };
    case ADDING_CHANNEL_SUCCESS:
      console.log("CHANNELS: ", state.channels);
      // console.log("ACTION PAYLOAD: ", action.payload);
      return {
        ...state,
        channels: [...state.channels]
      };
    case GET_INDIVIDUAL_CHANNEL:
      return {
        ...state,
        individual_channel: action.payload
      };
    default:
      return state;
  }
};
