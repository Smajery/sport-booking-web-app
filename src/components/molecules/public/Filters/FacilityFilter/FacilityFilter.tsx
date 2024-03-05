"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import FloatingField from "@/components/molecules/common/Fields/FloatingField/FloatingField";
import { Slider } from "@/components/ui/slider";
import { TFacilityFilter } from "@/types/public/facilityTypes";
import SingleSelectField from "@/components/molecules/common/Fields/SingleSelectField/SingleSelectField";
import { facilityConfig } from "@/config/facility";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface ISearchForm {
  handleSetFilterValues: (value: TFacilityFilter | null) => void;
  isFetchLoading: boolean;
}

const formFilterSchema = z.object({
  search: z.string().nullable(),
  coveringType: z
    .object({
      key: z.string(),
      name: z.string(),
    })
    .nullable(),
  facilityType: z
    .object({
      key: z.string(),
      name: z.string(),
    })
    .nullable(),
  sportType: z
    .object({
      key: z.string(),
      name: z.string(),
    })
    .nullable(),
  district: z
    .object({
      key: z.string(),
      name: z.string(),
    })
    .nullable(),
});

const FilterForm: React.FC<ISearchForm> = ({
  isFetchLoading,
  handleSetFilterValues,
}) => {
  const facilityFilterTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const form = useForm<z.infer<typeof formFilterSchema>>({
    resolver: zodResolver(formFilterSchema),
    defaultValues: {
      search: null,
      coveringType: null,
      facilityType: null,
      sportType: null,
      district: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formFilterSchema>) => {
    const { search, sportType, coveringType, district, facilityType } = values;
    const modifiedValues = {
      search: search && search.length !== 0 ? search : null,
      sportType: sportType?.key ?? null,
      coveringType: coveringType?.key ?? null,
      facilityType: facilityType?.key ?? null,
      district: district?.key ?? null,
    };
    const filteredValues = Object.fromEntries(
      Object.entries(modifiedValues).filter(([, value]) => value !== null),
    );
    const hasValues = Object.keys(filteredValues).length > 0;

    handleSetFilterValues(hasValues ? filteredValues : null);
  };

  const handleSelect = () => {
    form.handleSubmit(onSubmit)();
  };

  const handleTypeDelay = React.useCallback(() => {
    if (facilityFilterTimeoutRef.current) {
      clearTimeout(facilityFilterTimeoutRef.current);
    }

    facilityFilterTimeoutRef.current = setTimeout(() => {
      form.handleSubmit(onSubmit)();
    }, 1000);
  }, [form]);

  React.useEffect(() => {
    return () => {
      if (facilityFilterTimeoutRef.current) {
        clearTimeout(facilityFilterTimeoutRef.current);
      }
    };
  }, []);

  const handleReset = () => {
    form.reset();
    form.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...form}>
      <form noValidate className="flex flex-col gap-y-unit-4">
        <FloatingField
          form={form}
          name="search"
          placeholder="Search..."
          labelText="Facilities search"
          type="text"
          IconComponent={Search}
          handleType={handleTypeDelay}
          noValidate
        />
        <SingleSelectField
          form={form}
          name="sportType"
          labelText="Sport"
          handleSelect={handleSelect}
          selectableItems={facilityConfig.sportType}
        />
        <SingleSelectField
          form={form}
          name="coveringType"
          labelText="Covering"
          handleSelect={handleSelect}
          selectableItems={facilityConfig.coveringType}
        />
        <SingleSelectField
          form={form}
          name="facilityType"
          labelText="Facility"
          handleSelect={handleSelect}
          selectableItems={facilityConfig.facilityType}
        />
        <SingleSelectField
          form={form}
          name="district"
          labelText="District"
          handleSelect={handleSelect}
          selectableItems={facilityConfig.district}
        />
        <div className="flex flex-col gap-y-unit-4 opacity-50 pointer-events-none">
          <p className="text-primary font-semibold">Price</p>
          <Slider defaultValue={[0, 100]} min={0} max={100} step={1} />
        </div>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          className="mt-unit-4 mr-auto"
          onClick={handleReset}
          disabled={isFetchLoading}
        >
          {!isFetchLoading ? "Reset all" : "Loading..."}
        </Button>
      </form>
    </FormProvider>
  );
};

FilterForm.displayName = "FilterForm";

export default FilterForm;
