import "@/app/globals.css";
import Main from "@/layouts/Private/Main";
import RootLayout from "@/layouts/RootLayout/RootLayout";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | SportBooking",
    default: "SportBooking",
  },
  description: "SportBooking App",
};

export default function RootPrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <RootLayout>
      <Main>{children}</Main>
    </RootLayout>
  );
}