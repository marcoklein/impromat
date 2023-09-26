import { PageScaffold } from "../../components/PageScaffold";
import { SearchElementTabComponent } from "./components/SearchElementTabComponent";

export const LibraryPage: React.FC = () => {
  return (
    <PageScaffold customContentWrapper>
      <SearchElementTabComponent></SearchElementTabComponent>
    </PageScaffold>
  );
};
