import React from "react";
import { Button } from "@/components/ui/button";

interface IApplyBookButton {}

const ApplyButton: React.FC<IApplyBookButton> = () => {
  return (
    <Button variant="none" size="md" className="book-gradient text-white">
      Apply
    </Button>
  );
};

export default ApplyButton;
