"use client";

import { GoogleOAuthProvider as NextGoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

export const GoogleOAuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <NextGoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}
    >
      {children}
    </NextGoogleOAuthProvider>
  );
};
