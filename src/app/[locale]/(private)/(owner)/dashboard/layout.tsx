import "@/app/[locale]/globals.css";
import DashboardSection from "@/modules/private/owner/Dashboard/organisms/DashboardSection/DashboardSection";
import React, { ReactNode } from "react";
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
      template: `%s | ${t("dashboard.title")} | SportBooking`,
      default: t("dashboard.title"),
    },
    description: t("dashboard.description"),
  };
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto flex justify-between">
      <DashboardSection />
      {children}
    </div>
  );
}
