import Favorites from "@/modules/private/user/Favorites/pages";
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
    title: t("favorites.title"),
    description: t("favorites.description"),
  };
}

const FavoritesPage = () => {
  return <Favorites />;
};

export default FavoritesPage;
