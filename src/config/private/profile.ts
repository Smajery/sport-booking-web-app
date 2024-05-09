import {
  ROUTE_ABOUT,
  ROUTE_HELP,
  ROUTE_ME,
  ROUTE_NOTIFICATION,
  ROUTE_PRIVACY,
} from "@/utils/constants/routes.constants";

export const profileConfig = {
  dashboardItems: [
    { key: "me", href: ROUTE_ME, name: "Profile" },
    { key: "notification", href: ROUTE_NOTIFICATION, name: "Notification" },
    { key: "privacy", href: ROUTE_PRIVACY, name: "Privacy" },
    { key: "about", href: ROUTE_ABOUT, name: "About" },
    { key: "help", href: ROUTE_HELP, name: "Help" },
  ],
};
