import { redirect } from "@/navigation";
import { routes } from "@/utils/constants/routes.constants";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard page",
};

const DashboardPage = () => {
  return redirect(routes.USER_FACILITIES);
};

export default DashboardPage;
