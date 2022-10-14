import { IonButton } from "@ionic/react";
import React from "react";

/**
 * Google sign in button that follows Google design specifications.
 *
 * https://developers.google.com/identity/branding-guidelines
 * https://about.google/brand-resource-center/logos-list/
 *
 * @param props
 * @returns
 */
export const GoogleSigninButton: React.FC<
  React.ComponentPropsWithoutRef<typeof IonButton>
> = (props) => (
  <IonButton {...props} style={{ "--background": "white" }}>
    <div
      slot="start"
      style={{ width: "18px", height: "18px", marginRight: "24px" }}
    >
      <img alt="Google Logo" src="assets/google-logo.png"></img>
    </div>
    <span style={{ color: "#000" }}>Google Sign In</span>
  </IonButton>
);
