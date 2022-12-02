import { IonSpinner } from "@ionic/react";
import { useEffect } from "react";
import { useDocuments } from "../../database/use-documents";
import { useMyUser } from "../../database/use-my-user";
import { useComponentLogger } from "../../use-component-logger";
import { useStateChangeLogger } from "../../use-state-change-logger";
import { FavoriteElementsEmptyComponent } from "../favorite-elements/FavoriteElementsEmptyComponent";
import { FavoriteElementsListComponent } from "../favorite-elements/FavoriteElementsListComponent";

export const FavoriteElementsTabComponent: React.FC = () => {
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
          favoriteElements={favoriteElements}
        ></FavoriteElementsListComponent>
      )}
    </>
  );
};
