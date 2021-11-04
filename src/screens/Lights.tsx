//=================
// IMPORTS
//=================

import { IonContent, IonList, IonPage } from "@ionic/react";
import React, { useEffect, useState } from "react";
import TabNavigator from "../components/TabNavigator";
import AppHeader from "../components/AppHeader";
import { getLightCards } from "../utility/functions";
import {
  cacheSettingsState,
  getConfigSettings,
} from "../storage/CapacitorStorage";
import { useHistory } from "react-router";

//=====================================================
// Lights page
// Contains a list of LARGE cards which allows editing
//=====================================================

const Lights: React.FC = () => {
  const history = useHistory();

  const [devices, setDevices] = useState<typeof deviceList[]>([]);
  var deviceList: any = [];

  const cacheSettings = cacheSettingsState;

  //updates page when storage cache updates or history is used
  useEffect(() => {
    //get storage and check if ip and username has been stored
    getConfigSettings().then((value) => {
      if (!value.hueIp || !value.hueUsername) {
      } else if (value.hueIp !== "" && value.hueUsername !== "") {
        getList(value.hueIp, value.hueUsername);
      }
    });
    //listens for history event and refreshes device list
    history.listen(() => {
      getConfigSettings().then((value) => {
        getList(value.hueIp, value.hueUsername);
      });
    });
  }, [cacheSettings, history]);

  //retrieves list of devices currently discovered on the bridge
  const getList = async (hueIp: string, hueUsername: string) => {
    if (hueUsername !== "" || hueIp !== "") {
      const lights: any = await getLightCards(hueIp, hueUsername);
      setDevices(lights);
    } else {
      setDevices([]);
    }
  };

  return (
    <IonPage id="lights">
      <AppHeader pageTitle="My Lights" />
      <IonContent className="ion-padding">
        <IonList>{devices}</IonList>
      </IonContent>
      <TabNavigator />
    </IonPage>
  );
};

export default Lights;
