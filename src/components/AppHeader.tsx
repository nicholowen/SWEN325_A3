//=================
// IMPORTS
//=================

import React from "react";
import { IonHeader, IonMenuButton, IonTitle, IonToolbar } from "@ionic/react";

const AppHeader: React.FC<{ pageTitle: string }> = (props) => {
  return (
    <IonHeader>
      <IonToolbar color="primary">
        <IonMenuButton slot="start"></IonMenuButton>
        <IonTitle>{props.pageTitle}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;
