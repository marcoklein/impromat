export const ROUTE_WORKHOP_ID = ":id";
export const ROUTE_WORKHOP_ELEMENT_ID = ":partId";
export const ROUTE_IMPROBIB_ELEMENT_ID = ":libraryPartId";

export const routeRootNavigation = () => "/nav";

// routes for home tab
export const routeHome = () => `${routeRootNavigation()}/home`;
export const routeAbout = () => `${routeHome()}/about`;
export const routePrivacyPolicy = () => `${routeHome()}/privacy`;
export const routeAccount = () => `${routeHome()}/account`;
export const routeLegal = () => `${routeHome()}/legal`;

// routes for workshops tab
export const routeWorkshops = () => `${routeRootNavigation()}/workshop`;
export const routeWorkshop = (workshopId: string = ROUTE_WORKHOP_ID) =>
  `/workshop/${workshopId}`;

// routes for my space tab
export const routeMySpace = () => `${routeRootNavigation()}/my-space`;

// independent routes
export const routeWorkshopElement = (
  workshopId: string = ROUTE_WORKHOP_ID,
  elementId: string = ROUTE_WORKHOP_ELEMENT_ID,
) => `/workshop/${workshopId}/part/${elementId}`;

// routes for elements tab
export const routeLibrary = () => `${routeRootNavigation()}/elements`;
export const routeLibraryElement = (
  libraryElementId = ROUTE_IMPROBIB_ELEMENT_ID,
) => `${routeLibrary()}/${libraryElementId}`;

// not signed in
export const routeLogin = () => routeMySpace();
