import Reservations from "@/modules/private/user/Reservations/pages";
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
    title: t("reservations.title"),
    description: t("reservations.description"),
  };
}

const ReservationsPage = () => {
  return <Reservations />;
};

export default ReservationsPage;
