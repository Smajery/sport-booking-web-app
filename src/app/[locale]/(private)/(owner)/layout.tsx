import "@/app/[locale]/globals.css";
import RootLayout from "@/layouts/RootLayout/RootLayout";
import { ReactNode } from "react";
import RolesProtectRoute from "@/hoc/RolesProtectRoute/RolesProtectRoute";

export default function RootPrivateOwnerLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RolesProtectRoute allowedRoles={["USER", "OWNER"]}>
      <RootLayout>{children}</RootLayout>
    </RolesProtectRoute>
  );
}
