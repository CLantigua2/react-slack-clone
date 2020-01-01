import {
  FETCHING_MESSAGES_START,
  FETCHING_MESSAGES_SUCCESS,
  FETCHING_MESSAGES_FAILED,
  ADDING_MESSAGES_START,
  ADDING_MESSAGES_SUCCESS,
  ADDING_MESSAGES_FAILED
} from "./messages.types";
import { database } from "../../firebase/firebase.utils";

export const getMessagesAction = channelId => async dispatch => {
  dispatch({ type: FETCHING_MESSAGES_START });
  try {
    let loadedMessages = [];
    const messagesRef = await database.ref("messages").child(channelId);
    await messagesRef.on("child_added", async snapShot => {
      loadedMessages.push(snapShot.val());
    });
    await dispatch({
      type: FETCHING_MESSAGES_SUCCESS,
      payload: loadedMessages
    });
  } catch (err) {
    dispatch({ type: FETCHING_MESSAGES_FAILED, payload: err.message });
  }
};

export const addMessageAction = (channelId, message) => async dispatch => {
  dispatch({ type: ADDING_MESSAGES_START });
  try {
    const messageRef = await database.ref("messages/").child(channelId);
    await messageRef.push().set(message);
    dispatch({ type: ADDING_MESSAGES_SUCCESS, payload: message });
  } catch (err) {
    dispatch({ type: ADDING_MESSAGES_FAILED, payload: err.message });
  }
};
