import { database } from "../../firebase/firebase.utils";

export const getRequest = (options, dispatch) => {
  const { types, refLocation, childId } = options;
  // debugger;
  dispatch({ type: types.start }); // do we need this? - Sam

  try {
    let ref;

    if (refLocation === "messages") {
      ref = database.ref(refLocation).child(childId);
    } else if (refLocation === "channels") {
      ref = database.ref(refLocation);
    }

    ref.on("value", dataSnapShot => {
      let values = [];

      // Redundant to call val twice, but when you click on the welp channel,
      // the app breaks. We cannot use Object.values on something that returns null - Sam
      if (dataSnapShot.val() !== null) {
        values = Object.values(dataSnapShot.val());
      }

      dispatch({
        type: types.success,
        payload: values
      });
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
