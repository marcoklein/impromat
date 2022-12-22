import { addSearchParamsToUrl } from "../../routes/add-search-params-to-url";
import { ROUTE_IMPROBIB_ELEMENT_ID } from "../../routes/shared-routes";
import { Tabs } from "./components/LibraryContentComponent";

export const routeLibrary = (params: { workshopId?: string } = {}) =>
  addSearchParamsToUrl("/library", params);
export const routeLibraryTab = (
  tab: Tabs,
  params: { workshopId?: string } = {},
) => {
  return addSearchParamsToUrl(`/library/${tab}`, params);
};

export const routeLibraryElement = (
  libraryElementId = ROUTE_IMPROBIB_ELEMENT_ID,
  params: { workshopId?: string } = {},
) => addSearchParamsToUrl(`/library-element/${libraryElementId}`, params);

export const routeLibraryCreateCustomElement = (
  params: {
    workshopId?: string;
  } = {},
) => addSearchParamsToUrl(`/library-add-custom-element`, params);
