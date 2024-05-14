"use client";

import React from "react";
import { TFacility } from "@/types/public/facilityTypes";
import FavoriteFacilitiesItem from "@/components/molecules/private/user/Items/FavoriteFacilitieItem/FavoriteFacilitiesItem";

interface IFavoriteFacilitiesList {
  facilities: TFacility[];
}

const FavoriteFacilitiesList: React.FC<IFavoriteFacilitiesList> = ({
  facilities,
}) => {
  return (
    <ul className="grid grid-cols-4 content-start gap-5">
      {facilities.map((facility: TFacility) => (
        <FavoriteFacilitiesItem facility={facility} key={facility.id} />
      ))}
    </ul>
  );
};

export default FavoriteFacilitiesList;
