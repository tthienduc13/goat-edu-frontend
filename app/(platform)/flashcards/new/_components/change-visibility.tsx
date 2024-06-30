import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Globe } from "lucide-react";

interface ChangeVisibilityProps {
  status: string;
}

export const ChangeVisibility = ({ status }: ChangeVisibilityProps) => {
  return (
    <div className={cn(buttonVariants({ variant: "ghost" }))}>
      <Globe className="w-4 h-4 mr-2" />
      <span>
        {status === "Open" ? "Public" : status === "Hidden" ? "Private" : ""}
      </span>
      <ChevronDown className="w-4 h-4 ml-3" />
    </div>
  );
};
