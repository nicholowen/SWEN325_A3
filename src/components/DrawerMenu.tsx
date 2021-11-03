import React from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
} from "@ionic/react";
import { LogoutUser } from "../api/FirebaseApi";
import { useHistory } from "react-router";

export const DrawerMenu: React.FC = () => {
  const history = useHistory();

  return (
    <IonMenu contentId="main" type="overlay" side="start">
      <IonContent>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem
            button
            onClick={() => {
              history.push("/findLights");
            }}
          >
            Search for Lights
          </IonItem>
          <IonItem
            button
            onClick={() => {
              LogoutUser();
              history.push("/login");
            }}
          >
            Logout
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default DrawerMenu;
