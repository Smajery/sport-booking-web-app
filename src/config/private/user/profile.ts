import { routes, names } from "@/utils/constants/routes.constants";

export const profileConfig = {
  dashboardItems: [
    { href: routes.ME, name: names.ME },
    { href: routes.NOTIFICATION, name: names.NOTIFICATION },
    { href: routes.PRIVACY, name: names.PRIVACY },
    { href: routes.ABOUT, name: names.ABOUT },
    { href: routes.HELP, name: names.HELP },
  ],
};
