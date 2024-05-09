import { redirect } from "@/navigation";
import { ROUTE_PROFILE } from "@/utils/constants/routes.constants";

export const metadata = {
  title: "Profile",
  description: "Profile page",
};

const ProfilePage = () => {
  return redirect(ROUTE_PROFILE);
};

export default ProfilePage;
