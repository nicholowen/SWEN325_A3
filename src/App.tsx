import React from "react";
import { IonApp, IonPage, IonRouterOutlet } from "@ionic/react";

import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

// import { storage, isTokenPresent } from "./storage/storage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import Home from "./screens/Home";
import DrawerMenu from "./components/DrawerMenu";
import Lights from "./screens/Lights";
import Login from "./screens/Login";
import Register from "./screens/Register";
import FindBridge from "./screens/FindBridge";
import FindLights from "./screens/FindLights";
import LightSettings from "./screens/LightSettings";

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <DrawerMenu></DrawerMenu>
        <IonPage id="main">
          <IonRouterOutlet>
            <Route path="/login" component={Login} exact={true} />
            <Route path="/home" component={Home} exact={true} />
            <Route path="/lights" component={Lights} exact={true} />
            <Route path="/register" component={Register} exact={true} />
            <Route path="/findBridge" component={FindBridge} exact={true} />
            <Route path="/findLights" component={FindLights} exact={true} />
            <Route
              path="/lightSettings"
              component={LightSettings}
              exact={true}
            />
            <Route
              path="/"
              render={
                () =>
                  localStorage.length !== 0 ? (
                    <Redirect to="/home" />
                  ) : (
                    <Redirect to="/login" />
                  )
                // )
              }
              exact={true}
            />
          </IonRouterOutlet>
        </IonPage>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
