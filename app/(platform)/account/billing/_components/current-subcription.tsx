import { Header } from "@/app/(platform)/account/_components/header";
import { Button } from "@/components/ui/button";

export const CurrentSubcription = () => {
  return (
    <div className="flex flex-col w-full gap-y-6">
      <Header
        title="Current subcription"
        label="Information about your current plan and your next billing method"
      />
      <div className="w-full border-[2px]  px-6 py-4 rounded-xl  flex flex-row items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <div className="text-muted-foreground text-sm">Your plan</div>
          <div className=" font-semibold">Free</div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="text-muted-foreground text-sm">Cycle</div>
          <div className=" font-semibold">Monthly</div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="text-muted-foreground text-sm">Next billing date</div>
          <div className=" font-semibold">Mon, Jan 19 2024</div>
        </div>
        <Button className="w-fit">Edit plan</Button>
      </div>
    </div>
  );
};
