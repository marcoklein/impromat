// Import styles, initialize component theme here.
// import '../src/common.css';

import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";

import "../src/theme/colors.css";
import "../src/theme/variables.css";

import { IonApp, IonPage, setupIonicReact } from "@ionic/react";
import { beforeMount } from "@playwright/experimental-ct-react/hooks";

import React from "react";
import { TestHooksConfig } from "../src/test-hooks-config";

beforeMount<TestHooksConfig>(async ({ App: TestApp, hooksConfig }) => {
  setupIonicReact();

  if (hooksConfig?.noPageElement) {
    return (
      <IonApp>
        <TestApp></TestApp>
      </IonApp>
    );
  }

  return (
    <IonApp>
      <IonPage>
        <TestApp></TestApp>
      </IonPage>
    </IonApp>
  );
});
