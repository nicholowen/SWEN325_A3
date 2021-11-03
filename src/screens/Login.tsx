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
import { LoginUser } from "../api/FirebaseApi";
import { getDatabaseData } from "../storage/storage";

//=====================================
// Authentication screen
//
// Redirects to Home Screen on success
// Redirects to Register via link
//=====================================
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [canLogin, setCanLogin] = useState(false);

  const history = useHistory();

  //==============================================
  // Login Validation - Checks email and password
  // Performs login if pass
  //==============================================

  const login = async () => {
    // email validation regex
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.trim() === "" || password.trim() === "") {
      console.log("Username and password are required");
      return false;
    }

    if (!re.test(email)) {
      alert("Email is not valid");
      return false;
    }
    if (password.length < 6) {
      console.log("Password must be 6 or more characters!");
      return false;
    }

    // Awaits on successful login and bridge data retrieval from database

    const loggedIn = await LoginUser(email, password);
    const canLogIn = await getDatabaseData(email);
    //redirect to home when log-in succeeds
    if (loggedIn && canLogIn) {
      localStorage.setItem("email", email);
      history.push("/home");
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
