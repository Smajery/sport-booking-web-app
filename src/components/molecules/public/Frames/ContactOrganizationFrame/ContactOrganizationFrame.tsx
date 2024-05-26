import React from "react";
import { Phone } from "lucide-react";
import PhoneLink from "@/components/atoms/public/Links/PhoneLink/PhoneLink";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IContactOrganizationFrame {
  phone: string;
  className?: string;
}

const ContactOrganizationFrame: React.FC<IContactOrganizationFrame> = ({
  phone,
  className = "",
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);
  const tLbl = useTranslations(namespaces.COMPONENTS_LABELS);

  return (
    <div
      className={cn(
        "shadow-md flex flex-col border border-border rounded-xl gap-y-2 p-4",
        className,
      )}
    >
      <div className="flex gap-x-2 items-center">
        <p className="text-lg font-light">{tTtl("contactTheOrganization")}</p>
        <Phone className="w-5 h-5" />
      </div>
      <div className="flex gap-x-4">
        <div className="flex flex-col text-muted-foreground text-lg font-light">
          <p>{tLbl("phoneNumber")}:</p>
        </div>
        <div className="flex flex-col text-lg font-light">
          <PhoneLink phone={phone} />
        </div>
      </div>
    </div>
  );
};

export default ContactOrganizationFrame;
