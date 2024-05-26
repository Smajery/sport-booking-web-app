import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IAcceptActionModal {
  handleApprove: () => void;
  children: React.ReactNode;
  alertDescription: string;
}

const ApproveActionCard: React.FC<IAcceptActionModal> = ({
  handleApprove,
  children,
  alertDescription,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            {tTtl(alertDescription)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{tTtl("close")}</AlertDialogCancel>
          <AlertDialogAction onClick={handleApprove}>
            {tTtl("approve")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ApproveActionCard;
