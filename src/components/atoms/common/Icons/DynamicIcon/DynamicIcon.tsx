import React from "react";
import { Loader2 } from "lucide-react";

const DynamicIcon = ({ name, ...props }) => {
  const IconComponent = React.useMemo(() => {
    return React.lazy(() =>
      import("lucide-react").then((module) => {
        const Icon = module[name];
        if (Icon) {
          return { default: Icon };
        } else {
          throw new Error(`Icon ${name} not found in lucide-react`);
        }
      }),
    );
  }, [name]); // Мемоизация зависит от имени иконы

  return (
    <React.Suspense fallback={<Loader2 {...props} />}>
      <IconComponent {...props} />
    </React.Suspense>
  );
};

export default DynamicIcon;
