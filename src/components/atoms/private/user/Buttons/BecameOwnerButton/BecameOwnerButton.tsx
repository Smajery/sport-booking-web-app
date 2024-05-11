"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";

interface IBecameOwnerButton extends ButtonProps {
  className?: string;
  isBecameOwner: boolean;
  setIsBecameOwner: (value: boolean) => void;
}

const BecameOwnerButton: React.FC<IBecameOwnerButton> = ({
  className = "",
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
      variant="none"
      size="sm"
      className={`variant-gradient ${className}`}
      onClick={handleBecameOwner}
      disabled={isBecameOwner}
      {...props}
    >
      Became Owner
    </Button>
  );
};

export default BecameOwnerButton;
