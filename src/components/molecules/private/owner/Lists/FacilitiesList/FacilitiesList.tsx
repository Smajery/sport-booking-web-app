"use client";

import React from "react";
import FacilitiesItem from "@/components/molecules/private/owner/Items/FacilitiesItem/FacilitiesItem";
import { TFacility } from "@/types/public/facilityTypes";
import CreateFacilityButton from "@/components/atoms/private/owner/Buttons/CreateFacilityButton/CreateFacilityButton";

interface IFacilitiesList {
  facilities: TFacility[];
}

const FacilitiesList: React.FC<IFacilitiesList> = ({ facilities }) => {
  return (
    <ul className="ml-auto grid grid-cols-3 content-start gap-5 pt-5">
      {facilities.map((facility: TFacility) => (
        <FacilitiesItem facility={facility} key={facility.id} />
      ))}
      <li className="flex items-center justify-center w-[340px] h-[288px]">
        <CreateFacilityButton />
      </li>
    </ul>
  );
};

export default FacilitiesList;
