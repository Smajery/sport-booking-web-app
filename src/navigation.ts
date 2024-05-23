import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["en", "uk"] as const;
export const localePrefix = "always";
export const defaultLocale = "en";
export type TLocale = (typeof locales)[number];

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales, localePrefix });
