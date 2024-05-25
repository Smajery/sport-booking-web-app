import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["uk", "en"] as const;
export const localePrefix = "always";
export const defaultLocale = "uk";
export type TLocale = (typeof locales)[number];

export const { redirect, useRouter } = createSharedPathnamesNavigation({
  locales,
  localePrefix,
});
