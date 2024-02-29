import React from "react";
import Header from "@/layouts/Header/Header";

interface IRootLayout {
  children: React.ReactNode;
}

const RootLayout: React.FC<IRootLayout> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1">{children}</main>
    </div>
  );
};

export default RootLayout;
