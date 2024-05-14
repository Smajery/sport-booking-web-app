import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const badgeVariants = cva(
  "min-w-0 max-w-max inline-flex gap-x-2 rounded-lg px-2 py-1 border",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        primary: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        accent: "border-transparent bg-accent text-accent-foreground",
        background: "border-transparent bg-background text-foreground",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        danger: "border-transparent bg-danger text-destructive-foreground",
        outline: "border-border bg-background text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  Icon?: LucideIcon;
  textClassname?: string;
}

function Badge({
  className,
  Icon,
  textClassname,
  variant,
  children,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props}>
      {Icon && <Icon className="mt-1 w-4 h-4 shrink-0" />}
      <p className={cn("w-full truncate", textClassname)}>{children}</p>
    </div>
  );
}

export { Badge, badgeVariants };
