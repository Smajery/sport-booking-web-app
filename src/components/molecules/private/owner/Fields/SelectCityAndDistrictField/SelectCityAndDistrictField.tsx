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
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { clsx } from "clsx";
import { Check, X } from "lucide-react";

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
  cityName: string;
  labelText?: string;
  noValidate?: boolean;
}

const SelectCityAndDistrictField: React.FC<ISelectCityAndDistrictField> = ({
  form,
  name,
  cityName,
  labelText,
  noValidate = false,
}) => {
  const {
    control,
    formState: { isSubmitted },
    watch,
  } = form as UseFormReturn;

  const cityIdWatch = watch(cityName) ?? null;

  const [cityId, setCityId] = React.useState<string | null>(cityIdWatch);
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
      render={({ field, fieldState: { invalid } }) => (
        <FormItem className="flex flex-col space-y-1">
          {labelText && (
            <FormLabel
              className={clsx("text-lg font-light", {
                "text-success": !invalid && isSubmitted && !noValidate,
                "text-destructive": invalid && isSubmitted && !noValidate,
              })}
            >
              {labelText}
            </FormLabel>
          )}
          <div className="flex justify-between items-center gap-x-5">
            <div className="w-full flex justify-between gap-x-2">
              <Select
                onValueChange={(e) => setCityId(e)}
                defaultValue={cityId ?? ""}
                disabled={citiesLoading || !!citiesError}
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
                disabled={districtsLoading || !!districtsError || !cityId}
                defaultValue={field.value}
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
                      className="text-lg text-muted-foreground"
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
            <div
              className={clsx(
                "shrink-0 flex items-center justify-center text-white w-[30px] h-[30px] rounded-[5px]",
                {
                  "bg-success": field.value,
                  "bg-danger": !field.value,
                },
              )}
            >
              {field.value ? <Check /> : <X />}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectCityAndDistrictField;
