export const ROUTE_WORKHOP_ID = ":id";
export const ROUTE_WORKHOP_ELEMENT_ID = ":partId";
export const ROUTE_IMPROBIB_ELEMENT_ID = ":libraryPartId";

export const routeRootNavigation = () => "/nav";

export const routeHome = () => `${routeMoreInfo()}/home`;

// routes for home tab
export const routeMoreInfo = () => `${routeRootNavigation()}/info`;
export const routeAbout = () => `${routeMoreInfo()}/about`;
export const routePrivacyPolicy = () => `${routeMoreInfo()}/privacy`;
export const routeAccount = () => `${routeMoreInfo()}/account`;
export const routeLegal = () => `${routeMoreInfo()}/legal`;

export const routeAccountSignin = () => "/account/signin";
export const routeWorkshops = () => `${routeRootNavigation()}/workshops`;
export const routeWorkshop = (workshopId: string = ROUTE_WORKHOP_ID) =>
  `/workshop/${workshopId}`;
export const routeWorkshopElement = (
  workshopId: string = ROUTE_WORKHOP_ID,
  elementId: string = ROUTE_WORKHOP_ELEMENT_ID,
) => `/workshop/${workshopId}/part/${elementId}`;

// unused routes
export const routeCommunity = () => `${routeRootNavigation()}/community`;
