"use client";

import React from "react";
import FacilitiesItem from "@/components/molecules/private/owner/Items/FacilitiesItem/FacilitiesItem";
import { TFacility } from "@/types/private/owner/facilityTypes";
import CreateFacilityButton from "@/components/atoms/private/owner/Buttons/CreateFacilityButton/CreateFacilityButton";

interface IFacilitiesList {
  facilities: TFacility[];
}

const FacilitiesList: React.FC<IFacilitiesList> = ({ facilities }) => {
  return (
    <div className="flex flex-wrap gap-5 p-5">
      {facilities.map((facility: TFacility) => (
        <FacilitiesItem facility={facility} key={facility.id} />
      ))}
    </div>
  );
};

export default FacilitiesList;
