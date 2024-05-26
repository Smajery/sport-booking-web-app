import Home from "@/modules/public/Home/pages";
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
    title: {
      absolute: "SportBooking",
    },
    description: t("home.description"),
  };
}

const HomePage = () => {
  return <Home />;
};

export default HomePage;
