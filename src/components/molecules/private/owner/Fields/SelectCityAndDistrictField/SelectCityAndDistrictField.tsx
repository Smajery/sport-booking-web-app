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
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

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
  const tLbl = useTranslations(namespaces.COMPONENTS_LABELS);
  const tPlh = useTranslations(namespaces.COMPONENTS_PLACEHOLDERS);
  const tSlct = useTranslations(namespaces.COMPONENTS_SELECTS);

  const {
    control,
    formState: { isSubmitted },
    setValue,
    watch,
  } = form as UseFormReturn;

  const cityIdWatch = watch(cityName) ?? null;

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
      skip: !cityIdWatch,
      variables: {
        cityId: Number(cityIdWatch),
      },
      onCompleted: (data) => setDistricts(data.findAllDistricts),
    },
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { invalid } }) => (
        <FormItem className="flex flex-col space-y-1">
          {labelText && (
            <FormLabel
              className={clsx("text-lg font-light", {
                "text-success": !invalid && isSubmitted && !noValidate,
                "text-destructive": invalid && isSubmitted && !noValidate,
              })}
            >
              {tLbl(labelText)}
            </FormLabel>
          )}
          <div className="flex justify-between items-center gap-x-5">
            <div className="w-full flex justify-between gap-x-2">
              <Select
                onValueChange={(e) => setValue(cityName, e)}
                defaultValue={cityIdWatch ?? ""}
                disabled={citiesLoading || !!citiesError}
              >
                <SelectTrigger className="h-[56px] border border-input rounded-md text-lg text-muted-foreground font-light">
                  <SelectValue
                    placeholder={tPlh(
                      citiesLoading
                        ? "loading"
                        : citiesError
                          ? "somethingWentWrong"
                          : "selectCityFirst",
                    )}
                    className="text-lg text-muted-foreground"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {cities.map((city: TCity) => (
                      <SelectItem key={city.id} value={String(city.id)}>
                        {tSlct(city.name)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                disabled={districtsLoading || !!districtsError || !cityIdWatch}
                defaultValue={value}
                onValueChange={onChange}
              >
                <FormControl>
                  <SelectTrigger className="h-[56px] border border-input rounded-md text-lg text-muted-foreground font-light">
                    <SelectValue
                      placeholder={tPlh(
                        citiesLoading
                          ? "loading"
                          : citiesError
                            ? "somethingWentWrong"
                            : "selectDistrictSecond",
                      )}
                      className="text-lg text-muted-foreground"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    {districts.map((district: TDistrict) => (
                      <SelectItem key={district.id} value={String(district.id)}>
                        {tSlct(district.name)}
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
                  "bg-success": value,
                  "bg-danger": !value,
                },
              )}
            >
              {value ? <Check /> : <X />}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectCityAndDistrictField;
