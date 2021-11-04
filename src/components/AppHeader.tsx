//=================
// IMPORTS
//=================

import React from "react";
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVerticalOutline } from "ionicons/icons";

const AppHeader: React.FC<{ pageTitle: string }> = (props) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonMenuButton slot="start"></IonMenuButton>
        <IonButtons slot="end">
          <IonButton>
            <IonIcon slot="start" icon={ellipsisVerticalOutline} />
          </IonButton>
        </IonButtons>
        <IonTitle>{props.pageTitle}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;
