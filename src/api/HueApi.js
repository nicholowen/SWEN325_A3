//=================
// IMPORTS
//=================
const axios = require("axios");

//Standard URL: "https://[bridge ip address]/api/[generated username/"

//==============================================================================
// POST - Configures the Hue Bridge to create an
// authorized user.
// Returns JSON object
//
// Body: {"devicetype": "username"}
// Sample response: [{"success":{"username": "83b7780291a6ceffbe0bd049104df"}}]
//==============================================================================

export const createUser = async (hueIp, email) => {
  try {
    const res = await axios.post("http://" + hueIp + "/api", {
      devicetype: email,
    });

    const data = res.data;
    console.log("huedata ", data);
    return data;
  } catch (err) {
    console.log(err);
  }
};

//==============================================================================
// PUT - Toggle a light that exists on Bridge network
//
// Body: {"on": bool}
//==============================================================================

export const toggleLight = async (id, on, hueIp, hueUsername) => {
  try {
    return await axios.put(
      "http://" + hueIp + "/api/" + hueUsername + "/lights/" + id + "/state",
      {
        on: on,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

//==============================================================================
// PUT - Control brightness of a light that exists on Bridge network
//
// Body: {"bri": [number 1 -245]}
//==============================================================================

export const controlBrightness = async (id, bri, hueIp, hueUsername) => {
  try {
    return await axios.put(
      "http://" + hueIp + "/api/" + hueUsername + "/lights/" + id + "/state",
      {
        bri: bri,
      }
    );
  } catch (err) {
    console.log(err);
  }
  return bri;
};

export const renameLight = async (id, name, hueIp, hueUsername) => {
  try {
    return await axios.put(
      "http://" + hueIp + "/api/" + hueUsername + "/lights/" + id,
      {
        name: name,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const deleteHueLight = async (id, hueIp, hueUsername) => {
  try {
    await axios.delete(
      "http://" + hueIp + "/api/" + hueUsername + "/lights/" + id
    );
    return true;
  } catch (error) {
    console.log(error);
  }
};

//===============================================================================
// POST - Activates a beacon for 40 seconds that looks for devices.
//
// Sample Response : [ { "success": { "/lights": "Searching for new devices" }}]
//===============================================================================

export const searchForLights = async (hueIp, hueUsername) => {
  try {
    console.log(await hueUsername);
    if (hueUsername) {
      const res = await axios.post(
        "http://" + hueIp + "/api/" + hueUsername + "/lights/"
      );
      return res;
    }
  } catch (err) {
    console.log(err);
  }
};

//======================================================
// GET - Queries the scanned 'NEW group' of new devices.
//
// Sample Response :
//    {
//    "7": {"name": "Hue Lamp 7"},
//    "8": {"name": "Hue Lamp 8"},
//    "lastscan": "2012-10-29T12:00:00"
//    }
//======================================================

export const getNewLights = async (hueIp, hueUsername) => {
  const res = await axios.get(
    "http://" + hueIp + "/api/" + hueUsername + "/lights/new"
  );
  return res;
};

//===============================================================================
// FETCH - Fetches all bridges connected to network one step up from local Wi-Fi
// Does a timed fetch to all bridge IPs - stores and returns true if ip of the
// bridge is valid (does not time out)
//===============================================================================

export async function discoverBridge() {
  try {
    const res = await fetchWithTimeout("https://discovery.meethue.com/");
    const bridgeIps = await res.json();

    for (let i = 0; i < bridgeIps.length; i++) {
      try {
        const bridge = bridgeIps[i].internalipaddress;
        console.log(bridge);
        await fetchWithTimeout("http://" + bridge + "/api");
        return bridge;
      } catch (error) {
        console.log("this is not the bridge");
        continue;
      }
    }
  } catch (err) {
    console.log("thiserror");
    console.error(err);
  }
}

//============================
// Fetch time out function
//============================

const fetchWithTimeout = (url) => {
  const timeout = 1500;
  const { ...fetchOptions } = timeout;

  try {
    return Promise.race([
      fetch(url, fetchOptions),
      new Promise((_, reject) => {
        setTimeout(() => {
          reject(
            new Error(
              `Request for ${url} timed out after ${timeout} milliseconds`
            )
          );
        }, timeout);
      }),
    ]);
  } catch (error) {
    console.log("ERROR HERE" + error);
  }
};

//======================================================================
// GET - Get all lights that have been discovered on the Bridge network
// Returns JSON containing device data
//
// Response: State and other metadata pertaining to said device
// (id, on-state, brightness etc)
//======================================================================

export const savedLights = async (hueIp, hueUsername) => {
  try {
    console.log(hueUsername);
    let res = await axios.get(
      "http://" + hueIp + "/api/" + hueUsername + "/lights/"
    );
    let data = res.data;

    return data;
  } catch (err) {
    console.log(err);
  }
};
