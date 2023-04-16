import { Icon } from "./Icon";

export interface IconInfoListItem {
  tablerIcon?: string;
  ionicIcon?: string;
  color?: string;
  displayText: string;
}

interface ContainerProps {
  list: IconInfoListItem[];
}

export const IconInfoList: React.FC<ContainerProps> = ({ list }) => {
  return (
    <>
      {list.map(({ tablerIcon, ionicIcon, color, displayText }, index) => (
        <div key={index}>
          <Icon tablerIcon={tablerIcon} icon={ionicIcon} color={color}></Icon>{" "}
          {displayText}
        </div>
      ))}
    </>
  );
};
