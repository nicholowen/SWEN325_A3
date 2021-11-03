import {
  IonButton,
  IonContent,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import TabNavigator from "../components/TabNavigator";
import AppHeader from "../components/AppHeader";
import { useHistory } from "react-router";
import { getLightList } from "../utility/functions";
import { getIP } from "../api/FirebaseApi";
import { getBridgeStorage } from "../storage/storage";

const Home: React.FC = () => {
  const history = useHistory();
  const [bridgeDiscovered, setBridgeDiscovered] = useState(false);
  const [showDevices, setShowDevices] = useState(false);
  const [devices, setDevices] = useState<typeof deviceList[]>([]);
  var deviceList = [];

  useEffect(() => {
    bridge().then(() => {
      if (bridgeDiscovered) {
        getList();
      }
    });
  }, []);

  useEffect(() => {
    history.listen(() => {
      bridge().then(() => {
        if (bridgeDiscovered) {
          getList();
        }
      });
    });
  }, [history]);

  const bridge = async () => {
    const bridge = await getBridgeStorage();
    if (bridge) {
      setBridgeDiscovered(true);
    } else {
      setBridgeDiscovered(false);
    }
  };

  const getList = async () => {
    const lights: any = await getLightList();
    setDevices(lights);
  };

  const getConnected = () => {
    if (!bridgeDiscovered) {
      return (
        <IonContent>
          <IonLabel>
            You aren't connected to any bridges at the moment!
          </IonLabel>
          <IonButton
            onClick={() => {
              history.push("/findBridge");
            }}
          >
            Discover Bridge
          </IonButton>
          <IonButton
            onClick={() => {
              getIP();
            }}
          >
            Get ip
          </IonButton>
        </IonContent>
      );
    }
    if (!devices || devices.length === 0) {
      return (
        <IonContent>
          <IonLabel>
            You are connected to a bridge, but no lights have been added
          </IonLabel>
          <IonButton onClick={() => history.push("/findLights")}>
            Discover Lights
          </IonButton>
        </IonContent>
      );
    }
    if (!showDevices) {
      setShowDevices(true);
    }
  };

  return (
    <IonPage>
      <AppHeader pageTitle="Home" />
      <IonContent className="ion-padding">
        {getConnected()}
        <IonList>{showDevices && devices}</IonList>
      </IonContent>
      <TabNavigator />
    </IonPage>
  );
};

export default Home;
