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
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { RegisterUser } from "../api/FirebaseApi";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();

  //=====================================================
  // Registration Validation - Checks email and password
  // Performs registration if pass
  //=====================================================

  const register = async () => {
    //email validation regex
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

    if (password !== confirmPassword) {
      console.log("Passwords do not match!");
      return false;
    }

    if (confirmPassword.trim() === "") {
      console.log("Please confirm your password");
      return false;
    }
    if (password.length < 6) {
      console.log("Password must be 6 or more characters!");
      return false;
    }

    //Awaits on successful registration - navigates back to login page on fail.
    const registered = await RegisterUser(email, password);
    if (registered) {
      localStorage.setItem("email", email);
      history.push("/home");
    } else {
      history.push("/login");
    }
  };

  return (
    <IonPage id="register">
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow color="primary" justify-content-center>
            <IonCol align-self-center size-md="6" size-lg="5" size-xs="12">
              <h3>REGISTER</h3>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  onIonChange={(e: any) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  onIonChange={(e: any) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput
                  onIonChange={(e: any) => setConfirmPassword(e.target.value)}
                  name="confirmPassword"
                  type="password"
                ></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton
                size="large"
                type="submit"
                expand="block"
                onClick={register}
              >
                Register
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonText>
                Already have an account? <Link to="./login">Login</Link>{" "}
              </IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
