"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import FloatingField from "@/components/molecules/common/Fields/FloatingField/FloatingField";
import {
  ECoveringType,
  EFacilityType,
  ESportType,
} from "@/types/public/facilityTypes";
import { Slider } from "@/components/ui/slider";
import SelectField from "@/components/molecules/common/Selects/SingleSelect/SingleSelect";

interface ISearchForm {
  setFilter: (value: {} | null) => void;
  isFetchLoading: boolean;
}

const ECoveringTypeValues = Object.values(ECoveringType) as [
  string,
  ...string[],
];
const EFacilityTypeValues = Object.values(EFacilityType) as [
  string,
  ...string[],
];
const ESportTypeValues = Object.values(ESportType) as [string, ...string[]];

const filterFormSchema = z.object({
  search: z.string().min(1).max(350),
  sortBy: z.string().min(1).max(350),
  coveringType: z.enum(ECoveringTypeValues),
  facilityType: z.enum(EFacilityTypeValues),
  sportType: z.enum(ESportTypeValues),
  district: z.string().min(1).max(350),
});

const FilterForm: React.FC<ISearchForm> = ({ isFetchLoading, setFilter }) => {
  const form = useForm<z.infer<typeof filterFormSchema>>({
    resolver: zodResolver(filterFormSchema),
    defaultValues: {
      search: "",
    },
  });

  const searchTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleSearch = React.useCallback(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setFilter(form.getValues());
    }, 1000);
  }, [form, setFilter]);

  React.useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <FormProvider {...form}>
      <form noValidate className="flex flex-col gap-y-unit-4">
        <FloatingField
          form={form}
          name="Search"
          placeholder="Search..."
          labelText="Filter facilities"
          type="text"
          iconName="Search"
          setInputValue={handleSearch}
        />
        <SelectField />
        <Slider defaultValue={[100]} max={100} step={1} />
      </form>
    </FormProvider>
  );
};

FilterForm.displayName = "FilterForm";

export default FilterForm;
