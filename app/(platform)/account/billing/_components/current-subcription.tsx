"use client";

import { Header } from "@/app/(platform)/account/_components/header";
import { createSessionCheckout } from "@/app/api/payment/payment.api";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

export const CurrentSubscription: React.FC = () => {
  const user = useCurrentUser();
  const handleCheckout = async () => {
    try {
      const url = await createSessionCheckout({ token: user?.token! });
      if (url) {
        window.location.href = url;
      } else {
        console.error("Failed to retrieve checkout URL");
      }
    } catch (error) {
      console.error("Error initiating checkout:", error);
    }
  };
  return (
    <div className="flex flex-col w-full gap-y-6">
      <Header
        title="Current Subscription"
        label="Information about your current plan and your next billing method"
      />
      <div className="w-full border-[2px] px-6 py-4 rounded-xl flex flex-row items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <div className="text-muted-foreground text-sm">Your plan</div>
          <div className="font-semibold">Free</div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="text-muted-foreground text-sm">Cycle</div>
          <div className="font-semibold">Monthly</div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="text-muted-foreground text-sm">Next billing date</div>
          <div className="font-semibold">Mon, Jan 19 2024</div>
        </div>
        <Button onClick={handleCheckout} className="w-fit">
          Edit plan
        </Button>
      </div>
    </div>
  );
};
