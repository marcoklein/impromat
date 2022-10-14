import { createContext } from "react";
import { Element } from "../schema.gen";

export type ImprovLibraryContextType = {
  improvElements: Element[] | undefined;
  setImprovElements: React.Dispatch<
    React.SetStateAction<Element[] | undefined>
  >;
};

export const ImprovLibraryContext = createContext<ImprovLibraryContextType>({
  improvElements: [],
  setImprovElements: () => {
    throw new Error("Not implemented.");
  },
});
