import React from "react";
import { ImpromatLogoComponent } from "./ImpromatLogoComponent";
import { MainTitleComponent } from "./MainTitleComponent";

interface ComponentProps extends React.PropsWithChildren {
  title?: string;
}

export const ImpromatHero: React.FC<ComponentProps> = ({ title, children }) => {
  return (
    <div
      style={{
        minHeight: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="ion-text-center ion-margin-top"
        style={{ maxWidth: "768px" }}
      >
        <div
          style={{
            maxHeight: "20%",
            maxWidth: "128px",
            margin: "0 auto",
          }}
        >
          <ImpromatLogoComponent></ImpromatLogoComponent>
        </div>
        <MainTitleComponent>{title ?? "impromat.app"}</MainTitleComponent>
        {children}
      </div>
    </div>
  );
};
