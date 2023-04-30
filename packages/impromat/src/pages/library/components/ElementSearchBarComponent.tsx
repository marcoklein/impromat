import { IonSearchbar } from "@ionic/react";
import { useEffect, useRef } from "react";

interface ContainerProps {
  initialSearchText: string;
  onSearchTextChange: (searchText: string) => void;
}

export const ElementSearchBarComponent: React.FC<ContainerProps> = ({
  initialSearchText,
  onSearchTextChange,
}) => {
  const searchInputRef = useRef<HTMLIonSearchbarElement>(null);

  useEffect(() => {
    if (initialSearchText && searchInputRef.current) {
      searchInputRef.current.value = initialSearchText;
    }
  }, [initialSearchText]);

  return (
    <IonSearchbar
      ref={searchInputRef}
      debounce={1000}
      onIonInput={(e) => {
        onSearchTextChange(e.detail.value ?? "");
      }}
    ></IonSearchbar>
  );
};
