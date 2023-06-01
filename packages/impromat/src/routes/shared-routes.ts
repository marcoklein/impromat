export const ROUTE_WORKHOP_ID = ":id";
export const ROUTE_WORKHOP_ELEMENT_ID = ":partId";
export const ROUTE_IMPROBIB_ELEMENT_ID = ":libraryPartId";

export const routeHome = () => "/";
export const routeAbout = () => "/about";
export const routePrivacyPolicy = () => "/privacy";
export const routeProfile = () => "/profile";
export const routeCommunity = () => "/community";
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
