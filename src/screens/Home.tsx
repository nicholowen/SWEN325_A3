//=================
// IMPORTS
//=================

import {
  IonButton,
  IonContent,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import TabNavigator from "../components/TabNavigator";
import AppHeader from "../components/AppHeader";
import { useHistory } from "react-router";
import { getLightList } from "../utility/functions";
import { getIP } from "../api/FirebaseApi";
import {
  cacheSettingsState,
  getConfigSettings,
} from "../storage/CapacitorStorage";

//====================================================
// Main home page
// Contains a list of lights which can be manipulated
//====================================================

const Home: React.FC = () => {
  const history = useHistory();

  const [bridgeDiscovered, setBridgeDiscovered] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  const [devices, setDevices] = useState<typeof deviceList[]>([]);

  var deviceList = [];

  const cacheSettings = cacheSettingsState;

  //updates page when storage cache updates or history is used
  useEffect(() => {
    //get storage and check if ip and username has been stored
    getConfigSettings().then((value) => {
      if (!value.hueIp || !value.hueUsername) {
        setBridgeDiscovered(false);
      } else if (value.hueIp !== "" && value.hueUsername !== "") {
        console.log(value.hueIp, value.hueUsername);
        setBridgeDiscovered(true);
        getList(value.hueIp, value.hueUsername);
      }
    });
    //listens for history updates and refreshes device list
    history.listen(() => {
      getConfigSettings().then((value) => {
        getList(value.hueIp, value.hueUsername);
      });
    });
  }, [cacheSettings, history]);

  //retrieves list of devices currently discovered on the bridge
  const getList = async (hueIp: string, hueUsername: string) => {
    if (hueUsername !== "" || hueIp !== "") {
      const lights: any = await getLightList(hueIp, hueUsername);
      setDevices(lights);
    } else {
      setDevices([]);
    }
  };

  //Conditional rendering based on whether the
  //bridge or lights have been discovered on this account
  const getConnected = () => {
    if (!bridgeDiscovered) {
      return (
        <IonContent>
          <IonLabel>
            You aren't connected to any bridges at the moment!
          </IonLabel>
          <IonButton
            onClick={() => {
              history.push("/findBridge");
            }}
          >
            Discover Bridge
          </IonButton>
          <IonButton
            onClick={() => {
              getIP();
            }}
          >
            Get ip
          </IonButton>
        </IonContent>
      );
    }
    //device list will be empty if no lights have been discovered
    if (!devices || devices.length === 0) {
      return (
        <IonContent>
          <IonLabel>
            You are connected to a bridge, but no lights have been added
          </IonLabel>
          <IonButton onClick={() => history.push("/findLights")}>
            Discover Lights
          </IonButton>
        </IonContent>
      );
    }
    if (!showDevices) {
      setShowDevices(true);
    }
  };

  return (
    <IonPage>
      <AppHeader pageTitle="Home" />
      <IonContent className="ion-padding">
        {getConnected()}
        <IonList>{devices}</IonList>
      </IonContent>
      <TabNavigator />
    </IonPage>
  );
};

export default Home;
