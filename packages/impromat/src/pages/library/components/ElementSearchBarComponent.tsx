import { IonSearchbar } from "@ionic/react";
import { useEffect, useRef } from "react";

interface ContainerProps {
  initialSearchText: string;
  onSearchTextChange: (searchText: string) => void;
  disabled?: boolean;
}

export const ElementSearchBarComponent: React.FC<ContainerProps> = ({
  initialSearchText,
  onSearchTextChange,
  disabled,
}) => {
  const searchInputRef = useRef<HTMLIonSearchbarElement>(null);

  useEffect(() => {
    if (initialSearchText && searchInputRef.current) {
      searchInputRef.current.value = initialSearchText;
    }
  }, [initialSearchText]);

  return (
    <IonSearchbar
      disabled={disabled}
      ref={searchInputRef}
      placeholder="Search for elements"
      debounce={1000}
      onIonInput={(e) => {
        onSearchTextChange(e.detail.value ?? "");
      }}
    ></IonSearchbar>
  );
};
