import React from "react";
import FacilitySection from "@/modules/public/Facility/organisms/FacilitySection/FacilitySection";

const Facility = ({ params }: { params: { facilityId: string } }) => {
  return (
    <div className="container mx-auto flex justify-center">
      <FacilitySection facilityId={Number(params.facilityId)} />
    </div>
  );
};

export default Facility;
