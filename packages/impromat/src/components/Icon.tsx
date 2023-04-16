import { IonIcon } from "@ionic/react";

interface ContainerProps
  extends React.ComponentPropsWithoutRef<typeof IonIcon> {
  tablerIcon?: string;
}

/**
 * Universal icon that loads icons either from ionicons or from tabler icons (placed into `assets/tabler-icons/`).
 *
 * @param props Specify ionicons with `icon={...}` and tabler icons with `tablerIcon="..."`.
 * @returns Wrapped `IonIcon` component.
 */
export const Icon: React.FC<ContainerProps> = (props) => {
  if (props.tablerIcon) {
    return (
      <IonIcon
        {...props}
        src={`/assets/tabler-icons/${props.tablerIcon}.svg`}
      ></IonIcon>
    );
  }
  return <IonIcon {...props}></IonIcon>;
};
