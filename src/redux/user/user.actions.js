import {
  GET_CURRENT_USER_START,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_FAILURE,
  SIGN_OUT_START,
  SIGN_OUT_SUCCESS,
  SIGN_OUT_FAILURE
} from "./user.types";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

export const fetchCurrentUser = (dispatch, history) => {
  dispatch({ type: GET_CURRENT_USER_START });
  const unsubscribeFromAuth = () =>
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(
          //   "collections",
          userAuth
        );
        const token = await auth.currentUser.getIdToken();

        await userRef
          .get()
          .then(snapShot => {
            dispatch({
              type: GET_CURRENT_USER_SUCCESS,
              payload: {
                id: snapShot.id,
                token: token,
                ...snapShot.data()
              }
            });
            history.push("/slack-app");
          })
          .catch(error =>
            dispatch({ type: GET_CURRENT_USER_FAILURE, payload: error })
          );
      } else {
        // handles when there is no user to get back (logged out)
        dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: null });
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
    .catch(err => dispatch({ type: SIGN_OUT_FAILURE, payload: err.message }));
};
