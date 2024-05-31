import { TLocale } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { namespaces } from "@/utils/constants/namespaces.constants";
import ResetPassword from "@/modules/public/ResetPassword/pages";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: TLocale };
}) {
  const t = await getTranslations({ locale, namespace: namespaces.META_PAGES });

  return {
    title: t("resetPassword.title"),
    description: t("resetPassword.description"),
  };
}

const ResetPasswordPage = () => {
  return <ResetPassword />;
};

export default ResetPasswordPage;
