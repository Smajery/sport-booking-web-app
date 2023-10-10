import React from "react";

interface IRootLayoutTemplate {
  children: React.ReactNode;
}

const RootLayoutTemplate: React.FC<IRootLayoutTemplate> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto"></div>
      {children}
    </div>
  );
};

export default RootLayoutTemplate;
