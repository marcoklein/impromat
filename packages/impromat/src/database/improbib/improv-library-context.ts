import { createContext } from "react";
import { ElementDocType } from "../collections/element/element-collection";

export type ImprovLibraryContextType = {
  improvElements: ElementDocType[] | undefined;
  setImprovElements: React.Dispatch<
    React.SetStateAction<ElementDocType[] | undefined>
  >;
};

export const ImprovLibraryContext = createContext<ImprovLibraryContextType>({
  improvElements: [],
  setImprovElements: () => {
    throw new Error("Not implemented.");
  },
});
