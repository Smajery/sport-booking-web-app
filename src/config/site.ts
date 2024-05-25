import { names, routes } from "@/utils/constants/routes.constants";

export const siteConfig = {
  publicNavItems: [],
  privateNavItems: {
    user: [
      { title: names.FAVORITES, href: routes.FAVORITES },
      { title: names.RESERVATIONS, href: routes.RESERVATIONS },
      { title: names.PROFILE, href: routes.PROFILE },
    ],
    owner: [
      { title: names.DASHBOARD, href: routes.DASHBOARD },
      { title: names.FAVORITES, href: routes.FAVORITES },
      { title: names.RESERVATIONS, href: routes.RESERVATIONS },
      { title: names.PROFILE, href: routes.PROFILE },
    ],
  },
};
