//=================
// IMPORTS
//=================

import { getAllData, getHueUsername, getIP } from "../api/FirebaseApi";

//====================
// EXPORTED Functions
//====================

export const getDatabaseData = async (email) => {
  return getAllData(email);
};

export const getEmailStorage = () => {
  return localStorage.getItem("email");
};

export const getBridgeStorage = () => {
  if (localStorage.getItem("bridge")) {
    return localStorage.getItem("bridge");
  } else return false;
};

export const getHueUsernameStorage = () => {
  return localStorage.getItem("hueUsername");
};

const getLightStorage = function (arrayName) {
  var thisArray = [];
  var fetchArrayObject = localStorage.getItem(arrayName);
  if (typeof fetchArrayObject !== "undefined") {
    if (fetchArrayObject !== null) {
      thisArray = JSON.parse(fetchArrayObject);
    }
  }
  return thisArray;
};

export const pushArrayItem = function (arrayName, arrayItem) {
  var existingArray = this.getArray(arrayName);
  existingArray.push(arrayItem);
  this.setItem(arrayName, JSON.stringify(existingArray));
};

//==========================================
// Generate Random string of (n) characters
//==========================================

export function generateUUID(n) {
  let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ";
  let uuid = [];
  for (let i = 0; i < n; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join("");
}
