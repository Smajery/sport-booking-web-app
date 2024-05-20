import "@/app/[locale]/globals.css";
import { ReactNode } from "react";
import AuthProtectRoute from "@/hoc/AuthProtectRoute/AuthProtectRoute";

export default function RootPrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthProtectRoute>{children}</AuthProtectRoute>;
}
