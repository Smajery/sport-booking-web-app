import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_CITIES_QUERY } from "@/apollo/query/public/location";
import SingleSelectField from "@/components/molecules/public/Fields/SingleSelectField/SingleSelectField";
import { TCity, TSelectedItem } from "@/types/commonTypes";

interface ICitySelectField {
  form: any;
  name: string;
  labelText?: string;
}

const CitySelectField: React.FC<ICitySelectField> = ({
  form,
  name,
  labelText,
}) => {
  const [cities, setCities] = React.useState<TSelectedItem[]>([]);
  const {} = useQuery(GET_ALL_CITIES_QUERY, {
    onCompleted: (data) => {
      const citiesToSelectableItems = data.findAllCities.map((city: TCity) => ({
        key: String(city.id),
        name: city.name,
      }));
      setCities(citiesToSelectableItems);
    },
  });

  return (
    <SingleSelectField
      form={form}
      name={name}
      labelText={labelText}
      selectableItems={cities}
    />
  );
};

export default CitySelectField;
