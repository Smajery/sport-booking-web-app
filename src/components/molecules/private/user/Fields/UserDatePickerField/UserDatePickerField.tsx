import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { clsx } from "clsx";
import { UseFormReturn } from "react-hook-form";
import { CalendarIcon, Check, X } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import format from "@/lib/format";
import { Calendar } from "@/components/ui/calendar";
import { InputProps } from "@/components/ui/input";
import { formatISO, getYear, parseISO, subYears } from "date-fns";
import { useLocale } from "next-intl";
import { TLocale } from "@/navigation";
import YearSelect from "@/components/atoms/private/user/Selects/YearSelect/YearSelect";

interface IUserDatePickerField extends InputProps {
  form: any;
  name: string;
  labelText?: string;
  noValidate?: boolean;
}

const UserDatePickerField: React.FC<IUserDatePickerField> = ({
  form,
  name,
  labelText,
  noValidate = false,
}) => {
  const locale = useLocale() as TLocale;
  const {
    formState: { isSubmitted },
    setValue,
    watch,
  } = form as UseFormReturn;

  const currentYear = getYear(new Date());
  const startYear = currentYear - 120;
  const endYear = currentYear - 14;

  const dateWatch = watch(name) ? parseISO(watch(name)) : new Date();

  const handleYearChange = (year: number) => {
    const newDate = dateWatch;
    newDate.setFullYear(year);
    form.setValue(name, formatISO(newDate));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setValue(name, formatISO(selectedDate));
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value }, fieldState: { invalid } }) => (
        <FormItem className="space-y-1">
          {labelText && (
            <FormLabel
              className={clsx("text-primary text-base font-normal", {
                "text-success": !invalid && isSubmitted && !noValidate,
              })}
            >
              {labelText}
            </FormLabel>
          )}
          <FormControl>
            <div className="flex items-center gap-x-5">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="none"
                    size="none"
                    className={cn(
                      "h-10 w-full justify-start gap-x-2 rounded-md border bg-background px-3 py-2 border-input text-2xl",
                      !value && "text-muted-foreground",
                    )}
                  >
                    {value ? (
                      format(value, "dd.MM.yyyy", locale)
                    ) : (
                      <span className="font-light">Pick a date</span>
                    )}
                    <CalendarIcon className="-mt-1" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div>
                    <div className="px-3 flex items-center border-b border-border">
                      <div className="shrink-0 w-[36px] flex items-center justify-center">
                        <p className="text-[0.8rem] text-muted-foreground">
                          Year:
                        </p>
                      </div>
                      <YearSelect
                        value={getYear(dateWatch)}
                        onChange={handleYearChange}
                        startYear={startYear}
                        endYear={endYear}
                      />
                    </div>
                    <Calendar
                      key={getYear(dateWatch)}
                      showOutsideDays={false}
                      mode="single"
                      selected={dateWatch}
                      onSelect={handleDateSelect}
                      defaultMonth={dateWatch}
                      initialFocus
                      toDate={subYears(new Date(), 14)}
                      fromDate={subYears(new Date(), 120)}
                    />
                  </div>
                </PopoverContent>
              </Popover>
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
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UserDatePickerField;
