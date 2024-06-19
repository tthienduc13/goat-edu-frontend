import { Button } from "@/components/ui/button";
import { ChevronDown, Globe } from "lucide-react";

export const ChangeVisibility = () => {
  return (
    <Button variant={"ghost"}>
      <Globe className="w-4 h-4 mr-2" />
      <span>Public</span>
      <ChevronDown className="w-4 h-4 ml-3" />
    </Button>
  );
};
