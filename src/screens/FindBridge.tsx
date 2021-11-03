import {
  IonButton,
  IonContent,
  IonPage,
  IonToast,
  useIonToast,
} from "@ionic/react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { storeHueUsername } from "../api/FirebaseApi";
import { createUser, discoverBridge } from "../api/HueApi";
import AppHeader from "../components/AppHeader";
import TabNavigator from "../components/TabNavigator";

//================================================
// Search page for bridge discovery
// Navigates back to home on successful discovery
//================================================

const FindBridge: React.FC = (props) => {
  const history = useHistory();
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const discover = async () => {
    const check = await discoverBridge();
    if (check) {
      const data = await createUser();
      for (var i in data) {
        if (data[i].success) {
          const hueUsername = data[i].success.username;
          storeHueUsername(hueUsername);
          localStorage.setItem("hueUsername", hueUsername);
          console.log(hueUsername);
        } else {
          console.log(data[i].error.description);
          setShowErrorToast(true);
          return;
        }
      }
      console.log(localStorage.getItem("bridge"));
      setShowSuccessToast(true);
    }
  };

  return (
    <IonPage id="findBridge">
      <AppHeader pageTitle="Search for Bridge" />

      <IonContent className="ion-padding">
        <IonButton
          onClick={() => {
            discover();
          }}
        >
          Search for Bridges
        </IonButton>
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => {
            setShowSuccessToast(false);
            history.push("/home");
          }}
          message="Bridge found successfully."
          duration={2000}
        />
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => {
            setShowErrorToast(false);
          }}
          message="Link button not pressed - Press the link button and try again."
          duration={2000}
        />
      </IonContent>
      <TabNavigator />
    </IonPage>
  );
};

export default FindBridge;
