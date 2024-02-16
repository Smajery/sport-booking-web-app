"use client";

import React from "react";

interface IMain {
  children: React.ReactNode;
}

const Main: React.FC<IMain> = ({ children }) => {
  return <main className="flex flex-1">{children}</main>;
};

export default Main;
