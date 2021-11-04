import { Storage } from "@capacitor/storage";

//storage key = 'bridgeSettings'

//interface

export const defaultConfigSettings: BridgeConfigSettings = {
  email: "",
  hueIp: "",
  hueUsername: "",
};

export var cacheSettingsState: BridgeConfigSettings = Object.assign(
  [],
  defaultConfigSettings
);

export interface BridgeConfigSettings {
  email: string;
  hueIp: string;
  hueUsername: string;
}

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

export const getConfigSettings = async (): Promise<BridgeConfigSettings> => {
  const result = await Storage.get({ key: "bridgeSettings" });

  if (typeof result.value === "string") {
    return JSON.parse(result.value) as BridgeConfigSettings;
  } else {
    return defaultConfigSettings;
  }
};
