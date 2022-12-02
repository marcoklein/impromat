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

export const routeWorkshopAddElementFromImprobib = (
  workshopId: string = ROUTE_WORKHOP_ID,
  improbibElementId: string = ROUTE_IMPROBIB_ELEMENT_ID,
) => `/workshop/${workshopId}/improbib/${improbibElementId}`;

export const routeWorkshopAddElement = (
  workshopId: string = ROUTE_WORKHOP_ID,
) => `/workshop/${workshopId}/add-element`;
export const routeWorkshopAddElementCreate = (
  workshopId: string = ROUTE_WORKHOP_ID,
) => `${routeWorkshopAddElement(workshopId)}/create`;
export const routeWorkshopAddElementInspiration = (
  workshopId: string = ROUTE_WORKHOP_ID,
) => `${routeWorkshopAddElement(workshopId)}/inspiration`;
export const routeWorkshopAddElementSearch = (
  workshopId: string = ROUTE_WORKHOP_ID,
) => `${routeWorkshopAddElement(workshopId)}/search`;
