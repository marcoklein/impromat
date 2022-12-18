export const ROUTE_WORKHOP_ID = ":id";
export const ROUTE_WORKHOP_ELEMENT_ID = ":partId";
export const ROUTE_IMPROBIB_ELEMENT_ID = ":libraryPartId";

export const routeHome = () => "/home";
export const routeAbout = () => "/about";
export const routePrivacyPolicy = () => "/privacy";
export const routeAccount = () => "/account";
export const routeLegal = () => "/legal";
export const routeAccountSignin = () => "/account/signin";
export const routeWorkshops = () => "/workshop";
export const routeWorkshop = (workshopId: string = ROUTE_WORKHOP_ID) =>
  `/workshop/${workshopId}`;
export const routeWorkshopElement = (
  workshopId: string = ROUTE_WORKHOP_ID,
  elementId: string = ROUTE_WORKHOP_ELEMENT_ID,
) => `/workshop/${workshopId}/part/${elementId}`;

// TODO align library routes with workshop library routes
export const routeLibrary = () => "/library";
export const routeLibraryElement = (
  libraryElementId = ROUTE_IMPROBIB_ELEMENT_ID,
) => `/library-element/${libraryElementId}`;
export const routeLibraryCreateCustomElement = () =>
  `/library-add-custom-element`;

// TODO remove ROUTE_IMPROBIB_ELEMENT_ID... assignment to ensure right usage of params
export const routeWorkshopAddElementFromImprobib = (
  workshopId: string = ROUTE_WORKHOP_ID,
  improbibElementId: string = ROUTE_IMPROBIB_ELEMENT_ID,
) => `/workshop/${workshopId}/improbib/${improbibElementId}`;
export const routeWorkshopAddElementCreateCustomElement = (
  workshopId: string = ROUTE_WORKHOP_ID,
) => `/workshop/${workshopId}/add-custom-element`;
export const routeWorkshopAddElement = (
  workshopId: string = ROUTE_WORKHOP_ID,
) => `/workshop/${workshopId}/add-element`;
