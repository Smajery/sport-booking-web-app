"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";

interface IBecameOwnerButton extends ButtonProps {
  isBecameOwner: boolean;
  setIsBecameOwner: (value: boolean) => void;
}

const BecameOwnerButton: React.FC<IBecameOwnerButton> = ({
  isBecameOwner,
  setIsBecameOwner,
  ...props
}) => {
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
      Became Owner
    </Button>
  );
};

export default BecameOwnerButton;
