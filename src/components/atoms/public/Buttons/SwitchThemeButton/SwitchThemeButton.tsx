"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Sun, SunMoon } from "lucide-react";

const SwitchThemeButton = () => {
  const { setTheme, systemTheme } = useTheme();
  const [isChecked, setIsChecked] = React.useState<boolean>(
    systemTheme === "dark",
  );

  const handleSetTheme = (e: boolean) => {
    if (e) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
    setIsChecked(e);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch defaultChecked={isChecked} onCheckedChange={handleSetTheme}>
        <div className="flex items-center justify-center w-full h-full">
          {!isChecked ? <Sun /> : <SunMoon />}
        </div>
      </Switch>
    </div>
  );
};

export default SwitchThemeButton;
