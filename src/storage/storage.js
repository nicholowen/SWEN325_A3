import { getAllData, getHueUsername, getIP } from "../api/FirebaseApi";

export const getDatabaseData = async (email) => {
  return getAllData(email);
};

export const getEmailStorage = () => {
  return localStorage.getItem("email");
};

export const getBridgeStorage = () => {
  return localStorage.getItem("bridge");
};

export const getHueUsernameStorage = async () => {
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

export function generateUUID(noOfDigits) {
  let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ";
  let uuid = [];
  for (let i = 0; i < noOfDigits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join("");
}