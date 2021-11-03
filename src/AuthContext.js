import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import React, { useEffect, useMemo, useState } from "react";
import { Redirect, Route } from "react-router";
import Home from "./screens/Home";

export const AuthContext = React.createContext();

export function AuthCtxProvider({ children }) {
  const [email, setEmail] = useState("");
  const [lightsFound, setLightsFound] = useState(false);
  const [lightsExist, setLightsExist] = useState(false);

  //   useEffect(() => {
  //     console.log("useEffect");
  //     <Redirect to="/home" />;
  //     console.log("useEffect");
  //   }, [email]);

  const value = useMemo(() => {
    return {
      signIn: (value) => {
        // console.log(email);
        // setEmail(value);
        // console.log(email);
        return <Redirect to="/home" />;
      },
      setLightsExist: (value) => {
        setLightsExist(value);
      },
      lightsExist: () => {
        return lightsExist;
      },
    };
  });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
