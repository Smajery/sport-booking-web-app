"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CITY_DISTRICTS_QUERY } from "@/apollo/query/public/location";
import { TDistrict, TSelectedItem } from "@/types/commonTypes";
import MultiSelectField from "@/components/molecules/public/Fields/MultiSelectField/MultiSelectField";
import { UseFormReturn } from "react-hook-form";

interface IDistrictsSelectField {
  cityId: number | null;
  form: any;
  name: string;
  labelText?: string;
}

const DistrictsSelectField: React.FC<IDistrictsSelectField> = ({
  cityId,
  form,
  name,
  labelText,
}) => {
  const { getValues, setValue } = form as UseFormReturn;
  const [districts, setDistricts] = React.useState<TSelectedItem[]>([]);
  const {} = useQuery(GET_ALL_CITY_DISTRICTS_QUERY, {
    skip: !cityId,
    variables: {
      cityId: cityId,
    },
    onCompleted: (data) => {
      const districtsToSelectableItems = data.findAllDistricts.map(
        (district: TDistrict) => ({
          key: district.id,
          name: district.name,
        }),
      );
      setDistricts(districtsToSelectableItems);
    },
  });

  React.useEffect(() => {
    const districts = getValues(name);
    if (districts.length) {
      setValue(name, []);
    }
  }, [cityId]);

  if (!cityId) return null;

  return (
    <MultiSelectField
      form={form}
      name={name}
      labelText={labelText}
      selectableItems={districts}
    />
  );
};

export default DistrictsSelectField;
