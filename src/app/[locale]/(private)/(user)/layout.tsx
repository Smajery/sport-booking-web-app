import "@/app/[locale]/globals.css";
import RootLayout from "@/layouts/RootLayout/RootLayout";
import { ReactNode } from "react";
import RolesProtectRoute from "@/hoc/RolesProtectRoute/RolesProtectRoute";

export default function RootPrivateUserLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RolesProtectRoute allowedRoles={["USER"]}>
      <RootLayout>{children}</RootLayout>
    </RolesProtectRoute>
  );
}
