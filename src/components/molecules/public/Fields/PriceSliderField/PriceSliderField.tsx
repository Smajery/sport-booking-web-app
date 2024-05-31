import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { TPriceRange } from "@/types/commonTypes";
import { Slider } from "@/components/ui/slider";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

interface IPriceSliderField {
  form: any;
  name: string;
  labelText?: string;
  priceRange: TPriceRange;
}

const PriceSliderField: React.FC<IPriceSliderField> = ({
  form,
  labelText,
  name,
  priceRange,
}) => {
  const tLbl = useTranslations(namespaces.COMPONENTS_LABELS);

  const { control } = form as UseFormReturn;

  const { min, max } = priceRange;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <FormItem className="flex flex-col space-y-7">
          {labelText && (
            <FormLabel className="text-base text-primary font-semibold">
              {tLbl(labelText)}
            </FormLabel>
          )}
          <FormControl>
            <div className="relative">
              <Slider
                key={`${min}-${max}`}
                defaultValue={[min, max]}
                min={min}
                max={max}
                onValueChange={(price) => {
                  const newPriceRange = {
                    minPrice: price[0],
                    maxPrice: price[1],
                  };
                  onChange(newPriceRange);
                }}
                step={1}
              />
              <div className="absolute -top-7 left-0">
                {value?.minPrice ?? Math.ceil(min)}
              </div>
              <div className="absolute -top-7 right-0">
                {value?.maxPrice ?? Math.ceil(max)}
              </div>
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default PriceSliderField;
