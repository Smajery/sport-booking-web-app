"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { routes } from "@/utils/constants/routes.constants";

const NotFoundSection = () => {
  const { push, back } = useRouter();
  return (
    <section>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <div className="flex gap-x-5 mt-5">
        <Button onClick={back}>Back</Button>
        <Button onClick={() => push(routes.HOME)}>Home</Button>
      </div>
    </section>
  );
};

export default NotFoundSection;
