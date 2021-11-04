//=================
// IMPORTS
//=================

import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { getAllData, LoginUser } from "../api/FirebaseApi";
import { getDatabaseData } from "../storage/storage";
import { validateAuthParameters } from "../utility/functions";
import {
  saveConfigSettings,
  BridgeConfigSettings,
  getConfigSettings,
} from "../storage/CapacitorStorage";

//=====================================
// Authentication screen
//
// Redirects to Home Screen on success
// Redirects to Register via link
//=====================================
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  //==============================================
  // Login Validation - Checks email and password
  // Performs login if pass
  //==============================================

  const login = async () => {
    //email/password validation
    if (validateAuthParameters(email, password, "", true)) {
      const loggedIn = await LoginUser(email, password);
      const databaseRetrieved = await getDatabaseData(email); //retrieve bridge data from database
      console.log(databaseRetrieved);
      // redirect to home when log-in succeeds
      if (loggedIn && databaseRetrieved) {
        history.push("/home");
      }
    }
  };

  return (
    <IonPage id="login">
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow color="primary" justify-content-center>
            <IonCol align-self-center size-md="6" size-lg="5" size-xs="12">
              <h3>LOGIN</h3>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  name="email"
                  type="email"
                  onIonChange={(e: any) => setEmail(e.target.value)}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  name="password"
                  type="password"
                  onIonChange={(e: any) => setPassword(e.target.value)}
                ></IonInput>
              </IonItem>
              <IonButton
                size="large"
                type="submit"
                expand="block"
                onClick={async () => await login()}
              >
                Login
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonText>
                Don't have an account already?{" "}
                <Link to="./register">Register</Link>{" "}
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
