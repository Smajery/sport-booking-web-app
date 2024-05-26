import Schedule from "@/modules/private/owner/Schedule/pages";
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
    title: t("dashboardSchedule.title"),
    description: t("dashboardSchedule.description"),
  };
}

const SchedulePage = () => {
  return <Schedule />;
};

export default SchedulePage;
