import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD_mmjPxJtWRML8uSXA5Kq89WU1fnvHzZc",
  authDomain: "react-slack-app-9cae9.firebaseapp.com",
  databaseURL: "https://react-slack-app-9cae9.firebaseio.com",
  projectId: "react-slack-app-9cae9",
  storageBucket: "react-slack-app-9cae9.appspot.com",
  messagingSenderId: "259576922477",
  appId: "1:259576922477:web:fccc72c8d3fd6f777a1a64",
  measurementId: "G-QL6918RJ7R"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (err) {
      console.log("error creating user", err.message);
    }
  }

  return userRef;
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const database = firebase.database();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const timestamp = firebase.database.ServerValue.TIMESTAMP;
