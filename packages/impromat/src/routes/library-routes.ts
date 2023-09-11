import { Tabs } from "../pages/library/LibraryPage";
import { addSearchParamsToUrl } from "./add-search-params-to-url";
import {
  ROUTE_IMPROBIB_ELEMENT_ID,
  routeRootNavigation,
} from "./shared-routes";

export const LIBRARY_ELEMENT_ID_SEARCH_PARAM = "elementId";

const baseLibraryRoute = `${routeRootNavigation()}/elements`;

// TODO remove all tab related routes

export const routeLibrary = (params: { workshopId?: string } = {}) =>
  baseLibraryRoute;

export const routeLibraryTab = (
  tab: Tabs,
  params: { workshopId?: string } = {},
) => {
  return addSearchParamsToUrl(`${baseLibraryRoute}/${tab}`, params);
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

export const routeLibraryEditCustomElement = (
  params: {
    workshopId?: string;
    [LIBRARY_ELEMENT_ID_SEARCH_PARAM]?: string;
  } = {},
) => addSearchParamsToUrl(`/library-add-custom-element`, params);
