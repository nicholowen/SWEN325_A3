//=================
// IMPORTS
//=================

import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCol,
  IonIcon,
  IonItem,
  IonRange,
  IonRow,
  IonToggle,
} from "@ionic/react";
import { sunny } from "ionicons/icons";

import { toggleLight, controlBrightness } from "../api/HueApi";

//==================================================
// Small device card to control light on-state and
// brightness only.
//==================================================

const DeviceListItem: React.FC<{
  id: string;
  hueIp: string;
  hueUsername: string;
  name: string;
  on: boolean;
  bri: number;
}> = (props, key) => {
  const [onState, setOnState] = useState(props.on);
  const [brightness, setBrightness] = useState(props.bri);

  const toggleState = (value: boolean) => {
    setOnState(value);
    toggleLight(props.id, value, props.hueIp, props.hueUsername);
  };

  const changeBrightness = async (value: number) => {
    setBrightness(value);
    await controlBrightness(props.id, value, props.hueIp, props.hueUsername);
  };

  return (
    <IonRow key={key}>
      <IonCol>
        <IonCard>
          <IonCardContent>
            <h2 className="ion-text-left" style={{ fontWeight: "bold" }}>
              {props.name}
            </h2>
            <IonItem lines="none">
              <IonRange
                min={1}
                max={254}
                step={1}
                value={brightness}
                onIonChange={(e) => changeBrightness(e.detail.value as number)}
              >
                <IonIcon size="small" slot="start" icon={sunny} />
                <IonIcon slot="end" icon={sunny} />
              </IonRange>
              <IonToggle
                checked={onState}
                // onClick={toggleState}
                onIonChange={(e) => toggleState(e.detail.checked as boolean)}
              >
                On/Off
              </IonToggle>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default DeviceListItem;
