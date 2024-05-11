"use client";

import React from "react";
import FacilitiesItem from "@/components/molecules/private/owner/Items/FacilitiesItem/FacilitiesItem";
import { TFacility } from "@/types/public/facilityTypes";

interface IFacilitiesList {
  facilities: TFacility[];
}

const FacilitiesList: React.FC<IFacilitiesList> = ({ facilities }) => {
  return (
    <ul className="ml-auto grid grid-cols-3 content-start gap-5 p-5">
      {facilities.map((facility: TFacility) => (
        <FacilitiesItem facility={facility} key={facility.id} />
      ))}
    </ul>
  );
};

export default FacilitiesList;
