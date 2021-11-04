//=================
// IMPORTS
//=================

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from "./firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  defaultConfigSettings,
  saveConfigSettings,
  getConfigSettings,
} from "../storage/CapacitorStorage";

//=========================
// Database Initialization
//=========================

firebase.initializeApp(firebaseConfig);

//===============================================================
// Authentication requests to Firebase API
// Returns: success
//===============================================================
export const LoginUser = async (email, password) => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const RegisterUser = async (email, password) => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    storeUsername(email);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const LogoutUser = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    saveConfigSettings(defaultConfigSettings);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//===============================================
// Sets empty document in firebase with username
// as document name
//===============================================

export const storeUsername = (username) => {
  firebase
    .firestore()
    .collection("users")
    .doc(username)
    .set({})
    .then(() => {
      console.log("profile created");
    });
};

//===============================================
// Stores IP address of the Hue Bridge
// Merges with existing fields
//===============================================
export const storeIp = async (ip) => {
  try {
    const username = (await getConfigSettings()).email;
    const db = firebase.firestore();
    db.collection("users").doc(username).set(
      {
        hueIp: ip,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};

//===============================================
// Stores generated Username of the Hue Bridge
// Merges with existing fields
//===============================================

export const storeHueUsername = async (hueUsername) => {
  try {
    const username = (await getConfigSettings()).email;
    const db = firebase.firestore();
    db.collection("users").doc(username).set(
      {
        hueUsername: hueUsername,
      },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};

//=================================================
// Retrieves the IP address and generated Username
// from the database and stores locally
//=================================================

export const getAllData = async (email) => {
  try {
    console.log(email);
    const db = firebase.firestore();
    const ref = db.collection("users").doc(email);
    const doc = await ref.get();
    console.log(doc.data());
    if (doc.exists) {
      console.log("here");
      console.log(doc.id);
      console.log(doc.data().hueIp, doc.data().hueUsername);
      var defaultSettings = {
        email: doc.id,
        hueIp: doc.data().hueIp,
        hueUsername: doc.data().hueUsername,
      };
      // console.log(defaultSettings);
      saveConfigSettings(defaultSettings);
      return doc.data();
      // });
    }
  } catch (error) {
    console.log(error);
  }
};
