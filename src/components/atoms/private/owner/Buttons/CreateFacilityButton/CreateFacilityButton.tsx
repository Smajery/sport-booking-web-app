"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { routes } from "@/utils/constants/routes.constants";

const CreateFacilityButton = () => {
  const { push } = useRouter();

  return (
    <Button
      variant="none"
      size="none"
      className="cursor-pointer"
      asChild
      onClick={() => push(routes.FACILITY_CREATE)}
    >
      <div className="w-10 h-10 rounded-md bg-border hover:bg-primary hover:text-primary-foreground">
        <Plus />
      </div>
    </Button>
  );
};

export default CreateFacilityButton;
