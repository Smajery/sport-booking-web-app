import { format } from "date-fns";
import { enUS, uk } from "date-fns/locale";

export const locales = { en: enUS, uk: uk };

function formatDate(date: Date, formatStr = "PP", locale: "en" | "uk" = "en") {
  return format(date, formatStr, {
    locale: locales[locale],
  });
}

export default formatDate;
