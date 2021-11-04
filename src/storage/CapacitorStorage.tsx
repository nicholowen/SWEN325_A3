//=================
// IMPORTS
//=================

import { Storage } from "@capacitor/storage";

//=======================================================
// BRIDGE STORAGE
//
// Stores general authentication information for Hue Api
//=======================================================

//interface initialization
export interface BridgeConfigSettings {
  email: string;
  hueIp: string;
  hueUsername: string;
}

//default settings - will be applied on log-out
export const defaultConfigSettings: BridgeConfigSettings = {
  email: "",
  hueIp: "",
  hueUsername: "",
};

//cache settings - is queried with useEffect
export var cacheSettingsState: BridgeConfigSettings = Object.assign(
  [],
  defaultConfigSettings
);

//saves string from JSON format interface
export const saveConfigSettings = async (settings: BridgeConfigSettings) => {
  const result = await Storage.set({
    key: "bridgeSettings",
    value: JSON.stringify(settings),
  })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  cacheSettingsState = settings;

  return result;
};

//returns JSON object from saved string
export const getConfigSettings = async (): Promise<BridgeConfigSettings> => {
  const result = await Storage.get({ key: "bridgeSettings" });

  if (typeof result.value === "string") {
    return JSON.parse(result.value) as BridgeConfigSettings;
  } else {
    return defaultConfigSettings;
  }
};

//====================================================
// LIGHT STORAGE
//
// Temporary storage for light parameters for Hue Api
//====================================================

//interface initialization
export interface LightConfig {
  id: string;
  hueIp: string;
  hueUsername: string;
  name: string;
}

//default settings - will be applied on log-out
export const defaultLightConfig: LightConfig = {
  id: "",
  hueIp: "",
  hueUsername: "",
  name: "",
};

//cache settings - is queried with useEffect
export var cacheLightState: LightConfig = Object.assign([], defaultLightConfig);

//saves string from JSON format interface
export const saveLightConfig = async (config: LightConfig) => {
  const result = await Storage.set({
    key: "lightConfig",
    value: JSON.stringify(config),
  })
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  cacheLightState = config;

  return result;
};

//returns JSON object from saved string
export const getLightConfig = async (): Promise<LightConfig> => {
  const result = await Storage.get({ key: "lightConfig" });

  if (typeof result.value === "string") {
    return JSON.parse(result.value) as LightConfig;
  } else {
    return defaultLightConfig;
  }
};
