import "@/app/[locale]/globals.css";
import RootLayout from "@/layouts/RootLayout/RootLayout";
import { ReactNode } from "react";

export default function RootPublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
