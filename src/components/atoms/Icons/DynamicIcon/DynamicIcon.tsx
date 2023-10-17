import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";
import { memo } from "react";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const DynamicIcon = memo(({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return <LucideIcon {...props} />;
});

DynamicIcon.displayName = "Icon";

export default DynamicIcon;
