import { useContext, useEffect } from "react";
import { fetchImprovElements } from "../../functions/fetch-improv-elements";
import { mapImprovElementToWorkshopElement } from "../../functions/map-improv-element-to-workshop-element";
import { ImprovLibraryContext } from "./improv-library-context";

export function useImprobibElements() {
  const { improvElements, setImprovElements } =
    useContext(ImprovLibraryContext);

  useEffect(() => {
    if (!improvElements) {
      (async () => {
        const fetchedImprovElements = await fetchImprovElements();
        setImprovElements(
          fetchedImprovElements
            .filter((element) => element.type === "element")
            .map(mapImprovElementToWorkshopElement),
        );
      })();
    }
  }, [improvElements, setImprovElements]);

  return improvElements;
}
