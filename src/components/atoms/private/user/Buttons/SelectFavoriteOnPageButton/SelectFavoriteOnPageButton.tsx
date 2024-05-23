"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuthContext } from "@/providers/AuthProvider/AuthProvider";
import { useModalContext } from "@/providers/ModalProvider/ModalProvider";
import { ApolloError, useMutation } from "@apollo/client";
import {
  ADD_TO_FAVORITE_MUTATION,
  REMOVE_FROM_FAVORITE_MUTATION,
} from "@/apollo/mutations/private/user/user";
import ErrorHandler from "@/utils/handlers/ErrorHandler";
import ShowErrorModal from "@/components/molecules/public/Modals/ShowErrorModal/ShowErrorModal";
import { clsx } from "clsx";

interface ISelectFavoriteOnPageButton {
  currentUserIsFavorite: boolean;
  facilityId: number;
}

const SelectFavoriteOnPageButton: React.FC<ISelectFavoriteOnPageButton> = ({
  currentUserIsFavorite,
  facilityId,
}) => {
  const { isAuth } = useAuthContext();
  const { setIsLoginModal } = useModalContext();

  const [isFavorite, setIsFavorite] = React.useState<boolean>(
    currentUserIsFavorite,
  );
  const [requestError, setRequestError] = React.useState<
    ApolloError | undefined
  >(undefined);

  const [addToFavorite, { loading: addToFavoriteLoading }] = useMutation(
    ADD_TO_FAVORITE_MUTATION,
    {
      context: {
        authRequired: true,
      },
    },
  );

  const [removeFromFavorite, { loading: removeFromFavoriteLoading }] =
    useMutation(REMOVE_FROM_FAVORITE_MUTATION, {
      context: {
        authRequired: true,
      },
    });

  const handleAddToFavorite = async () => {
    try {
      await addToFavorite({
        variables: { facilityId },
      });
      setIsFavorite(true);
      setRequestError(undefined);
    } catch (e) {
      ErrorHandler.handle(e, {
        componentName: "SelectFavoriteOnPageButton__addToFavorite",
      });
    }
  };

  const handleRemoveFromFavorite = async () => {
    try {
      await removeFromFavorite({
        variables: { facilityId },
      });
      setIsFavorite(false);
      setRequestError(undefined);
    } catch (e) {
      ErrorHandler.handle(e, {
        componentName: "SelectFavoriteOnPageButton__removeFromFavorite",
      });
    }
  };

  const handleSelectFavorite = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    if (isAuth) {
      if (isFavorite) {
        await handleRemoveFromFavorite();
      } else {
        await handleAddToFavorite();
      }
    } else {
      setIsLoginModal(true);
    }
  };

  return (
    <>
      <Button
        variant="noLine"
        size="xs"
        className="gap-x-1 underline"
        onClick={handleSelectFavorite}
        disabled={addToFavoriteLoading || removeFromFavoriteLoading}
      >
        {isFavorite ? (
          <>
            In Favorite
            <Image
              width="20"
              height="20"
              src="/icons/favorite_on_page.svg"
              alt="Favotire"
            />
          </>
        ) : (
          <>
            Add to Favorite
            <Image
              width="20"
              height="20"
              src="/icons/not_favorite_on_page.svg"
              alt="Not favotire"
            />
          </>
        )}
      </Button>
      <ShowErrorModal error={requestError} setError={setRequestError} />
    </>
  );
};

export default SelectFavoriteOnPageButton;
