import Profile from "@/modules/private/user/Profile/pages/Profile";
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
    title: t("me.title"),
    description: t("me.description"),
  };
}

const ProfilePage = () => {
  return <Profile />;
};

export default ProfilePage;
