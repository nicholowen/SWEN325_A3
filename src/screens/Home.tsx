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
import { useHistory, useLocation } from "react-router";
import { getLightList } from "../utility/functions";
import { getIP } from "../api/FirebaseApi";
import {
  cacheLightState,
  cacheSettingsState,
  getConfigSettings,
} from "../storage/CapacitorStorage";

const Home: React.FC = () => {
  const history = useHistory();

  const [bridgeDiscovered, setBridgeDiscovered] = useState(false);
  const [usernameDiscovered, setUsernameDiscovered] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  const [devices, setDevices] = useState<typeof deviceList[]>([]);
  const [email, setEmail] = useState("");

  var deviceList = [];

  const cacheSettings = cacheSettingsState;
  const cacheLightConfig = cacheLightState;

  useEffect(() => {
    getConfigSettings().then((value) => {
      console.log("CHECKING", value.hueIp, value.hueUsername);
      if (!value.hueIp || !value.hueUsername) {
        console.log("here");
        setBridgeDiscovered(false);
      } else if (value.hueIp !== "" && value.hueUsername !== "") {
        console.log(value.hueIp, value.hueUsername);
        setBridgeDiscovered(true);
        getList(value.hueIp, value.hueUsername);
      }
    });
    history.listen(() => {
      getConfigSettings().then((value) => {
        getList(value.hueIp, value.hueUsername);
      });
    });
  }, [cacheSettings, history]);

  const getList = async (hueIp: string, hueUsername: string) => {
    if (hueUsername !== "" || hueIp !== "") {
      const lights: any = await getLightList(hueIp, hueUsername);
      setDevices(lights);
    } else {
      setDevices([]);
    }
  };

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
