import Facility from "@/modules/public/Facility/pages";
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
    title: t("facility.title"),
    description: t("facility.description"),
  };
}

const FacilityPage = ({ params }: { params: { facilityId: string } }) => {
  return <Facility params={params} />;
};

export default FacilityPage;
