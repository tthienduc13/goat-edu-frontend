import { Button } from "@/components/ui/button";

export const SubcribeButton = () => {
  return (
    <div className="w-full flex p-4 flex-col justify-center items-center gap-y-2 rounded-md border-[1px]">
      <div className="font-semibold">Upgrade to Unlimited</div>
      <span className="text-muted-foreground text-center text-xs">
        Using ChatBot to solve your problem properly, quickly and perfect
      </span>
      <Button className="w-full">Get PRO ✨</Button>
    </div>
  );
};
