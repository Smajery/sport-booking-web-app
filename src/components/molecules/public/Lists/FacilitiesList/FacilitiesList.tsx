"use client";

import React from "react";
import FacilitiesItem from "@/components/molecules/public/Items/FacilitiesItem/FacilitiesItem";
import { TFacility } from "@/types/public/facilityTypes";
import InfiniteScroll from "react-infinite-scroll-component";

interface IFacilitiesList {
  facilities: TFacility[];
  totalCount: number;
  fetchMoreData: () => void;
}

const FacilitiesList: React.FC<IFacilitiesList> = ({
  facilities,
  fetchMoreData,
  totalCount,
}) => {
  return (
    <InfiniteScroll
      dataLength={facilities.length || 0}
      next={fetchMoreData}
      hasMore={facilities.length < totalCount}
      className="flex flex-col gap-y-6"
      loader={<div>Loading...</div>}
    >
      {facilities.map((facility: TFacility) => (
        <FacilitiesItem facility={facility} key={facility.id} />
      ))}
    </InfiniteScroll>
  );
};

export default FacilitiesList;
