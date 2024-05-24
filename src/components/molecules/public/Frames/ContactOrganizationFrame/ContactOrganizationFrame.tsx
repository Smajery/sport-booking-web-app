import React from "react";
import { Phone } from "lucide-react";
import PhoneLink from "@/components/atoms/public/Links/PhoneLink/PhoneLink";
import { cn } from "@/lib/utils";

interface IContactOrganizationFrame {
  phone: string;
  className?: string;
}

const ContactOrganizationFrame: React.FC<IContactOrganizationFrame> = ({
  phone,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "shadow-md flex flex-col border border-border rounded-xl gap-y-2 p-4",
        className,
      )}
    >
      <div className="flex gap-x-2 items-center">
        <p className="text-lg font-light">Contact the organization</p>
        <Phone className="w-5 h-5" />
      </div>
      <div className="flex gap-x-4">
        <div className="flex flex-col text-muted-foreground text-lg font-light">
          <p>Phone number:</p>
        </div>
        <div className="flex flex-col text-lg font-light">
          <PhoneLink phone={phone} />
        </div>
      </div>
    </div>
  );
};

export default ContactOrganizationFrame;
