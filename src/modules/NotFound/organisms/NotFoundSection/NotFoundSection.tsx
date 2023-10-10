"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ROUTE_HOME } from "@/utils/constants/routes.constants";

const NotFoundSection = () => {
  const { push, back } = useRouter();
  return (
    <section>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <div className="flex gap-x-unit-5 mt-unit-5">
        <Button onClick={back}>Back</Button>
        <Button onClick={() => push(ROUTE_HOME)}>Home</Button>
      </div>
    </section>
  );
};

export default NotFoundSection;
