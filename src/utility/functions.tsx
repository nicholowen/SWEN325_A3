//=================
// IMPORTS
//=================

import { savedLights } from "../api/HueApi";
import DeviceCard from "../components/DeviceCard";
import DeviceListItem from "../components/DeviceListItem";

//==============================================
// Generates Device Cards (has settings option)
// Returns array of Card components
//==============================================

export const getLightCards = async (hueIp: string, hueUsername: string) => {
  const data: any = await savedLights(hueIp, hueUsername);
  const deviceList: any = [];

  for (var i in data) {
    console.log(data[i].name);
    deviceList.push(
      <DeviceCard
        id={i}
        hueIp={hueIp}
        hueUsername={hueUsername}
        key={i}
        name={data[i].name}
        on={data[i].state.on}
        bri={data[i].state.bri}
      />
    );
  }

  return deviceList;
};

//===================================================
// Generates Device *LIST* Cards (simple appearance)
// Returns array of Card components
//===================================================

export const getLightList = async (hueIp: string, hueUsername: string) => {
  const data: any = await savedLights(hueIp, hueUsername);
  const deviceList: any = [];
  console.log(data);
  if (data) {
    for (var i in data) {
      if (data[i].error) return;
      deviceList.push(
        <DeviceListItem
          id={i}
          hueIp={hueIp}
          hueUsername={hueUsername}
          key={i}
          name={data[i].name}
          on={data[i].state.on}
          bri={data[i].state.bri}
        />
      );
    }
  }

  return deviceList;
};

//========================================
// Authentication validation
// Returns validity of email and password
// for both login and registration pages
//========================================

export const validateAuthParameters = (
  email: string,
  password: string,
  confirmPassword: string,
  login: boolean
) => {
  // email validity regex
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (email.trim() === "" || password.trim() === "") {
    console.log("Username and password are required");
    return false;
  }
  if (!re.test(email)) {
    alert("Email is not valid");
    return false;
  }
  if (!login) {
    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
      return false;
    }

    if (confirmPassword.trim() === "") {
      console.log("Please confirm your password");
      return false;
    }
  }
  if (password.length < 6) {
    console.log("Password must be 6 or more characters!");
    return false;
  }
  return true;
};
