import { IonSpinner } from "@ionic/react";
import { useQuery } from "urql";
import { getFragmentData, graphql } from "../../../graphql-client";
import { useComponentLogger } from "../../../hooks/use-component-logger";
import { FavoriteElementsEmptyComponent } from "./FavoriteElementsEmptyComponent";
import { FavoriteElementsListComponent } from "./FavoriteElementsListComponent";

const MyUser_QueryFragment = graphql(`
  fragment MyUser_Query on Query {
    me {
      id
      favoriteElements {
        id
      }
      ...FavoriteElements_User
    }
  }
`);

const MyUser_Query = graphql(`
  query MyUser {
    ...MyUser_Query
  }
`);

interface ContainerProps {
  workshopId: string | undefined;
}

export const FavoriteElementsTabComponent: React.FC<ContainerProps> = ({
  workshopId,
}) => {
  const [{ data, fetching: isFetching, error }] = useQuery({
    query: MyUser_Query,
  });
  const user = getFragmentData(MyUser_QueryFragment, data);
  const favoriteElements = user?.me.favoriteElements;
  const logger = useComponentLogger("FavoriteElementsTabComponent");

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (!user || isFetching) {
    return <IonSpinner></IonSpinner>;
  }
  if (!favoriteElements?.length) {
    return <FavoriteElementsEmptyComponent></FavoriteElementsEmptyComponent>;
  }
  return (
    <FavoriteElementsListComponent
      workshopId={workshopId}
      favoriteElementsFragment={user.me}
    ></FavoriteElementsListComponent>
  );
};
