import React from "react";
import FacilitySection from "@/modules/private/owner/Facility/organisms/FacilitySection/FacilitySection";

const Facility = ({ params }: { params: { myFacilityId: string } }) => {
  return (
    <div className="w-full flex flex-col">
      <FacilitySection facilityId={Number(params.myFacilityId)} />
    </div>
  );
};

export default Facility;
