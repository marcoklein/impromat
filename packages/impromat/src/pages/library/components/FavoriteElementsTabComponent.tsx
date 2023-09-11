import { useMemo } from "react";
import { useQuery } from "urql";
import { PageContentLoaderComponent } from "../../../components/PageContentLoaderComponent";
import { getFragmentData, graphql } from "../../../graphql-client";
import { FavoriteElementsEmptyComponent } from "./FavoriteElementsEmptyComponent";
import { FavoriteElementsListComponent } from "./FavoriteElementsListComponent";

const MyUser_QueryFragment = graphql(`
  fragment MyUser_Query on Query {
    me {
      id
      favoriteElements {
        element {
          id
        }
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
  const context = useMemo(() => ({ additionalTypenames: ["Element"] }), []);
  const [queryResult, reexecuteQuery] = useQuery({
    query: MyUser_Query,
    context,
    requestPolicy: "cache-and-network", // and network because isFavorite state of elements might change
  });
  const user = getFragmentData(MyUser_QueryFragment, queryResult.data);
  const favoriteElements = user?.me.favoriteElements;

  return (
    <PageContentLoaderComponent
      queryResult={queryResult}
      reexecuteQuery={reexecuteQuery}
    >
      {!favoriteElements?.length ? (
        <FavoriteElementsEmptyComponent></FavoriteElementsEmptyComponent>
      ) : (
        user && (
          <FavoriteElementsListComponent
            workshopId={workshopId}
            favoriteElementsFragment={user.me}
          ></FavoriteElementsListComponent>
        )
      )}
    </PageContentLoaderComponent>
  );
};
