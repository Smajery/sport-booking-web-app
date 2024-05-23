"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import FloatingField from "@/components/molecules/public/Fields/FloatingField/FloatingField";
import { TFacilityFilter } from "@/types/public/facilityTypes";
import SingleSelectField from "@/components/molecules/public/Fields/SingleSelectField/SingleSelectField";
import { facilityConfig } from "@/config/public/facility";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import _ from "lodash";
import MultiSelectField from "@/components/molecules/public/Fields/MultiSelectField/MultiSelectField";
import CitySelectField from "@/components/molecules/public/Fields/CitySelectField/CitySelectField";
import DistrictsSelectField from "@/components/molecules/public/Fields/DistrictsSelectField/DistrictsSelectField";
import { TPriceRange } from "@/types/commonTypes";
import PriceSliderField from "@/components/molecules/public/Fields/PriceSliderField/PriceSliderField";
import { Separator } from "@/components/ui/separator";

interface ISearchForm {
  handleSetFilterValues: (value: TFacilityFilter | null) => void;
  isFetchLoading: boolean;
  priceRange: TPriceRange;
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
  sportType: z.array(
    z.object({
      key: z.string(),
      name: z.string(),
    }),
  ),
  districts: z.array(
    z.object({
      key: z.string(),
      name: z.string(),
    }),
  ),
  cityId: z
    .object({
      key: z.string(),
      name: z.string(),
    })
    .nullable(),
  priceRange: z
    .object({
      minPrice: z.number(),
      maxPrice: z.number(),
    })
    .nullable(),
  sortBy: z
    .object({
      key: z.string(),
      name: z.string(),
    })
    .nullable(),
});

const FilterForm: React.FC<ISearchForm> = ({
  isFetchLoading,
  handleSetFilterValues,
  priceRange,
}) => {
  const form = useForm<z.infer<typeof filterFormSchema>>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      search: null,
      coveringType: null,
      facilityType: null,
      sportType: [],
      districts: [],
      cityId: null,
      priceRange: null,
      sortBy: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof filterFormSchema>) => {
    const {
      priceRange,
      search,
      sportType,
      coveringType,
      cityId,
      districts,
      facilityType,
      sortBy,
    } = values;
    const modifiedValues = {
      search: search && search.length !== 0 ? search : null,
      sportType: sportType.length ? sportType.map((sport) => sport.key) : null,
      coveringType: coveringType?.key ?? null,
      facilityType: facilityType?.key ?? null,
      districts: districts.length
        ? districts.map((district) => Number(district.key))
        : null,
      cityId: cityId ? Number(cityId.key) : null,
      minPrice: priceRange?.minPrice ?? null,
      maxPrice: priceRange?.maxPrice ?? null,
      sortBy: sortBy?.key ?? null,
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
  const cityIdWatch = form.watch("cityId");
  const districtsWatch = form.watch("districts");
  const priceRangeWatch = form.watch("priceRange");
  const sortByWatch = form.watch("sortBy");

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
    cityIdWatch,
    districtsWatch,
    priceRangeWatch,
    sortByWatch,
  ]);

  const handleReset = () => {
    form.reset();
    form.handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...form}>
      <form
        noValidate
        className="flex flex-col gap-y-4 sticky top-[110px] z-50" //Temporary solution for sticky
      >
        <FloatingField
          form={form}
          name="search"
          placeholder="Search..."
          labelText="Facilities search"
          type="text"
          IconComponent={Search}
          noValidate
        />
        <MultiSelectField
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
        <CitySelectField form={form} name="cityId" labelText="City" />
        <DistrictsSelectField
          form={form}
          name="districts"
          labelText="Districts"
          cityId={cityIdWatch ? Number(cityIdWatch.key) : null}
        />
        <SingleSelectField
          form={form}
          name="sortBy"
          labelText="Sort by"
          selectableItems={facilityConfig.sortBy}
        />
        <PriceSliderField
          form={form}
          name="priceRange"
          labelText="Price"
          priceRange={priceRange}
        />
        <Separator className="mt-5" />
        <Button
          variant="outlineSecondary"
          size="md"
          type="button"
          className="mr-auto"
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
