import Facilities from "@/modules/private/owner/Facilities/pages";
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
    title: t("dashboardFacilities.title"),
    description: t("dashboardFacilities.description"),
  };
}

const FacilitiesPage = () => {
  return <Facilities />;
};

export default FacilitiesPage;
