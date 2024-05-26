import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import ApolloErrorFrame from "@/components/molecules/public/Frames/ApolloErrorFrame/ApolloErrorFrame";
import { ApolloError } from "@apollo/client";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IShowErrorModal {
  error: ApolloError | undefined;
  setError: (value: ApolloError | undefined) => void;
}

const ShowErrorModal: React.FC<IShowErrorModal> = ({ error, setError }) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);
  return (
    <AlertDialog open={!!error}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription className="text-destructive">
            {error && getApolloErrorMessage(error)}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setError(undefined)}>
            {tTtl("close")}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShowErrorModal;
