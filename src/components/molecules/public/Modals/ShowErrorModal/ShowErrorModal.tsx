import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import ApolloErrorFrame from "@/components/molecules/public/Frames/ApolloErrorFrame/ApolloErrorFrame";
import { ApolloError } from "@apollo/client";

interface IShowErrorModal {
  error: ApolloError | undefined;
  setError: (value: ApolloError | undefined) => void;
}

const ShowErrorModal: React.FC<IShowErrorModal> = ({ error, setError }) => {
  return (
    <AlertDialog open={!!error}>
      <AlertDialogContent>
        <ApolloErrorFrame error={error} className="text-base" />
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setError(undefined)}>
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShowErrorModal;
