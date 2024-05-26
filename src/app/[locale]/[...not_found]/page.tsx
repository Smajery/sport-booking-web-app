import { notFound } from "next/navigation";
import { TLocale } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { namespaces } from "@/utils/constants/namespaces.constants";
import { NO_INDEX_PAGE } from "@/utils/constants/seo.constants";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: TLocale };
}) {
  const t = await getTranslations({ locale, namespace: namespaces.META_PAGES });

  return {
    ...NO_INDEX_PAGE,
    title: t("notFound.title"),
    description: t("notFound.description"),
  };
}

const NotFoundCatchAll = () => {
  notFound();
  return null;
};

export default NotFoundCatchAll;
