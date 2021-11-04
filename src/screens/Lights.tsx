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

const Lights: React.FC = () => {
  const history = useHistory();

  const [devices, setDevices] = useState<typeof deviceList[]>([]);
  var deviceList: any = [];

  const cacheSettings = cacheSettingsState;

  useEffect(() => {
    getConfigSettings().then((value) => {
      console.log("CHECKING", value.hueIp, value.hueUsername);
      if (!value.hueIp || !value.hueUsername) {
      } else if (value.hueIp !== "" && value.hueUsername !== "") {
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
        {/* <IonButton onClick={getSavedLights}>Search</IonButton> */}
        <IonList>{devices}</IonList>
      </IonContent>
      <TabNavigator />
    </IonPage>
  );
};

export default Lights;
