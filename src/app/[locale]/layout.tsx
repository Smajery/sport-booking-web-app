import "@/app/[locale]/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import React from "react";

import { AuthProvider } from "@/providers/AuthProvider/AuthProvider";
import { ApolloProvider } from "@/providers/ApolloProvider/ApolloProvider";
import { ModalProvider } from "@/providers/ModalProvider/ModalProvider";
import { IntlClientProvider } from "@/providers/IntlClientProvider/IntlClientProvider";
import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "@/navigation";
import { GoogleOAuthProvider } from "@/providers/GoogleOAuthProvider/GoogleOAuthProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | SportBooking",
    default: "SportBooking",
  },
  description: "SportBooking",
};

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

type TLocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: TLocaleLayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className}`}>
        <link rel="icon" href="/icons/logo.ico" sizes="any" />
        <ApolloProvider>
          <IntlClientProvider>
            <AuthProvider>
              <GoogleOAuthProvider>
                <ModalProvider>{children}</ModalProvider>
              </GoogleOAuthProvider>
            </AuthProvider>
          </IntlClientProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
