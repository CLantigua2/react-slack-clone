import {
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
  ADDING_MESSAGES_START,
  ADDING_MESSAGES_SUCCESS,
  ADDING_MESSAGES_FAILURE
} from "./messages.types";
import { getRequest, postRequest } from "../utils/request.utils";

export const getMessagesAction = channelId => async dispatch => {
  console.log("CHANNEL ID: ", channelId);
  await getRequest(
    {
      types: {
        start: GET_MESSAGES_START,
        success: GET_MESSAGES_SUCCESS,
        failure: GET_MESSAGES_FAILURE
      },
      refLocation: "messages",
      childId: channelId
    },
    dispatch
  );
};

export const addMessageAction = (channelId, message) => async dispatch => {
  //   FIXME: this works but is undefined.. most likely missing id of newly generated message
  postRequest(
    {
      types: {
        start: ADDING_MESSAGES_START,
        success: ADDING_MESSAGES_SUCCESS,
        failure: ADDING_MESSAGES_FAILURE
      },
      refLocation: "messages",
      childId: channelId,
      postObj: message
    },
    dispatch
  );
};
