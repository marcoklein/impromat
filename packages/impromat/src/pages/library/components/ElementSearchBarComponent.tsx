import { IonSearchbar } from "@ionic/react";
import { useEffect, useRef, useState } from "react";

interface ContainerProps {
  onSearchTextChange: (searchText: string) => void;
}

export const ElementSearchBarComponent: React.FC<ContainerProps> = ({
  onSearchTextChange,
}) => {
  const searchInputRef = useRef<HTMLIonSearchbarElement>(null);
  const [searchText, setSearchText] = useState(
    window.localStorage.getItem("lastSearch") ?? "",
  );

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.value =
        window.localStorage.getItem("lastSearch") ?? "";
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("lastSearch", searchText);
  }, [searchText]);

  useEffect(() => {
    onSearchTextChange(searchText);
  }, [searchText, onSearchTextChange]);

  return (
    <IonSearchbar
      ref={searchInputRef}
      onIonInput={(e) => {
        setSearchText(e.detail.value ?? "");
      }}
    ></IonSearchbar>
  );
};
