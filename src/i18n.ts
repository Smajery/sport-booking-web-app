import { locales, TLocale } from "@/navigation";
import deepmerge from "deepmerge";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({ locale }: { locale: TLocale }) => {
  if (!locales.includes(locale)) notFound();

  const userMessages = (await import(`../messages/${locale}.json`)).default;
  const defaultMessages = (await import(`../messages/uk.json`)).default;
  const messages = deepmerge(defaultMessages, userMessages);

  return {
    messages,
  };
});
