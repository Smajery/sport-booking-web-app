import "@/app/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import React from "react";

import { AuthProvider } from "@/providers/AuthProvider/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider/ThemeProvider";

export const metadata: Metadata = {
  title: {
    template: "%s | SportBooking",
    default: "SportBooking",
  },
  description: "SportBooking App",
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
