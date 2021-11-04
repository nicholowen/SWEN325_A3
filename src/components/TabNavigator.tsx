//=================
// IMPORTS
//=================

import React from "react";
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";

import { homeOutline, sunnyOutline } from "ionicons/icons";

const TabNavigator: React.FC = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home">
        <IonIcon icon={homeOutline} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="lights" href="/lights">
        <IonIcon icon={sunnyOutline} />
        <IonLabel>Lights</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default TabNavigator;
