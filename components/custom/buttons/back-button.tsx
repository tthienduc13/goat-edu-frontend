import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/custom/hint";
import { ArrowLeft } from "lucide-react";

export const BackButton = () => {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <Hint label="Go back" side="left" sideOffset={10} align="center">
      <Button onClick={handleBack} variant="ghost" size="icon">
        <ArrowLeft className="h-4 w-4" />
      </Button>
    </Hint>
  );
};
