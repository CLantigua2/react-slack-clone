import {
  ADDING_CHANNEL_START,
  ADDING_CHANNEL_SUCCESS,
  ADDING_CHANNEL_FAILED,
  FETCHING_CHANNEL_START,
  FETCHING_CHANNEL_SUCCESS,
  FETCHING_CHANNEL_FAILED,
  FETCHING_INDIVIDUAL_CHANNEL
} from "./channel.types";
import { database } from "../../firebase/firebase.utils";

export const addChannelAction = channelData => async dispatch => {
  dispatch({ type: ADDING_CHANNEL_START });
  try {
    const channelRef = await database.ref("channels/");
    const key = await channelRef.push().key;
    Object.assign(channelData, { id: key });

    await channelRef.child(key).set(channelData);
    dispatch({ type: ADDING_CHANNEL_SUCCESS, payload: channelData });
  } catch (err) {
    dispatch({ type: ADDING_CHANNEL_FAILED, payload: err.message });
  }
};

export const getAllChannels = async dispatch => {
  dispatch({ type: FETCHING_CHANNEL_START });
  try {
    const channelRef = await database.ref("channels/");
    let loadedChannels = [];
    await channelRef.on("child_added", async snapShot => {
      loadedChannels.push(snapShot.val());
    });
    await dispatch({
      type: FETCHING_CHANNEL_SUCCESS,
      payload: loadedChannels
    });
  } catch (err) {
    dispatch({ type: FETCHING_CHANNEL_FAILED, payload: err.message });
  }
};

export const getIndividualChannel = individualChannel => dispatch =>
  dispatch({
    type: FETCHING_INDIVIDUAL_CHANNEL,
    payload: individualChannel
  });
