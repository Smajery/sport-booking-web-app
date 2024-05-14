"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { getApolloErrorMessage } from "@/utils/helpers/error.helpers";
import { GET_USER_FAVORITES } from "@/apollo/query/private/user/user";
import FavoriteFacilitiesList from "@/components/molecules/private/user/Lists/FavoriteFacilitiesList/FavoriteFacilitiesList";
import PaginationFrame from "@/components/molecules/public/Frames/PaginationFrame/PaginationFrame";
import { usePagination } from "@/hooks/usePagination/usePagination";

const limit = 10;

const FavoritesSection = () => {
  const { pagination, setPagination, handleSetCurrentPage, handlePageChange } =
    usePagination();
  const { currentPage, totalPages, totalItems } = pagination;

  const { data, loading, error, fetchMore } = useQuery(GET_USER_FAVORITES, {
    context: {
      authRequired: true,
    },
    variables: {
      paginationArgs: {
        limit: limit,
        page: currentPage,
      },
    },
    onCompleted: (data) => {
      setPagination({
        ...pagination,
        totalItems: data.getUserFavorites.totalCount,
        totalPages: Math.ceil(data.getUserFavorites.totalCount / limit),
      });
    },
  });

  return (
    <section className="flex flex-col gap-y-5">
      <div className="flex mt-5">
        <p className="text-primary text-4xl font-semibold">Favorites</p>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{getApolloErrorMessage(error)}</div>
      ) : data.getUserFavorites.facilities.length === 0 ? (
        <div className="flex justify-center p-5 ">
          You haven't added any facility to favorites yet
        </div>
      ) : (
        <FavoriteFacilitiesList facilities={data.getUserFavorites.facilities} />
      )}
      <PaginationFrame
        totalItems={totalItems}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={handleSetCurrentPage}
        isFetchLoading={loading}
      />
    </section>
  );
};

export default FavoritesSection;
