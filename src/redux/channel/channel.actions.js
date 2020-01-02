import {
  ADDING_CHANNEL_START,
  ADDING_CHANNEL_SUCCESS,
  ADDING_CHANNEL_FAILURE,
  GET_CHANNEL_START,
  GET_CHANNEL_SUCCESS,
  GET_CHANNEL_FAILURE,
  GET_INDIVIDUAL_CHANNEL
} from "./channel.types";
import { postRequest, getRequest } from "../utils/request.utils";
import { getMessagesAction } from "../message/messages.actions";

export const addChannelAction = channelData => async dispatch => {
  postRequest(
    {
      types: {
        start: ADDING_CHANNEL_START,
        success: ADDING_CHANNEL_SUCCESS,
        failure: ADDING_CHANNEL_FAILURE
      },
      refLocation: "channels",
      postObj: channelData
    },
    dispatch
  );
};

export const getAllChannels = async dispatch => {
  getRequest(
    {
      types: {
        start: GET_CHANNEL_START,
        success: GET_CHANNEL_SUCCESS,
        failure: GET_CHANNEL_FAILURE
      },
      refLocation: "channels"
    },
    dispatch
  );
};

export const getIndividualChannel = individualChannel => dispatch => {
  dispatch({
    type: GET_INDIVIDUAL_CHANNEL,
    payload: individualChannel
  });

  getMessagesAction(individualChannel.id)(dispatch);
};
