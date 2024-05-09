import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-base ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        none: "",
        default:
          "bg-primary border-transparent text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary border-transparent text-secondary-foreground hover:bg-secondary/80",
        primary:
          "bg-primary border-transparent text-primary-foreground hover:bg-primary/80",
        outlineSecondary:
          "bg-transparent border-border hover:bg-secondary hover:border-secondary hover:text-secondary-foreground",
        outlinePrimary:
          "bg-transparent border-border hover:bg-primary hover:border-primary hover:text-primary-foreground",
        accent:
          "bg-accent border-transparent text-accent-foreground hover:bg-accent/80",
        destructive:
          "bg-destructive border-transparent text-destructive-foreground hover:bg-destructive/90",
        ghost: "border-border hover:bg-border/60",
        link: "border-transparent text-primary underline-offset-4 hover:underline",
        outline: "bg-transparent border-border hover:bg-border/60",
      },
      size: {
        none: "",
        default: "h-9 border-1 rounded-full px-6",
        sm: "h-9 border-1 rounded-md px-3",
        md: "h-10 border-1 rounded-md px-12",
        lg: "h-[48px] border-2 rounded-md px-[23px] py-[13px]",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
