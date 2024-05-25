"use client";

import React from "react";
import FacilitiesItem from "@/components/molecules/public/Items/FacilitiesItem/FacilitiesItem";
import { TFacilityItem } from "@/types/public/facilityTypes";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IFacilitiesList {
  facilities: TFacilityItem[];
  totalCount: number;
  fetchMoreData: () => void;
}

const FacilitiesList: React.FC<IFacilitiesList> = ({
  facilities,
  fetchMoreData,
  totalCount,
}) => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);

  return (
    <InfiniteScroll
      dataLength={facilities.length || 0}
      next={fetchMoreData}
      hasMore={facilities.length < totalCount}
      className="flex flex-col gap-y-6"
      loader={<div>{tTtl("loading")}</div>}
    >
      {facilities.map((facility) => (
        <FacilitiesItem facility={facility} key={facility.id} />
      ))}
    </InfiniteScroll>
  );
};

export default FacilitiesList;
