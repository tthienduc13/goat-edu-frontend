"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
  color: "default" | "white";
}

export const BackButton = ({ href, label, color }: BackButtonProps) => {
  return (
    <Button
      asChild
      variant="link"
      className={cn(
        "font-normal",
        color === "default" && "text-muted-foreground",
        color === "white" && "text-primary"
      )}
      size="none"
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
