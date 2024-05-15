import Facility from "@/modules/private/owner/Facility/pages";

export const metadata = {
  title: "Facility",
  description: "Dashboard Facility page",
};

const FacilityPage = ({ params }: { params: { myFacilityId: string } }) => {
  return <Facility params={params} />;
};

export default FacilityPage;
