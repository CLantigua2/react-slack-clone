import {
  ADDING_CHANNEL_START,
  ADDING_CHANNEL_SUCCESS,
  ADDING_CHANNEL_FAILED,
  FETCHING_CHANNEL_START,
  FETCHING_CHANNEL_SUCCESS,
  FETCHING_CHANNEL_FAILED,
  FETCHING_INDIVIDUAL_CHANNEL
} from "./channel.types";

const initState = {
  channels: [],
  channels_loading: false,
  channels_error: "",
  individual_channel: null
};

export const channelReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCHING_CHANNEL_START:
      return {
        ...state,
        channels_loading: true
      };
    case FETCHING_CHANNEL_SUCCESS:
      return {
        ...state,
        channels: action.payload,
        channels_loading: false,
        channels_error: ""
      };
    case FETCHING_CHANNEL_FAILED:
      return {
        ...state,
        channels_error: action.payload,
        channels_loading: false
      };
    case ADDING_CHANNEL_START:
      return {
        ...state,
        channels_loading: true
      };
    case ADDING_CHANNEL_SUCCESS:
      return {
        ...state,
        channels: [...state.channels, action.payload],
        channels_error: "",
        channels_loading: false
      };
    case ADDING_CHANNEL_FAILED:
      return {
        ...state,
        channels_error: action.payload,
        channels_loading: false
      };
    case FETCHING_INDIVIDUAL_CHANNEL:
      return {
        ...state,
        individual_channel: action.payload
      };
    default:
      return state;
  }
};
