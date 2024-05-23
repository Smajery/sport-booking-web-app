import { NO_INDEX_PAGE } from "@/utils/constants/seo.constants";
import FacilityCreate from "@/modules/private/owner/FacilityCreate/pages";

export const metadata = {
  ...NO_INDEX_PAGE,
  title: "Facility Create ",
  description: "Dashboard Facility Create page",
};

const FacilityCreatePage = () => {
  return <FacilityCreate />;
};

export default FacilityCreatePage;
