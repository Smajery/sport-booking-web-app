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

interface ISelectFavoriteOnItemButton {
  currentUserIsFavorite: boolean;
  facilityId: number;
}

const SelectFavoriteOnItemButton: React.FC<ISelectFavoriteOnItemButton> = ({
  currentUserIsFavorite,
  facilityId,
}) => {
  const { isAuth } = useAuthContext();
  const { setIsLoginModal } = useModalContext();
  const [isFavoriteHovered, setIsFavoriteHovered] =
    React.useState<boolean>(false);
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
            componentName: "SelectFavoriteOnItemButton__removeFromFavorite",
          });
        }
      } else {
        try {
          await addToFavorite({
            variables: { facilityId },
          });
        } catch (e) {
          ErrorHandler.handle(e, {
            componentName: "SelectFavoriteOnItemButton__addToFavorite",
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
        variant="none"
        size="none"
        asChild
        className="cursor-pointer"
        onMouseEnter={() => setIsFavoriteHovered(true)}
        onMouseLeave={() => setIsFavoriteHovered(false)}
        onClick={handleSelectFavorite}
        disabled={addToFavoriteLoading || removeFromFavoriteLoading}
      >
        {currentUserIsFavorite || isFavoriteHovered ? (
          <Image
            width="24"
            height="24"
            src="/icons/favorite.svg"
            alt="Favotire"
          />
        ) : (
          <Image
            width="24"
            height="24"
            src="/icons/not_favorite.svg"
            alt="Not favotire"
          />
        )}
      </Button>
      <ShowErrorModal error={requestError} setError={setRequestError} />
    </>
  );
};

export default SelectFavoriteOnItemButton;
