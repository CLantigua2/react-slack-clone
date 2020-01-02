import { database } from "../../firebase/firebase.utils";

export const getRequest = async (options, dispatch) => {
  const { types, refLocation, childId } = options;
  // debugger;
  dispatch({ type: types.start });
  try {
    const temp = [];
    let ref;
    switch (refLocation) {
      case "messages":
        ref = await database.ref(refLocation).child(childId);
        break;
      case "channels":
        ref = await database.ref(refLocation);
        break;
      default:
        break;
    }
    await ref.on("child_added", async snapShot => {
      temp.push(snapShot.val());
    });
    await dispatch({
      type: types.success,
      payload: temp
    });
  } catch (err) {
    dispatch({ type: types.failure, payload: err.message });
  }
};

export const postRequest = async (options, dispatch) => {
  const { types, refLocation, childId, postObj } = options;
  dispatch({ type: types.start });
  try {
    let ref, key;
    const time = Date.now();
    switch (refLocation) {
      case "messages":
        ref = await database.ref(refLocation).child(childId);
        await ref.push().set(postObj);
        break;
      case "channels":
        ref = await database.ref(refLocation);
        // FIXME: currently getting me the child id
        // to the previous added value,
        // not the new one
        key = await ref.push().key;
        await Object.assign(postObj, { id: key, time });
        await ref.child(key).set(postObj);
        break;
      default:
        break;
    }
    dispatch({ type: types.success });
  } catch (err) {
    dispatch({ type: types.failure, payload: err.message });
  }
};
