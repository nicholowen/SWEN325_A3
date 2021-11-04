import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { deleteHueLight, renameLight } from "../api/HueApi";
import AppHeader from "../components/AppHeader";
import TabNavigator from "../components/TabNavigator";
import {
  cacheLightState,
  defaultLightConfig,
  getLightConfig,
  saveLightConfig,
} from "../storage/CapacitorStorage";

const LightSettings: React.FC = () => {
  const history = useHistory();
  const lightCache = cacheLightState;

  const [nameInput, setNameInput] = useState("");
  const [id, setId] = useState("");
  const [hueIp, setHueIp] = useState("");
  const [hueUsername, setHueUsername] = useState("");
  const [name, setName] = useState("");

  const [showDeleteSuccessToast, setShowDeleteSuccessToast] = useState(false);
  const [showDeleteErrorToast, setShowDeleteErrorToast] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  useEffect(() => {
    getLightConfig().then((value) => {
      console.log(value);
      setId(value.id);
      setHueIp(value.hueIp);
      setHueUsername(value.hueUsername);
      setName(value.name);
    });
  }, [lightCache]);

  const rename = async () => {
    const renamed = await renameLight(id, nameInput, hueIp, hueUsername);
    if (renamed) {
      setShowSuccessToast(true);
    } else {
      setShowErrorToast(true);
    }
  };

  const deleteLight = async () => {
    const deleted = await deleteHueLight(id, hueIp, hueUsername);
    if (deleted) {
      setShowDeleteSuccessToast(true);
    } else {
      setShowDeleteErrorToast(true);
    }
  };

  return (
    <IonPage>
      <AppHeader pageTitle={name} />
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Light Name</IonLabel>
          <IonInput
            placeholder={name}
            onIonChange={(e: any) => setNameInput(e.target.value)}
          ></IonInput>
        </IonItem>
        <IonButton onClick={() => rename()}>Save</IonButton>
        <IonButton
          onClick={() => {
            saveLightConfig(defaultLightConfig);
            setNameInput("");
            history.push("/lights");
          }}
        >
          Cancel
        </IonButton>
        <IonButton onClick={() => deleteLight()}>DELETE</IonButton>

        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => {
            setShowSuccessToast(false);
            saveLightConfig(defaultLightConfig);
            setNameInput("");
            history.push("/lights");
          }}
          message="Light has been renamed!"
          duration={2000}
        />
        <IonToast
          isOpen={showErrorToast}
          onDidDismiss={() => {
            setShowErrorToast(false);
          }}
          message="Cannot rename light!"
          duration={2000}
        />
        <IonToast
          isOpen={showDeleteSuccessToast}
          onDidDismiss={() => {
            setShowDeleteSuccessToast(false);
            saveLightConfig(defaultLightConfig);
            setNameInput("");
            history.push("/lights");
          }}
          message="Light has been deleted!"
          duration={2000}
        />
        <IonToast
          isOpen={showDeleteErrorToast}
          onDidDismiss={() => {
            setShowDeleteErrorToast(false);
          }}
          message="Cannot delete light!"
          duration={2000}
        />
      </IonContent>
      <TabNavigator />
    </IonPage>
  );
};

export default LightSettings;
