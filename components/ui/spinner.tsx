import React from "react";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ImSpinner8 } from "react-icons/im";

const spinnerVariants = cva("flex-col items-center justify-center", {
  variants: {
    show: {
      true: "flex",
      false: "hidden",
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva("animate-spin text-muted-foreground ", {
  variants: {
    size: {
      xs: "size-4",
      sm: "size-6",
      med: "size-8",
      lg: "size-12",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  className?: string;
  children?: React.ReactNode;
}

export function Spinner({
  size,
  show,
  children,
  className,
}: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <ImSpinner8 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}
