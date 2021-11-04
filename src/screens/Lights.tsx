//=================
// IMPORTS
//=================

import { IonButton, IonContent, IonList, IonPage } from "@ionic/react";
import React, { useState } from "react";
import TabNavigator from "../components/TabNavigator";
import AppHeader from "../components/AppHeader";
import { getLightCards } from "../utility/functions";

const Lights: React.FC = () => {
  const [devices, setDevices] = useState<typeof deviceList[]>([]);
  var deviceList: any = [];

  const getSavedLights = async (hueIp: string, hueUsername: string) => {
    const lights: any = await getLightCards(hueIp, hueUsername);
    setDevices(lights);
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
