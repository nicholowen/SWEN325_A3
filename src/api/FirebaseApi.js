//============
// IMPORTS
//============

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from "./firebase.config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

//=========================
// Database Initialization
//=========================

firebase.initializeApp(firebaseConfig);

//==================================
// Signs in with email and password
// Returns: success
//==================================
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

//===================================
// Registers with email and password
// Returns: success
//===================================
export const RegisterUser = async (email, password) => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password);
    StoreUsername(email);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

//==================================================
// De-authenticates user and clears local storage
// Returns: success
//==================================================
export const LogoutUser = async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    localStorage.clear();
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

export const StoreUsername = (username) => {
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
// Merges with current information
//===============================================
export const StoreIP = async (ip) => {
  try {
    const username = localStorage.getItem("email");
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
// Merges with current information
//===============================================

export const storeHueUsername = (hueUsername) => {
  try {
    const username = localStorage.getItem("email");
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

//===============================================
// Returns the IP of the Hue Bridge
//===============================================
export const getIP = () => {
  try {
    const username = localStorage.getItem("email");
    const db = firebase.firestore();
    db.collection("users")
      .doc(username)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document Data: ", doc.data().hueIp);
        } else {
          console.log("Error getting document");
        }
      });
  } catch (error) {
    console.log(error);
  }
};

//==================================================
// Returns the generated Username of the Hue Bridge
//==================================================

export const getHueUsername = () => {
  try {
    const username = localStorage.getItem("email");
    const db = firebase.firestore();
    var promise = db.collection("users").doc(username);

    promise.get().then((snapshot) => {
      let field = snapshot.get("hueUsername");
      console.log(field);
      return field;
    });

    // .then(function (doc) {
    //   if (doc.exists) {
    //     console.log(doc.data().hueUsername);
    //     return doc.data().hueUsername;
    //   } else {
    //     console.log("Error getting document");
    //   }
    // })
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

    if (doc.exists) {
      console.log("Document Data: ", doc.data().hueIp);
      localStorage.setItem("hueUsername", doc.data().hueUsername);
      localStorage.setItem("bridge", doc.data().hueIp);
      return true;
    } else {
      console.log("Error getting document");
    }
  } catch (error) {
    console.log(error);
  }
};
