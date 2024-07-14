"use client";
import { CreateCheckoutSession } from "@/actions/create-checkout-session";
import { Header } from "@/app/(platform)/account/_components/header";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";

export const CurrentSubscription = () => {
  const user = useCurrentUser();
  const [token, setToken] = useState(""); // Replace with your actual token logic

  useEffect(() => {
    if (user) {
      setToken(user.token);
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await CreateCheckoutSession(token);
    } catch (error) {
      console.error("Error creating checkout session:", error);
      // Handle error as needed
    }
  };

  return (
    <div className="flex flex-col w-full gap-y-6">
      <Header
        title="Current Subscription"
        label="Information about your current plan and your next billing method"
      />
      <form
        onSubmit={handleSubmit}
        action="/api/payment/create-checkout-session" // Point to your Next.js API endpoint
        method="POST"
      >
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
            <div className="text-muted-foreground text-sm">
              Next billing date
            </div>
            <div className="font-semibold">Mon, Jan 19 2024</div>
          </div>
          <Button type="submit" className="w-fit">
            Edit plan
          </Button>
        </div>
      </form>
    </div>
  );
};
