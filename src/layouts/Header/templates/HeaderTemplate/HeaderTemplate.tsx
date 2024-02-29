import { siteConfig } from "@/config/site";
import { Skeleton } from "@/components/ui/skeleton";

const HeaderTemplate = () => {
  return (
    <div className="flex gap-x-unit-6">
      {siteConfig.publicNavItems.map((link, index) => (
        <Skeleton
          key={index}
          className="w-[120px] h-[37px] flex items-center font-semibold"
        />
      ))}
    </div>
  );
};

export default HeaderTemplate;
