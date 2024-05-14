import { NO_INDEX_PAGE } from "@/utils/constants/seo.constants";
import CreateFacility from "@/modules/private/owner/CreateFacility/pages";

export const metadata = {
  ...NO_INDEX_PAGE,
  title: "Create Facility",
  description: "Dashboard Create Facility page",
};

const CreateFacilityPage = () => {
  return <CreateFacility />;
};

export default CreateFacilityPage;
