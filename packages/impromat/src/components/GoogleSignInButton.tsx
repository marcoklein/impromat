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
export const GoogleSignInButton: React.FC<
  React.ComponentPropsWithoutRef<typeof IonButton>
> = (props) => (
  <IonButton
    {...props}
    className="google-sign-in-button"
    style={{ "--background": "#4285F4" }}
  >
    <div
      slot="start"
      className="google-logo"
      style={{
        padding: "6px",
        width: "30px",
        height: "30px",
        marginRight: "16px",
        backgroundColor: "#fff",
      }}
    >
      <img alt="Google Logo" src="assets/google-logo.png"></img>
    </div>
    <span style={{ color: "#fff" }}>Google Sign In</span>
  </IonButton>
);
