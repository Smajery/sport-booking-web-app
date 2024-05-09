import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IYearSelect {
  value: number;
  onChange: (value: number) => void;
  startYear: number;
  endYear: number;
}

const YearSelect: React.FC<IYearSelect> = ({
  value,
  onChange,
  startYear,
  endYear,
}) => {
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => endYear - i,
  );

  return (
    <Select
      onValueChange={(e) => onChange(Number(e))}
      defaultValue={String(value)}
    >
      <SelectTrigger className="rounded-none border-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {years.map((year) => (
            <SelectItem key={year} value={String(year)}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default YearSelect;
