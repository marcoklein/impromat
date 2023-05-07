import { PropsWithChildren } from "react";
import { Icon } from "./Icon";

interface ContainerProps extends PropsWithChildren {
  tablerIcon?: string;
  ionicIcon?: string;
  color?: string;
  displayText: string;
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
}) => {
  return (
    <div>
      <Icon tablerIcon={tablerIcon} icon={ionicIcon} color={color}></Icon>{" "}
      {displayText}
      {children}
    </div>
  );
};
