import { Button } from "@/components/ui/button";

export const UpgradeButton = () => {
  return (
    <Button
      variant="custom"
      className="h-10 flex items-center gap-x-1 animate-pulse"
    >
      <span className="text-xs font-semibold text-muted-foreground">
        {" "}
        Upgrade to
      </span>
      <span className="p-1 bg-primary dark:bg-secondary rounded-md text-xs font-bold text-white">
        PRO
      </span>
    </Button>
  );
};
