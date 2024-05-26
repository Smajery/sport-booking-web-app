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
    title: t("profile.title"),
    description: t("profile.description"),
  };
}

const ProfilePage = () => {
  return redirect(routes.PROFILE);
};

export default ProfilePage;
