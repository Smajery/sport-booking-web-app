"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import FloatingField from "@/components/molecules/public/Fields/FloatingField/FloatingField";
import { Slider } from "@/components/ui/slider";
import { TFacilityFilter } from "@/types/public/facilityTypes";
import SingleSelectField from "@/components/molecules/public/Fields/SingleSelectField/SingleSelectField";
import { facilityConfig } from "@/config/public/facility";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import _ from "lodash";

interface ISearchForm {
  handleSetFilterValues: (value: TFacilityFilter | null) => void;
  isFetchLoading: boolean;
}

const filterFormSchema = z.object({
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

  const form = useForm<z.infer<typeof filterFormSchema>>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      search: null,
      coveringType: null,
      facilityType: null,
      sportType: null,
      district: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof filterFormSchema>) => {
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

  const searchWatch = form.watch("search");
  const coveringTypeWatch = form.watch("coveringType");
  const facilityTypeWatch = form.watch("facilityType");
  const sportTypeWatch = form.watch("sportType");
  const districtWatch = form.watch("district");

  React.useEffect(() => {
    const debouncedSubmit = _.debounce(() => {
      form.handleSubmit(onSubmit)();
    }, 1000);

    debouncedSubmit();
    return () => {
      debouncedSubmit.cancel();
    };
  }, [
    searchWatch,
    coveringTypeWatch,
    facilityTypeWatch,
    sportTypeWatch,
    districtWatch,
    onSubmit,
    form,
  ]);

  const handleReset = () => {
    form.reset();
    form.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...form}>
      <form noValidate className="flex flex-col gap-y-4">
        <FloatingField
          form={form}
          name="search"
          placeholder="Search..."
          labelText="Facilities search"
          type="text"
          IconComponent={Search}
          noValidate
        />
        <SingleSelectField
          form={form}
          name="sportType"
          labelText="Sport"
          selectableItems={facilityConfig.sportType}
        />
        <SingleSelectField
          form={form}
          name="coveringType"
          labelText="Covering"
          selectableItems={facilityConfig.coveringType}
        />
        <SingleSelectField
          form={form}
          name="facilityType"
          labelText="Facility"
          selectableItems={facilityConfig.facilityType}
        />
        <div className="opacity-50 pointer-events-none">
          <SingleSelectField
            form={form}
            name="district"
            labelText="District"
            selectableItems={facilityConfig.district}
          />
        </div>
        <div className="flex flex-col gap-y-4 opacity-50 pointer-events-none">
          <p className="text-primary font-semibold">Price</p>
          <Slider defaultValue={[0, 100]} min={0} max={100} step={1} />
        </div>
        <Button
          variant="secondary"
          size="sm"
          type="button"
          className="mt-4 mr-auto"
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
