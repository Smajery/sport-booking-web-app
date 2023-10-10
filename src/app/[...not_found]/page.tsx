import { notFound } from "next/navigation";

export const metadata = {
  title: "Not Found",
  description: "Not Found page",
};

const NotFoundCatchAll = () => {
  notFound();
  return null;
};

export default NotFoundCatchAll;
