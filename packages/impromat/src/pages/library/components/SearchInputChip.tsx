import { IonChip, IonIcon, IonInput } from "@ionic/react";
import { search } from "ionicons/icons";
import React, { useMemo, useRef, useState } from "react";

interface ContainerProps {
  input: string;
  onInputChange: (input: string) => void;
}

export const SearchInputChip: React.FC<ContainerProps> = ({
  input,
  onInputChange,
}) => {
  const inputRef = useRef<HTMLIonInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const isActive = useMemo(() => {
    return input.length > 0 || isSearchFocused;
  }, [input, isSearchFocused]);

  const inputWidth = useMemo(() => {
    if (isActive) {
      return undefined;
    }
    return "3rem";
  }, [isActive]);

  return (
    <IonChip
      onClick={() => {
        inputRef.current?.setFocus();
      }}
      outline={!isActive}
    >
      <IonIcon icon={search}></IonIcon>
      <IonInput
        ref={inputRef}
        placeholder="Search"
        onIonFocus={() => {
          setIsSearchFocused(true);
        }}
        onIonBlur={() => {
          setIsSearchFocused(false);
        }}
        style={{ width: inputWidth }}
        value={input}
        clearInput={isActive}
        onIonInput={(event) => {
          onInputChange(event.detail.value ?? "");
        }}
      ></IonInput>
    </IonChip>
  );
};
