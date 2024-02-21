"use client";

import React from "react";
import { Slider } from "@/components/ui/slider";
import FloatingInput from "@/components/atoms/common/Inputs/FloatingInput/FloatingInput";
import { TFacilityFilter } from "@/types/public/facilityTypes";
import SingleSelect from "@/components/molecules/common/Selects/SingleSelect/SingleSelect";
import { facilityConfig } from "@/config/facility";

interface ISearchForm {
  handleSetFilterValues: (value: TFacilityFilter | null) => void;
  isFetchLoading: boolean;
  className?: string;
}

const FacilityFilter: React.FC<ISearchForm> = ({
  isFetchLoading,
  handleSetFilterValues,
  className = "",
}) => {
  const facilityFilterTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [filterValues, setFilterValues] = React.useState<TFacilityFilter>({
    search: "",
    sortBy: "",
    coveringType: "",
    facilityType: "",
    sportType: "",
    district: "",
  });

  const handleSelect = (name: string, newFilterValue: string) => {
    setFilterValues({ ...filterValues, [name]: newFilterValue });
  };

  const handleTypeDelay = React.useCallback(
    (name: string, newFilterValue: string) => {
      if (facilityFilterTimeoutRef.current) {
        clearTimeout(facilityFilterTimeoutRef.current);
      }

      facilityFilterTimeoutRef.current = setTimeout(() => {
        setFilterValues({ ...filterValues, [name]: newFilterValue });
      }, 1000);
    },
    [setFilterValues],
  );

  React.useEffect(() => {
    return () => {
      if (facilityFilterTimeoutRef.current) {
        clearTimeout(facilityFilterTimeoutRef.current);
      }
    };
  }, []);

  React.useEffect(() => {
    handleSetFilterValues(filterValues);
  }, [filterValues]);

  return (
    <div className={`flex flex-col gap-y-unit-4 ${className}`}>
      <FloatingInput
        name="search"
        type="text"
        placeholder="Search..."
        labelText="Facilities search"
        iconName="Search"
        handleType={handleTypeDelay}
      />
      <div className="flex flex-col">
        <p className="text-primary font-semibold">Sport</p>
        <SingleSelect
          name="sportType"
          handleSelect={handleSelect}
          selectableItems={facilityConfig.sportType}
        />
      </div>
      <div className="flex flex-col">
        <p className="text-primary font-semibold">Covering</p>
        <SingleSelect
          name="coveringType"
          handleSelect={handleSelect}
          selectableItems={facilityConfig.coveringType}
        />
      </div>
      <div className="flex flex-col gap-y-unit-1">
        <p className="text-primary font-semibold">Facility</p>
        <SingleSelect
          name="facilityType"
          handleSelect={handleSelect}
          selectableItems={facilityConfig.facilityType}
        />
      </div>
      <div className="flex flex-col gap-y-unit-1 opacity-50 pointer-events-none">
        <p className="text-primary font-semibold">District</p>
        <SingleSelect
          name="district"
          handleSelect={handleSelect}
          selectableItems={facilityConfig.district}
        />
      </div>
      <Slider defaultValue={[100]} max={100} step={1} />
    </div>
  );
};

export default FacilityFilter;
