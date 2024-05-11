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

  const handleSelectFavorite = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    if (isAuth) {
      if (currentUserIsFavorite) {
        try {
          await removeFromFavorite({
            variables: { facilityId },
          });
        } catch (e) {
          ErrorHandler.handle(e, {
            componentName: "SelectFavoriteOnPageButton__removeFromFavorite",
          });
        }
      } else {
        try {
          await addToFavorite({
            variables: { facilityId },
          });
        } catch (e) {
          ErrorHandler.handle(e, {
            componentName: "SelectFavoriteOnPageButton__addToFavorite",
          });
        }
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
        {currentUserIsFavorite ? (
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
