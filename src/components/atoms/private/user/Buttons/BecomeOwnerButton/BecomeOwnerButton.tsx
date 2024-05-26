"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IBecomeOwnerButton extends ButtonProps {
  isBecameOwner: boolean;
  setIsBecameOwner: (value: boolean) => void;
}

const BecomeOwnerButton: React.FC<IBecomeOwnerButton> = ({
  isBecameOwner,
  setIsBecameOwner,
  ...props
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  const { push } = useRouter();

  const handleBecameOwner = () => {
    setIsBecameOwner(true);
    push(routes.PROFILE);
  };
  return (
    <Button
      variant="gradient"
      size="sm"
      onClick={handleBecameOwner}
      disabled={isBecameOwner}
      {...props}
    >
      {tTtl("becomeOwner")}
    </Button>
  );
};

export default BecomeOwnerButton;
