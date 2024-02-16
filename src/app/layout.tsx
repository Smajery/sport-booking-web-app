import "@/app/[locale]/globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import React from "react";

import { AuthProvider } from "@/providers/AuthProvider/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider/ThemeProvider";
import { ApolloProvider } from "@/providers/ApolloProvider/ApolloProvider";
import { ModalProvider } from "@/providers/ModalProvider/ModalProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | SportBooking",
    default: "SportBooking",
  },
  description: "SportBooking App",
};

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className}`}>
        <ApolloProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider>
              <ModalProvider>{children}</ModalProvider>
            </AuthProvider>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
