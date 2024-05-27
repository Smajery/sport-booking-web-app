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
import { GET_ALL_FACILITIES_QUERY } from "@/apollo/query/public/facility";

interface ISelectFavoriteOnItemButton {
  currentUserIsFavorite: boolean;
  facilityId: number;
  className?: string;
}

const SelectFavoriteOnItemButton: React.FC<ISelectFavoriteOnItemButton> = ({
  currentUserIsFavorite,
  facilityId,
  className = "",
}) => {
  const { isAuth } = useAuthContext();
  const { setIsLoginModal } = useModalContext();
  const [isFavoriteHovered, setIsFavoriteHovered] =
    React.useState<boolean>(false);
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
      setRequestError(e as ApolloError);
      ErrorHandler.handle(e, {
        componentName: "SelectFavoriteOnItemButton__addToFavorite",
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
      setRequestError(e as ApolloError);
      ErrorHandler.handle(e, {
        componentName: "SelectFavoriteOnItemButton__removeFromFavorite",
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
        variant="none"
        size="none"
        asChild
        className={`cursor-pointer ${className}`}
        onMouseEnter={() => setIsFavoriteHovered(true)}
        onMouseLeave={() => setIsFavoriteHovered(false)}
        onClick={handleSelectFavorite}
        disabled={addToFavoriteLoading || removeFromFavoriteLoading}
      >
        {isFavorite || isFavoriteHovered ? (
          <Image
            width={30}
            height={30}
            src="/icons/favorite.svg"
            alt="Favotire"
          />
        ) : (
          <Image
            width={30}
            height={30}
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
