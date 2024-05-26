import Facility from "@/modules/private/owner/Facility/pages";
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
    title: t("dashboardFacility.title"),
    description: t("dashboardFacility.description"),
  };
}

const FacilityPage = ({ params }: { params: { myFacilityId: string } }) => {
  return <Facility params={params} />;
};

export default FacilityPage;
