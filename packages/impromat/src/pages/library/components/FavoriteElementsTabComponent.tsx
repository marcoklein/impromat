import { IonSpinner } from "@ionic/react";
import { useEffect } from "react";
import { useDocuments } from "../../../database/use-documents";
import { useMyUser } from "../../../database/use-my-user";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { useStateChangeLogger } from "../../../hooks/use-state-change-logger";
import { FavoriteElementsEmptyComponent } from "./FavoriteElementsEmptyComponent";
import { FavoriteElementsListComponent } from "./FavoriteElementsListComponent";

interface ContainerProps {
  workshopId: string | undefined;
}

export const FavoriteElementsTabComponent: React.FC<ContainerProps> = ({
  workshopId,
}) => {
  const logger = useComponentLogger("FavoriteElementsTabComponent");
  const { document: myUser } = useMyUser();
  useStateChangeLogger(myUser, "myUser", logger);
  const { documents: favoriteElements, isFetching } = useDocuments(
    "elements",
    myUser?.favoriteElements,
    logger,
  );

  useEffect(() => {
    logger("myUser favElements=%O", myUser?.favoriteElements);
  }, [myUser, logger]);

  return (
    <>
      {isFetching || favoriteElements === undefined ? (
        <IonSpinner></IonSpinner>
      ) : !favoriteElements.length ? (
        <FavoriteElementsEmptyComponent></FavoriteElementsEmptyComponent>
      ) : (
        <FavoriteElementsListComponent
          workshopId={workshopId}
          favoriteElements={favoriteElements}
        ></FavoriteElementsListComponent>
      )}
    </>
  );
};
