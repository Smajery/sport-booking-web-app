"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import {
  GET_ALL_CITIES_QUERY,
  GET_ALL_CITY_DISTRICTS_QUERY,
} from "@/apollo/query/public/location";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

type TCity = {
  id: number;
  name: string;
};

type TDistrict = {
  id: number;
  name: string;
};

interface ISelectCityAndDistrictField {
  form: any;
  name: string;
  labelText?: string;
}

const SelectCityAndDistrictField: React.FC<ISelectCityAndDistrictField> = ({
  form,
  name,
  labelText,
}) => {
  const { control } = form as UseFormReturn;
  const [cityId, setCityId] = React.useState<string | null>(null);
  const [cities, setCities] = React.useState<TCity[]>([]);
  const [districts, setDistricts] = React.useState<TDistrict[]>([]);

  const { loading: citiesLoading, error: citiesError } = useQuery(
    GET_ALL_CITIES_QUERY,
    {
      onCompleted: (data) => setCities(data.findAllCities),
    },
  );

  const { loading: districtsLoading, error: districtsError } = useQuery(
    GET_ALL_CITY_DISTRICTS_QUERY,
    {
      skip: !cityId,
      variables: {
        cityId: Number(cityId),
      },
      onCompleted: (data) => setDistricts(data.findAllDistricts),
    },
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-1">
          {labelText && (
            <FormLabel className="text-lg font-light">{labelText}</FormLabel>
          )}
          <div className="flex justify-between gap-x-2">
            <Select
              onValueChange={(e) => setCityId(e)}
              disabled={citiesLoading || citiesError}
            >
              <SelectTrigger className="h-[56px] border border-input rounded-md text-lg text-muted-foreground font-light">
                <SelectValue
                  placeholder={
                    citiesLoading
                      ? "Loading..."
                      : citiesError
                        ? "Something went wrong"
                        : "Select city first"
                  }
                  className="text-lg text-muted-foreground"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {cities.map((city: TCity) => (
                    <SelectItem key={city.id} value={String(city.id)}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              disabled={districtsLoading || districtsError || !cityId}
              onValueChange={field.onChange}
            >
              <FormControl>
                <SelectTrigger className="h-[56px] border border-input rounded-md text-lg text-muted-foreground font-light">
                  <SelectValue
                    placeholder={
                      districtsLoading
                        ? "Loading..."
                        : districtsError
                          ? "Something went wrong"
                          : "Select district second"
                    }
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  {districts.map((district: TDistrict) => (
                    <SelectItem key={district.id} value={String(district.id)}>
                      {district.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </FormItem>
      )}
    />
  );
};

export default SelectCityAndDistrictField;
