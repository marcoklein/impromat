import { PropsWithChildren } from "react";
import { Icon } from "./Icon";
import { IonBadge } from "@ionic/react";

interface ContainerProps extends PropsWithChildren {
  tablerIcon?: string;
  ionicIcon?: string;
  color?: string;
  displayText: string;
  /**
   * Display options for extra small screens.
   */
  xs?: {
    hideIcon?: boolean;
    hideText?: boolean;
  };
}

/**
 * Renders a list of icons and text. Use with `PreviewCard`.
 */
export const InfoListItem: React.FC<ContainerProps> = ({
  displayText,
  children,
  color,
  ionicIcon,
  tablerIcon,
  xs,
}) => {
  return (
    <IonBadge color="light">
      <div
        style={{
          whiteSpace: "nowrap",
          display: "flex",
        }}
      >
        <Icon
          className={xs?.hideIcon === true ? "ion-hide-sm-down" : ""}
          tablerIcon={tablerIcon}
          icon={ionicIcon}
          color={color}
        ></Icon>
        <span
          style={{ paddingLeft: displayText ? "0.1rem" : undefined }}
          className={xs?.hideText === true ? "ion-hide-sm-down" : ""}
        >
          {displayText}
        </span>
        {children}
      </div>
    </IonBadge>
  );
};
