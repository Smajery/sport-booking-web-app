"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, TLocale } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useHeaderContext } from "@/layouts/Header/Header";
import { clsx } from "clsx";
import { namespaces } from "@/utils/constants/namespaces.constants";

const SelectLanguageButton = () => {
  const t = useTranslations(namespaces.LAYOUTS_HEADER_TITLES);

  const locale = useLocale() as TLocale;
  const pathname = usePathname();
  const { push } = useRouter();

  const { isHeaderScrolled } = useHeaderContext();

  const handleLanguageRedirect = (nextLocale: TLocale) => {
    const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
    push(newPathname);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="none"
          size="none"
          className={clsx("mt-[2px]", {
            "text-primary-foreground": isHeaderScrolled,
          })}
        >
          {t(locale).toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-min">
        {locales.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageRedirect(lang)}
          >
            <p>{t(lang).toUpperCase()}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SelectLanguageButton;
