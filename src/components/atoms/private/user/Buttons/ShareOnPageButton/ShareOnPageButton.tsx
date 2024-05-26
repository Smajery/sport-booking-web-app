"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import { Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

const ShareOnPageButton = () => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const [isCopied, setIsCoped] = React.useState<boolean>(false);
  const handleCopyUrlToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCoped(true);
    } catch (e) {
      ErrorHandler.handle(e, {
        componentName: "ShareOnPageButton__handleCopyUrlToClipboard",
      });
    }
  };

  React.useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => setIsCoped(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <Button
      variant="noLine"
      size="xs"
      className="gap-x-1 underline"
      onClick={handleCopyUrlToClipboard}
    >
      {!isCopied ? tTtl("copyLink") : `${tTtl("copied")}!`}
      <Copy className="w-5 h-5" strokeWidth={1.5} />
    </Button>
  );
};

export default ShareOnPageButton;
