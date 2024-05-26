"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { routes } from "@/utils/constants/routes.constants";
import { useTranslations } from "next-intl";
import { namespaces } from "@/utils/constants/namespaces.constants";

const NotFoundSection = () => {
  const tTtl = useTranslations(namespaces.COMPONENTS_TITLES);
  const { push, back } = useRouter();
  return (
    <section className="h-full flex flex-col gap-y-2 items-center justify-center">
      <h1 className="text-3xl">{tTtl("notFound")}</h1>
      <p className="text-lg">{tTtl("couldNotFindRequestedResource")}</p>
      <div className="flex gap-x-4 mt-2">
        <Button variant="outline" size="md" onClick={back}>
          {tTtl("back")}
        </Button>
        <Button variant="primary" size="md" onClick={() => push(routes.HOME)}>
          {tTtl("home")}
        </Button>
      </div>
    </section>
  );
};

export default NotFoundSection;
