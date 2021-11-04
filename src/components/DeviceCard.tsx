//=================
// IMPORTS
//=================

import React, { useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCol,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonPopover,
  IonRange,
  IonRow,
  IonToggle,
  IonToolbar,
} from "@ionic/react";
import { ellipsisVerticalOutline, sunny } from "ionicons/icons";
import { toggleLight, controlBrightness } from "../api/HueApi";

//==================================================
// Large device card to control light on-state and
// brightness. Contains settings and delete options
//==================================================

const DeviceCard: React.FC<{
  id: string;
  name: string;
  on: boolean;
  bri: number;
}> = (props, key) => {
  const [onState, setOnState] = useState(props.on);
  const [brightness, setBrightness] = useState(props.bri);

  const toggleState = (value: boolean) => {
    setOnState(value);
    toggleLight(props.id, value);
  };

  const changeBrightness = async (value: number) => {
    setBrightness(value);
    await controlBrightness(props.id, value);
  };

  const [popoverState, setShowPopover] = useState({
    showPopover: false,
    event: undefined,
  });

  return (
    <IonRow key={key}>
      <IonCol>
        <IonCard>
          <IonCardContent>
            <IonToolbar>
              <IonButtons slot="end">
                <IonPopover
                  cssClass="my-custom-class"
                  event={popoverState.event}
                  isOpen={popoverState.showPopover}
                  showBackdrop={false}
                  onDidDismiss={() =>
                    setShowPopover({ showPopover: false, event: undefined })
                  }
                >
                  <IonItem button>Settings</IonItem>
                </IonPopover>
                <IonButton
                  expand="block"
                  onClick={(e: any) => {
                    e.persist();
                    setShowPopover({ showPopover: true, event: e });
                  }}
                >
                  {/* link to settings for now */}
                  <IonIcon slot="start" icon={ellipsisVerticalOutline} />
                </IonButton>
              </IonButtons>
              <h2 className="ion-text-left" style={{ fontWeight: "bold" }}>
                {props.name}
              </h2>
            </IonToolbar>
            <IonItemDivider>
              <IonLabel slot="start">Brightness</IonLabel>
              <IonLabel slot="end">On/Off</IonLabel>
            </IonItemDivider>
            <IonItem>
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

export default DeviceCard;
