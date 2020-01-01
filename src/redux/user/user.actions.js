import {
  FETCH_CURRENT_USER_START,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILED,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILED
} from "./user.types";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

export const fetchCurrentUser = (dispatch, history) => {
  const unsubscribeFromAuth = () =>
    auth.onAuthStateChanged(async userAuth => {
      dispatch({ type: FETCH_CURRENT_USER_START });
      if (userAuth) {
        const userRef = await createUserProfileDocument(
          //   "collections",
          userAuth
        );

        await userRef
          .get()
          .then(snapShot => {
            dispatch({
              type: FETCH_CURRENT_USER_SUCCESS,
              payload: {
                id: snapShot.id,
                ...snapShot.data()
              }
            });
            history.push("/slack-app");
          })
          .catch(error =>
            dispatch({ type: FETCH_CURRENT_USER_FAILED, payload: error })
          );
      } else {
        // handles when there is no user to get back (logged out)
        dispatch({ type: FETCH_CURRENT_USER_SUCCESS, payload: null });
      }
    });
  return unsubscribeFromAuth();
};

export const signOutUser = (dispatch, history) => {
  dispatch({ type: SIGN_OUT_START });
  auth
    .signOut()
    .then(() => {
      dispatch({ type: SIGN_OUT_SUCCESS });
      history.push("/login");
    })
    .catch(err => dispatch({ type: SIGN_OUT_FAILED, payload: err.message }));
};
