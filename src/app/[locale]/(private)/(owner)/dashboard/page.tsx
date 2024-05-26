import { redirect, TLocale } from "@/navigation";
import { routes } from "@/utils/constants/routes.constants";
import { getTranslations } from "next-intl/server";
import { namespaces } from "@/utils/constants/namespaces.constants";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: TLocale };
}) {
  const t = await getTranslations({ locale, namespace: namespaces.META_PAGES });

  return {
    title: t("dashboard.title"),
    description: t("dashboard.description"),
  };
}

const DashboardPage = () => {
  return redirect(routes.USER_FACILITIES);
};

export default DashboardPage;
