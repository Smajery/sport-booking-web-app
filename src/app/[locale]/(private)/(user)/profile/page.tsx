import { redirect } from "@/navigation";
import { routes } from "@/utils/constants/routes.constants";

export const metadata = {
  title: "Profile",
  description: "Profile page",
};

const ProfilePage = () => {
  return redirect(routes.PROFILE);
};

export default ProfilePage;
