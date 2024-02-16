import React from "react";
import FilterForm from "@/components/molecules/public/Forms/FilterForm/FilterForm";

interface IFacilityFilter {
  setFilter: (value: {} | null) => void;
  isFetchLoading: boolean;
  className?: string;
}

const FacilityFilter: React.FC<IFacilityFilter> = ({
  setFilter,
  isFetchLoading,
  className = "",
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <FilterForm setFilter={setFilter} isFetchLoading={isFetchLoading} />
    </div>
  );
};

export default FacilityFilter;
