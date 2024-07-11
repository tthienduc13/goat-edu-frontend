"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/enhanced-button";

interface BackButtonProps {
  href: string;
  label: string;
  color: "default" | "white";
}

export const BackButton = ({ href, label, color }: BackButtonProps) => {
  return (
    <Button
      asChild
      variant="linkHover2"
      className={cn(
        "font-normal",
        color === "default" && "text-muted-foreground",
        color === "white" && "text-primary"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
