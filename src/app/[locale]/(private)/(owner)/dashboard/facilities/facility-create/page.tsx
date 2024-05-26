import { NO_INDEX_PAGE } from "@/utils/constants/seo.constants";
import FacilityCreate from "@/modules/private/owner/FacilityCreate/pages";
import { TLocale } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { namespaces } from "@/utils/constants/namespaces.constants";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: TLocale };
}) {
  const t = await getTranslations({ locale, namespace: namespaces.META_PAGES });

  return {
    ...NO_INDEX_PAGE,
    title: t("dashboardFacilityCreate.title"),
    description: t("dashboardFacilityCreate.description"),
  };
}

const FacilityCreatePage = () => {
  return <FacilityCreate />;
};

export default FacilityCreatePage;
