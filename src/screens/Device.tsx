import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import AppHeader from "../components/AppHeader";
import TabNavigator from "../components/TabNavigator";

const Device: React.FC<{ deviceName: string }> = (props) => {
  return (
    <IonPage id="groups">
      <AppHeader pageTitle={props.deviceName} />

      <IonContent className="ion-padding"></IonContent>
      <TabNavigator />
    </IonPage>
  );
};

export default Device;
