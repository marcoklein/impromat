import { addSearchParamsToUrl } from "./add-search-params-to-url";

export const ROUTE_ELEMENT_ID = ":elementId";

export const routeLibraryCreateCustomElement = (
  params: {
    workshopId?: string;
  } = {},
) => addSearchParamsToUrl(`/library-add-custom-element`, params);

export const routeLibraryEditCustomElement = (
  elementId: string = ":elementId",
) => `/library-edit-custom-element/${elementId}`;
