import {
  IonButton,
  IonContent,
  IonLabel,
  IonPage,
  IonRow,
  IonSpinner,
  IonToast,
  useIonToast,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { discoverBridge, getNewLights, searchForLights } from "../api/HueApi";
import AppHeader from "../components/AppHeader";
import TabNavigator from "../components/TabNavigator";
import { AuthContext } from "../AuthContext";

//=================================================================
// Search page for light discovery
// Activates device search and intermittently checks for response.
// Does not navigate away automatically as sometimes it may not
// find lights immediately
//=================================================================

const FindLights: React.FC = (props) => {
  const { lightsExist, setLightsExist } = React.useContext(AuthContext);

  const history = useHistory();
  const [bridgeDiscovered, setBridgeDiscovered] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [lightsFound, setLightsFound] = useState(false);
  const [numLights, setNumLights] = useState<number>(0);
  const [hasScanned, setHasScanned] = useState(false);
  const [searchComplete, setSearchComplete] = useState(false);

  useEffect(() => {
    bridge();
  }, [bridgeDiscovered]);

  const bridge = () => {
    if (localStorage.getItem("lights") !== null) {
      setBridgeDiscovered(true);
    }
  };

  console.log(isActive);

  useEffect(() => {}, [isActive]);

  const discover = async () => {
    setHasScanned(true);
    // Activate search beacon
    await searchForLights();

    // Stop timer after 20 seconds (20000ms)
    setTimeout(function () {
      clearInterval(timer);
      console.log("stopped");
      setIsActive(false);
      setSearchComplete(true);
    }, 20000);

    // Check for new lights eveny 2 seconds until timeout
    const timer = setInterval(async function () {
      const res: any = await getNewLights();
      console.log("checking...");
      console.log(res.data);
      var num = 0;

      if (res.data.lastscan !== "active") {
        console.log("stopped");
        clearInterval(timer);
        setIsActive(false);
      } else {
        setIsActive(true);
      }
      for (var i in res.data) {
        const number = i;
        const name = res.data[i].name;
        if (name && parseInt(number)) {
          num++;
          setNumLights(num);
          console.log(number, name, numLights);
          setLightsFound(true);
        }
      }
    }, 2000);
  };

  return (
    <IonPage id="findLights">
      <AppHeader pageTitle="Search for Lights" />

      <IonContent className="ion-padding">
        <IonRow>
          <IonButton
            onClick={async () => {
              await discover();
            }}
          >
            Search for Lights
          </IonButton>
        </IonRow>
        {/* Conditional rendering based on search state */}
        <IonRow>{!hasScanned && <IonLabel>...</IonLabel>}</IonRow>
        <IonRow>
          {hasScanned && isActive && (
            <IonLabel>
              Searching for lights... <IonSpinner name="circles" />
            </IonLabel>
          )}
          {hasScanned && searchComplete && (
            <IonLabel>Search complete.</IonLabel>
          )}
        </IonRow>
        <IonRow>
          {lightsFound && searchComplete && (
            <IonLabel>Found {numLights} lights</IonLabel>
          )}
          {!lightsFound && searchComplete && (
            <IonLabel>No new lights found.</IonLabel>
          )}
        </IonRow>
        <IonRow>
          {searchComplete && (
            <IonButton
              onClick={() => {
                history.push("/home");
              }}
            >
              Done
            </IonButton>
          )}
        </IonRow>
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => {
            setShowToast(false);
            history.push("/home");
          }}
          message="Lights found successfully."
          duration={1500}
        />
      </IonContent>
      <TabNavigator />
    </IonPage>
  );
};

export default FindLights;
