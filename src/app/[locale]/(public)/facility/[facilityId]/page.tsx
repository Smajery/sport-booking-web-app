import Facility from "@/modules/public/Facility/pages";

export const metadata = {
  title: "Facility",
  description: "Facility page",
};

const FacilityPage = ({ params }: { params: { facilityId: string } }) => {
  return <Facility params={params} />;
};

export default FacilityPage;
