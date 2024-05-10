import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import { Label } from "@/components/ui/label";

interface IFloatingInput {
  name: string;
  type: string;
  labelText?: string;
  placeholder?: string;
  IconComponent?: any;
  handleType?: (name: string, value: string) => void;
}

const FloatingField: React.FC<IFloatingInput> = ({
  name,
  type,
  IconComponent,
  labelText,
  placeholder = "",
  handleType,
}) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const handleOnChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (handleType) {
      handleType(name, value);
    }
  };
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) =>
    setIsFocused(e.target.value !== "");

  return (
    <div
      className={clsx("relative flex items-center", {
        focused: isFocused,
      })}
    >
      {labelText && (
        <Label
          className={clsx("floating-label", {
            floating: isFocused,
          })}
        >
          {labelText}
        </Label>
      )}
      <Input
        value={inputValue}
        type={type}
        placeholder={isFocused || inputValue ? placeholder : ""}
        onChange={handleOnChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="h-[56px] pl-3 pr-10 pb-[6px] pt-[26px]"
      />
      {IconComponent && (
        <IconComponent className="w-5 h-5 absolute right-4" color="#040C11" />
      )}
    </div>
  );
};

export default FloatingField;
