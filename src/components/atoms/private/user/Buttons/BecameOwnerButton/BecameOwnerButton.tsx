"use client";

import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";

interface IBecameOwnerButton extends ButtonProps {
  className?: string;
}

const BecameOwnerButton: React.FC<IBecameOwnerButton> = ({
  className = "",
  ...props
}) => {
  const { push } = useRouter();
  const [isBecameOwner, setIsBecameOwner] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsBecameOwner(sessionStorage.getItem("isBecameOwner") === "true");
  }, []);
  const handleBecameOwner = () => {
    sessionStorage.setItem("isBecameOwner", "true");
    setIsBecameOwner(true);
    push(routes.ME);
  };
  return (
    <Button
      variant="none"
      size="sm"
      className={`variant-gradient transition-opacity opacity-50 hover:opacity-100 ${className}`}
      onClick={handleBecameOwner}
      disabled={isBecameOwner}
      {...props}
    >
      Became Owner
    </Button>
  );
};

export default BecameOwnerButton;
